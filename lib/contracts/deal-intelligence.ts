import type { ContractRecord, CoverageSentiment, MediaCoverageItem, RenewalStatus } from "@/lib/contracts/types";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
}

interface GdeltArticle {
  title?: string;
  url?: string;
  seendate?: string;
}

interface DealIntelligence {
  incumbentProvider: string;
  renewalStatus: RenewalStatus;
  renewalConfidence: number;
  renewalRationale: string;
  dealTypeDetail: string;
  mediaCoverageSentiment: CoverageSentiment;
  mediaCoverageSummary: string;
  mediaCoverage: MediaCoverageItem[];
}

const renewalKeywords = /\b(renew|renewal|renewed|extension|extended|re-award|reaward|retained|retains|continues|continuation|reappointed)\b/i;
const lossKeywords = /\b(loss|lost|replaced|replace|terminated|termination|cancelled|canceled|switch(?:ed|es)? to|moved to|insourc(?:e|ed|ing)|not renewed)\b/i;
const negativeKeywords = /\b(lawsuit|breach|probe|investigation|penalty|fine|outage|failure|criticism|layoff|strike|terminated|canceled|loss)\b/i;
const positiveKeywords = /\b(win|won|growth|expanded|expands|improved|improves|strategic|innovation|successful|leadership|award)\b/i;

function decodeEntities(text: string): string {
  return text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function toIsoDate(value: string | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function parseRssItems(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const chunks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  for (const chunk of chunks) {
    const titleMatch = chunk.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || chunk.match(/<title>(.*?)<\/title>/);
    const linkMatch = chunk.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = chunk.match(/<pubDate>(.*?)<\/pubDate>/);
    const title = decodeEntities(titleMatch?.[1]?.trim() ?? "");
    const link = decodeEntities(linkMatch?.[1]?.trim() ?? "");
    if (!title || !link) continue;
    items.push({ title, link, pubDate: pubDateMatch?.[1]?.trim() ?? "" });
  }
  return items;
}

function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

function classifySentiment(text: string): CoverageSentiment {
  if (negativeKeywords.test(text)) return "Negative";
  if (positiveKeywords.test(text)) return "Positive";
  return "Neutral";
}

function confidence(renewSignals: number, lossSignals: number, itemCount: number): number {
  if (renewSignals === 0 && lossSignals === 0) return 0.34;
  const delta = Math.abs(renewSignals - lossSignals);
  const base = 0.55 + Math.min(0.2, itemCount * 0.03) + Math.min(0.2, delta * 0.08);
  return Math.max(0.35, Math.min(0.95, base));
}

function buildDealTypeDetail(contract: ContractRecord): string {
  const tcv = contract.tcvUsd > 0
    ? `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(contract.tcvUsd)}${contract.tcvEstimated ? " (estimated)" : ""}`
    : "Not disclosed";
  const length = contract.contractLengthMonths > 0 ? `${contract.contractLengthMonths} months` : "Not disclosed";
  return `${contract.contractType}; Service line: ${contract.serviceLine}; Industry: ${contract.industry}; Geography: ${contract.geography}; Length: ${length}; TCV: ${tcv}; Start: ${contract.contractStartDate}; Estimated end: ${contract.contractEndDate}.`;
}

async function fetchNews(query: string, maxItems = 12): Promise<NewsItem[]> {
  const params = new URLSearchParams({
    q: query,
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  });
  const res = await fetch(`https://news.google.com/rss/search?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) return [];
  const xml = await res.text();
  return parseRssItems(xml).slice(0, maxItems);
}

async function fetchGdelt(query: string, maxItems = 15): Promise<NewsItem[]> {
  const params = new URLSearchParams({
    query,
    mode: "ArtList",
    format: "json",
    maxrecords: String(Math.max(10, Math.min(40, maxItems))),
  });

  const res = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) return [];

  const text = await res.text();
  if (!text.trim().startsWith("{")) return [];

  const payload = JSON.parse(text) as { articles?: GdeltArticle[] };
  if (!Array.isArray(payload.articles)) return [];

  return payload.articles
    .filter((item) => Boolean(item.title) && Boolean(item.url))
    .slice(0, maxItems)
    .map((item) => ({
      title: decodeEntities(item.title?.trim() ?? ""),
      link: decodeEntities(item.url?.trim() ?? ""),
      pubDate: item.seendate?.trim() ?? "",
    }));
}

function dedupe(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const item of items) {
    const key = `${item.title.toLowerCase()}|${item.link}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function stripProviderPrefix(title: string, provider: string): string {
  return title.replace(new RegExp(`^${provider.replace(/\s+/g, "\\s+")}:\\s*`, "i"), "").trim();
}

function filterOutInitialAnnouncement(items: NewsItem[], contract: ContractRecord): NewsItem[] {
  const baseTitle = stripProviderPrefix(contract.title, contract.serviceProvider).toLowerCase();
  const contractUrl = (contract.articleUrl ?? "").trim();

  return items.filter((item) => {
    if (contractUrl && item.link.includes(contractUrl)) return false;
    const t = item.title.toLowerCase();
    if (baseTitle && t.includes(baseTitle.slice(0, Math.min(40, baseTitle.length)))) return false;
    return true;
  });
}

function mediaSummary(items: MediaCoverageItem[], sentiment: CoverageSentiment): string {
  if (items.length === 0) return "No incremental coverage found beyond the initial announcement or renewal signals.";
  const counts = items.reduce(
    (acc, item) => {
      acc[item.sentiment] += 1;
      return acc;
    },
    { Positive: 0, Neutral: 0, Negative: 0 } as Record<CoverageSentiment, number>,
  );
  return `Captured ${items.length} additional media references (Positive: ${counts.Positive}, Neutral: ${counts.Neutral}, Negative: ${counts.Negative}). Overall media tone assessed as ${sentiment}.`;
}

function dominantSentiment(items: MediaCoverageItem[]): CoverageSentiment {
  if (items.length === 0) return "Neutral";
  const counts = items.reduce(
    (acc, item) => {
      acc[item.sentiment] += 1;
      return acc;
    },
    { Positive: 0, Neutral: 0, Negative: 0 } as Record<CoverageSentiment, number>,
  );
  if (counts.Negative > counts.Positive && counts.Negative >= counts.Neutral) return "Negative";
  if (counts.Positive > counts.Negative && counts.Positive >= counts.Neutral) return "Positive";
  return "Neutral";
}

function buildRenewalRationale(status: RenewalStatus, confidenceScore: number, signalTitles: string[]): string {
  const confidenceLabel = `${Math.round(confidenceScore * 100)}% confidence`;
  if (signalTitles.length === 0) {
    return `No externally corroborated renewal/loss signal identified from currently indexed sources (${confidenceLabel}).`;
  }
  const sample = signalTitles.slice(0, 3).join(" | ");
  if (status === "Renewal") return `Signals indicate incumbent retention or extension (${confidenceLabel}): ${sample}`;
  if (status === "Loss") return `Signals indicate incumbent displacement or non-renewal (${confidenceLabel}): ${sample}`;
  return `Signals are mixed or weak; status remains unconfirmed (${confidenceLabel}): ${sample}`;
}

export async function enrichDealIntelligence(contract: ContractRecord): Promise<DealIntelligence> {
  const incumbent = contract.incumbentProvider || contract.serviceProvider || "Unknown Provider";
  const client = contract.clientName && contract.clientName !== "Undisclosed Client" ? contract.clientName : "";
  const provider = contract.serviceProvider || incumbent;
  const scope = `${contract.serviceLine} ${contract.industry} outsourcing`;

  const renewalQuery = client
    ? `"${client}" "${provider}" (${scope}) (renewal OR renewed OR extension OR retained OR re-award OR loss OR replaced OR switched)`
    : `"${provider}" (${scope}) (renewal OR renewed OR extension OR retained OR re-award OR loss OR replaced OR switched)`;

  const mediaQuery = client
    ? `"${client}" "${provider}" (${scope}) (analysis OR commentary OR blog OR investigation OR dispute OR success) -renewal -renewed -extension`
    : `"${provider}" (${scope}) (analysis OR commentary OR blog OR investigation OR dispute OR success) -renewal -renewed -extension`;

  try {
    const [renewRss, renewGdelt, mediaRss, mediaGdelt] = await Promise.all([
      fetchNews(renewalQuery, 20),
      fetchGdelt(renewalQuery, 20),
      fetchNews(mediaQuery, 20),
      fetchGdelt(mediaQuery, 20),
    ]);

    const renewItems = filterOutInitialAnnouncement(dedupe([...renewRss, ...renewGdelt]), contract);
    const mediaItems = filterOutInitialAnnouncement(dedupe([...mediaRss, ...mediaGdelt]), contract);

    let renewSignals = 0;
    let lossSignals = 0;
    const signalTitles: string[] = [];

    for (const item of renewItems) {
      const signalText = `${item.title} ${item.link}`;
      const hasRenew = renewalKeywords.test(signalText);
      const hasLoss = lossKeywords.test(signalText);
      if (hasRenew || hasLoss) signalTitles.push(item.title);
      if (hasRenew) renewSignals += 1;
      if (hasLoss) lossSignals += 1;
    }

    let renewalStatus: RenewalStatus = "No Renewal Insight";
    if (renewSignals > lossSignals && renewSignals > 0) renewalStatus = "Renewal";
    if (lossSignals > renewSignals && lossSignals > 0) renewalStatus = "Loss";

    const renewalConfidence = confidence(renewSignals, lossSignals, renewItems.length);
    const renewalRationale = buildRenewalRationale(renewalStatus, renewalConfidence, signalTitles);

    const coverage: MediaCoverageItem[] = mediaItems.slice(0, 10).map((item) => ({
      title: item.title,
      url: item.link,
      date: toIsoDate(item.pubDate),
      source: domainFromUrl(item.link),
      sentiment: classifySentiment(item.title),
    }));

    const mediaCoverageSentiment = dominantSentiment(coverage);
    const mediaCoverageSummary = mediaSummary(coverage, mediaCoverageSentiment);

    return {
      incumbentProvider: incumbent,
      renewalStatus,
      renewalConfidence,
      renewalRationale,
      dealTypeDetail: buildDealTypeDetail(contract),
      mediaCoverageSentiment,
      mediaCoverageSummary,
      mediaCoverage: coverage,
    };
  } catch {
    return {
      incumbentProvider: incumbent,
      renewalStatus: contract.renewalStatus ?? "No Renewal Insight",
      renewalConfidence: contract.renewalConfidence ?? 0.34,
      renewalRationale: contract.renewalRationale ?? "External search unavailable during this run.",
      dealTypeDetail: contract.dealTypeDetail ?? buildDealTypeDetail(contract),
      mediaCoverageSentiment: contract.mediaCoverageSentiment ?? "Neutral",
      mediaCoverageSummary: contract.mediaCoverageSummary ?? "External search unavailable during this run.",
      mediaCoverage: contract.mediaCoverage ?? [],
    };
  }
}
