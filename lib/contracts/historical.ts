import { deriveEndDate } from "@/lib/contracts/normalize";
import { detectProvider, titleWithProvider } from "@/lib/contracts/providers";
import type { ContractDraft, InformationType } from "@/lib/contracts/types";

const allCategories: InformationType[] = ["Contracts", "Financial Results", "M&A", "New Offerings", "Partnerships"];
const knownProviders = ["Accenture", "Cognizant", "Infosys", "TCS", "Wipro", "HCLTech", "Capgemini", "IBM", "DXC", "NTT DATA", "Genpact", "EXL"];
const providerProfiles = [
  { name: "Accenture", irDomain: "investor.accenture.com" },
  { name: "Cognizant", irDomain: "investors.cognizant.com" },
  { name: "Infosys", irDomain: "www.infosys.com/investors" },
  { name: "TCS", irDomain: "www.tcs.com/investors" },
  { name: "Wipro", irDomain: "www.wipro.com/investors" },
  { name: "HCLTech", irDomain: "www.hcltech.com/investors" },
  { name: "Capgemini", irDomain: "investors.capgemini.com" },
  { name: "IBM", irDomain: "www.ibm.com/investor" },
  { name: "DXC", irDomain: "investors.dxc.com" },
  { name: "NTT DATA", irDomain: "www.nttdata.com/global/en/investors" },
  { name: "Genpact", irDomain: "investors.genpact.com" },
  { name: "EXL", irDomain: "investors.exlservice.com" },
] as const;

interface GdeltArticle {
  title?: string;
  url?: string;
  seendate?: string;
  domain?: string;
  sourcecountry?: string;
}

export interface HistoricalPrepopulateOptions {
  startYear?: number;
  endYear?: number;
  categories?: string[];
  maxPerCategoryPerYear?: number;
}

export interface HistoricalPrepopulateResult {
  drafts: ContractDraft[];
  liveCount: number;
  syntheticCount: number;
  range: { startYear: number; endYear: number };
  categories: InformationType[];
  warnings: string[];
}

function normalizeCategory(input: string): InformationType | null {
  const clean = input.trim().toLowerCase();
  if (clean === "contracts" || clean === "contract") return "Contracts";
  if (clean === "financial results" || clean === "financial" || clean === "results") return "Financial Results";
  if (clean === "m&a" || clean === "ma" || clean === "m&a's" || clean === "m&as" || clean === "acquisitions") return "M&A";
  if (clean === "new offerings" || clean === "new offering" || clean === "offerings") return "New Offerings";
  if (clean === "partnerships" || clean === "partnership" || clean === "alliances") return "Partnerships";
  return null;
}

function categoryQuery(category: InformationType): string {
  if (category === "Contracts") return '(signed OR awarded OR outsourcing contract OR multi-year deal)';
  if (category === "Financial Results") return '(quarterly results OR annual results OR earnings OR revenue guidance)';
  if (category === "M&A") return '(acquired OR acquires OR merger OR to buy)';
  if (category === "New Offerings") return '(launched OR unveils OR introduced OR new service offering)';
  return '(partnership OR strategic alliance OR teamed up OR collaboration)';
}

function categoryKeyword(category: InformationType): string {
  if (category === "Contracts") return "outsourcing contract OR signed deal OR awarded contract";
  if (category === "Financial Results") return "earnings OR quarterly results OR annual revenue";
  if (category === "M&A") return "acquired OR acquisition OR merger";
  if (category === "New Offerings") return "launched OR announced new offering";
  return "partnership OR strategic alliance OR collaboration";
}

function serviceLineFromText(input: string): string {
  const text = input.toLowerCase();
  if (/finance|accounting|order-to-cash|accounts payable|ap\b|ar\b/.test(text)) return "F&A";
  if (/infrastructure|network|workplace|datacenter|cloud ops/.test(text)) return "Infrastructure Services";
  if (/application|app modernization|devops|engineering/.test(text)) return "Application Services";
  if (/hr|payroll|talent/.test(text)) return "HR Services";
  if (/security|cyber/.test(text)) return "Cybersecurity";
  if (/analytics|data|ai|automation/.test(text)) return "Analytics";
  if (/customer operations|contact center|cx|bpo/.test(text)) return "Customer Operations";
  return "General Services";
}

function industryFromText(input: string): string {
  const text = input.toLowerCase();
  if (/retail/.test(text)) return "Retail";
  if (/telecom|communications/.test(text)) return "Telecom";
  if (/health|payer|provider|pharma/.test(text)) return "Healthcare";
  if (/bank|financial|insurance|bfsi/.test(text)) return "BFSI";
  if (/manufacturing|industrial|automotive/.test(text)) return "Manufacturing";
  if (/public sector|government/.test(text)) return "Public Sector";
  return "Cross-Industry";
}

function platformFromText(input: string): string {
  const text = input.toLowerCase();
  if (text.includes("servicenow")) return "ServiceNow";
  if (text.includes("workday")) return "Workday";
  if (text.includes("salesforce")) return "Salesforce";
  if (text.includes("snowflake")) return "Snowflake";
  if (text.includes("sap")) return "SAP";
  if (text.includes("aws") || text.includes("amazon web services")) return "AWS";
  if (text.includes("azure")) return "Azure";
  if (text.includes("google cloud")) return "Google Cloud";
  if (text.includes("coupa")) return "Coupa";
  if (text.includes("ariba")) return "Ariba";
  return "Not Specified";
}

function geographyFromText(input: string): string {
  const text = input.toLowerCase();
  if (/north america|united states|us|canada/.test(text)) return "North America";
  if (/europe|uk|united kingdom|germany|france|spain|italy/.test(text)) return "Europe";
  if (/asia|india|philippines|singapore|japan|china|korea/.test(text)) return "Asia";
  if (/south america|latin america|brazil|argentina|chile|peru|colombia|mexico/.test(text)) return "South America";
  if (/oceania|australia|new zealand/.test(text)) return "Oceania";
  return "Global";
}

function parseMoney(input: string): { value: number; estimated: boolean } {
  const text = input.toLowerCase();

  const b = text.match(/\$\s*(\d+(?:\.\d+)?)\s*(billion|bn|b)\b/);
  if (b) return { value: Math.round(Number(b[1]) * 1_000_000_000), estimated: true };

  const m = text.match(/\$\s*(\d+(?:\.\d+)?)\s*(million|mn|m)\b/);
  if (m) return { value: Math.round(Number(m[1]) * 1_000_000), estimated: true };

  const plain = text.match(/\$\s*(\d{1,3}(?:,\d{3})+)/);
  if (plain) return { value: Number(plain[1].replaceAll(",", "")), estimated: false };

  return { value: 0, estimated: true };
}

function parseDateFromSeeDate(seendate: string | undefined, fallbackYear: number): string {
  if (seendate) {
    const digits = seendate.replace(/\D/g, "");
    if (digits.length >= 8) {
      const y = digits.slice(0, 4);
      const m = digits.slice(4, 6);
      const d = digits.slice(6, 8);
      return `${y}-${m}-${d}`;
    }
  }

  return `${fallbackYear}-06-30`;
}

function categoryDefaults(category: InformationType): { months: number; contractType: string; defaultTcv: number } {
  if (category === "Contracts") return { months: 36, contractType: "New Contract", defaultTcv: 15_000_000 };
  if (category === "Financial Results") return { months: 0, contractType: "Financial Results", defaultTcv: 0 };
  if (category === "M&A") return { months: 0, contractType: "Acquisition", defaultTcv: 0 };
  if (category === "New Offerings") return { months: 0, contractType: "New Offering", defaultTcv: 0 };
  return { months: 0, contractType: "Strategic Partnership", defaultTcv: 0 };
}

async function fetchCategoryArticles(category: InformationType, startYear: number, endYear: number, maxPerCategoryPerYear: number): Promise<GdeltArticle[]> {
  const years = endYear - startYear + 1;
  const maxrecords = Math.min(250, Math.max(80, years * maxPerCategoryPerYear * 4));

  const query = `(${categoryQuery(category)}) AND ("IT services" OR "business services" OR outsourcing OR "digital services")`;
  const params = new URLSearchParams({
    query,
    mode: "ArtList",
    format: "json",
    startdatetime: `${startYear}0101000000`,
    enddatetime: `${endYear}1231235959`,
    maxrecords: String(maxrecords),
  });

  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`GDELT ${category} fetch failed (${res.status})`);

  const text = await res.text();
  if (!text.trim().startsWith("{")) {
    throw new Error(`GDELT ${category} returned non-JSON payload`);
  }

  const payload = JSON.parse(text) as { articles?: GdeltArticle[] };
  return Array.isArray(payload.articles) ? payload.articles : [];
}

function toSeeDate(value: string | undefined, fallbackYear: number): string {
  if (!value) return `${fallbackYear}0630000000`;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return `${fallbackYear}0630000000`;
  const y = String(d.getUTCFullYear());
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}${m}${day}000000`;
}

function parseRssItems(xml: string): Array<{ title: string; link: string; pubDate: string }> {
  const items: Array<{ title: string; link: string; pubDate: string }> = [];
  const chunks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  for (const chunk of chunks) {
    const title = (chunk.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || chunk.match(/<title>(.*?)<\/title>/))?.[1]?.trim();
    const link = chunk.match(/<link>(.*?)<\/link>/)?.[1]?.trim();
    const pubDate = chunk.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim();
    if (!title || !link) continue;
    items.push({ title, link, pubDate: pubDate ?? "" });
  }

  return items;
}

async function fetchInvestorRelationsAndAlphaSenseArticles(category: InformationType, startYear: number, endYear: number, maxPerCategoryPerYear: number): Promise<GdeltArticle[]> {
  const out: GdeltArticle[] = [];
  const providerClause = providerProfiles.map((p) => `"${p.name}"`).join(" OR ");
  const siteClause = providerProfiles.map((p) => `site:${p.irDomain}`).join(" OR ");

  for (let year = startYear; year <= endYear; year += 1) {
    const query = `(${providerClause}) (${categoryKeyword(category)}) ("IT services" OR "business services" OR outsourcing) (${siteClause} OR site:alphasense.com) after:${year}-01-01 before:${year + 1}-01-01`;
    const params = new URLSearchParams({
      q: query,
      hl: "en-US",
      gl: "US",
      ceid: "US:en",
    });

    const url = `https://news.google.com/rss/search?${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) continue;

    const xml = await res.text();
    const items = parseRssItems(xml).slice(0, maxPerCategoryPerYear);
    for (const item of items) {
      const provider = providerProfiles.find((p) => new RegExp(`\\b${p.name.replace(/\s+/g, "\\s+")}\\b`, "i").test(item.title));
      const sourceTag = /alphasense/i.test(item.title) || /alphasense/i.test(item.link) ? "AlphaSense" : `InvestorRelations:${provider?.name ?? "Unknown"}`;
      out.push({
        title: item.title.replace(/\s+-\s+[^-]+$/, "").trim(),
        url: item.link,
        seendate: toSeeDate(item.pubDate, year),
        domain: sourceTag,
      });
    }
  }

  return out;
}

function articleToDraft(article: GdeltArticle, category: InformationType, fallbackYear: number): ContractDraft | null {
  const title = article.title?.trim();
  if (!title || title.length < 12) return null;

  const defaults = categoryDefaults(category);
  const isContract = category === "Contracts";
  const startDate = parseDateFromSeeDate(article.seendate, fallbackYear);
  const money = parseMoney(title);
  const provider = detectProvider({
    title,
    body: title,
    source: article.domain,
    articleUrl: article.url,
    fallback: "Unknown Provider",
  });
  const platform = platformFromText(title);
  const normalizedTitle = titleWithProvider(provider, title);

  return {
    title: normalizedTitle,
    body: `Auto-ingested ${category} market intelligence from ${article.domain ?? "external source"} on ${startDate}.`,
    articleUrl: article.url,
    informationType: category,
    serviceLine: serviceLineFromText(title),
    industry: industryFromText(title),
    serviceProvider: provider,
    geography: geographyFromText(title),
    countrySigned: article.sourcecountry || "Not Specified",
    deliveryLocation: "Global",
    clientName: category === "Contracts" ? "Undisclosed Client" : "N/A",
    contractStartDate: startDate,
    contractLengthMonths: defaults.months,
    contractEndDate: defaults.months > 0 ? deriveEndDate(startDate, defaults.months) : startDate,
    contractEndEstimated: isContract,
    tcvUsd: money.value > 0 ? money.value : defaults.defaultTcv,
    tcvEstimated: isContract ? money.estimated : false,
    contractType: defaults.contractType,
    platform,
    saasPlatform: /cloud|saas|platform|servicenow|workday|salesforce|snowflake|sap|aws|azure|google/i.test(title),
    source: article.domain?.startsWith("InvestorRelations:") || article.domain === "AlphaSense" ? article.domain : "InvestorRelations:Unknown",
    aiConfidence: 0.66,
  };
}

function syntheticDraft(category: InformationType, year: number): ContractDraft {
  const defaults = categoryDefaults(category);
  const isContract = category === "Contracts";
  const date = `${year}-06-30`;
  const provider = knownProviders[Math.abs(year + category.length) % knownProviders.length];

  return {
    title: `${provider} ${category.toLowerCase()} market update in IT and business services (${year})`,
    body: `Synthetic backfill for ${category} in ${year}, generated because no live source item was retained for this year/category during ingestion.`,
    informationType: category,
    serviceLine: "General Services",
    industry: "Cross-Industry",
    serviceProvider: provider,
    geography: "Global",
    countrySigned: "Not Specified",
    deliveryLocation: "Global",
    clientName: category === "Contracts" ? "Undisclosed Client" : "N/A",
    contractStartDate: date,
    contractLengthMonths: defaults.months,
    contractEndDate: defaults.months > 0 ? deriveEndDate(date, defaults.months) : date,
    contractEndEstimated: isContract,
    tcvUsd: defaults.defaultTcv,
    tcvEstimated: isContract,
    contractType: defaults.contractType,
    platform: "Not Specified",
    saasPlatform: false,
    source: "Synthetic historical backfill",
    aiConfidence: 0.52,
  };
}

export async function buildHistoricalDrafts(options: HistoricalPrepopulateOptions = {}): Promise<HistoricalPrepopulateResult> {
  const nowYear = new Date().getUTCFullYear();
  const startYear = Math.max(2010, Math.min(nowYear, Number(options.startYear ?? 2010)));
  const endYear = Math.max(startYear, Math.min(nowYear, Number(options.endYear ?? nowYear)));
  const maxPerCategoryPerYear = Math.max(1, Math.min(6, Number(options.maxPerCategoryPerYear ?? 2)));

  const requested = options.categories?.length
    ? options.categories.map(normalizeCategory).filter((v): v is InformationType => Boolean(v))
    : allCategories;

  const categories = requested.length > 0 ? [...new Set(requested)] : allCategories;
  const drafts: ContractDraft[] = [];
  const warnings: string[] = [];

  let liveCount = 0;
  let syntheticCount = 0;

  for (const category of categories) {
    const countsByYear = new Map<number, number>();
    let articles: GdeltArticle[] = [];

    try {
      articles = await fetchInvestorRelationsAndAlphaSenseArticles(category, startYear, endYear, maxPerCategoryPerYear);
      warnings.push(`Investor relations + AlphaSense search used for ${category}`);
    } catch (error) {
      warnings.push(`Investor relations + AlphaSense ${category} search failed: ${(error as Error).message}`);
    }

    const seen = new Set<string>();
    for (const article of articles) {
      const startDate = parseDateFromSeeDate(article.seendate, startYear);
      const year = Number(startDate.slice(0, 4));
      if (year < startYear || year > endYear) continue;
      const key = `${article.title?.toLowerCase() ?? ""}|${year}`;
      if (!key.trim() || seen.has(key)) continue;

      const count = countsByYear.get(year) ?? 0;
      if (count >= maxPerCategoryPerYear) continue;

      const draft = articleToDraft(article, category, year);
      if (!draft) continue;

      drafts.push(draft);
      countsByYear.set(year, count + 1);
      seen.add(key);
      liveCount += 1;
    }

    for (let year = startYear; year <= endYear; year += 1) {
      if ((countsByYear.get(year) ?? 0) > 0) continue;
      drafts.push(syntheticDraft(category, year));
      syntheticCount += 1;
    }
  }

  return {
    drafts,
    liveCount,
    syntheticCount,
    range: { startYear, endYear },
    categories,
    warnings,
  };
}
