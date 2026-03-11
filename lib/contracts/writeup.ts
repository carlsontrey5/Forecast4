import type { ContractDraft, ContractRecord, InformationType } from "@/lib/contracts/types";

interface ThreeColRow {
  metric: string;
  current: string;
  previous: string;
}

interface KeyFigureRow {
  metric: string;
  unit?: string;
  priorYear: string;
  currentYear: string;
  change: string;
}

interface RegionRow {
  region: string;
  revenueCurrent: string;
  yoyReported: string;
  yoyConstantCurrency: string;
  opMarginPrior: string;
  opMarginCurrent: string;
}

interface SummaryPayload {
  summary: string;
  insight: string;
  keyFiguresTable?: KeyFigureRow[];
  operationsByRegionTable?: RegionRow[];
}

function trimToWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function normalizeNarrativeText(text: string): string {
  return text
    .replace(/Article Type:\s*[^\n]+/gi, " ")
    .replace(/Summary:\s*/gi, " ")
    .replace(/Insight:\s*/gi, " ")
    .replace(/Correlated Historical Signals:[\s\S]*/gi, " ")
    .replace(/Deal Finder Intelligence[\s\S]*/gi, " ")
    .replace(/Original Article URL:\s*\S+/gi, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function coreSignal(text: string): string {
  const normalized = normalizeNarrativeText(text);
  if (!normalized) return "no additional operational detail was disclosed";
  const sentence = normalized.split(/(?<=[.!?])\s+/)[0] ?? normalized;
  return trimToWords(sentence, 28);
}

function conciseSummary(type: InformationType, draft: ContractDraft, sourceText: string): string {
  const provider = draft.serviceProvider ?? "Provider";
  const line = draft.serviceLine ?? "general services";
  const industry = draft.industry ?? "cross-industry";
  const geo = draft.geography ?? "global";
  const signal = coreSignal(sourceText);

  if (type === "Contracts") {
    return trimToWords(
      `Contract update: ${provider} announced ${signal}. Scope: ${line} in ${industry}, ${geo}. Estimated end date: ${draft.contractEndDate ?? "not disclosed"}.`,
      75,
    );
  }
  if (type === "Financial Results") {
    return trimToWords(
      `Financial results update: ${provider} reported a period performance disclosure. Signal: ${signal}. Focus areas are revenue trend, margin profile, and demand mix by region/service line.`,
      75,
    );
  }
  if (type === "M&A") {
    return trimToWords(
      `M&A update: ${provider} disclosed portfolio activity. Signal: ${signal}. This tracks capability consolidation and integration implications for IT and business services.`,
      75,
    );
  }
  if (type === "Partnerships") {
    return trimToWords(
      `Partnership update: ${provider} announced ecosystem collaboration. Signal: ${signal}. This indicates partner-led delivery strategy and go-to-market acceleration.`,
      75,
    );
  }
  return trimToWords(
    `New-offering update: ${provider} introduced portfolio change. Signal: ${signal}. This reflects service-line innovation and commercialization priorities.`,
    75,
  );
}

function implicationTextByType(type: InformationType): string {
  if (type === "Contracts") {
    return "Market implication: near-term rebid pressure and renewal risk are the key watchpoints. Provider implication: delivery quality, pricing discipline, and incumbent retention strategy will shape outcomes.";
  }
  if (type === "Financial Results") {
    return "Market implication: spend velocity and margin durability remain primary indicators. Provider implication: mix quality, productivity execution, and pipeline conversion determine competitiveness.";
  }
  if (type === "M&A") {
    return "Market implication: capability consolidation continues in priority subsegments. Provider implication: integration speed, talent retention, and cross-sell realization determine value capture.";
  }
  if (type === "New Offerings") {
    return "Market implication: providers are repositioning toward higher-value, outcome-led services. Provider implication: proposition clarity and attach rates into existing clients determine traction.";
  }
  return "Market implication: ecosystem dependency is increasing for end-to-end transformation delivery. Provider implication: alliance governance and joint-accountability models will drive commercial results.";
}

function correlatedHistory(draft: ContractDraft, corpus: ContractRecord[]): ContractRecord[] {
  const date = draft.contractStartDate ?? "9999-12-31";
  return corpus
    .filter((c) => c.contractStartDate <= date)
    .filter((c) => c.serviceProvider === draft.serviceProvider || c.serviceLine === draft.serviceLine || c.industry === draft.industry)
    .filter((c) => c.title.toLowerCase() !== draft.title.toLowerCase())
    .sort((a, b) => b.contractStartDate.localeCompare(a.contractStartDate))
    .slice(0, 4);
}

function normalizeSimpleTable(rows: ThreeColRow[] | undefined): ThreeColRow[] {
  if (!rows || rows.length === 0) {
    return [
      { metric: "Revenue", current: "N/A", previous: "N/A" },
      { metric: "Operating margin", current: "N/A", previous: "N/A" },
      { metric: "Growth", current: "N/A", previous: "N/A" },
    ];
  }

  return rows.slice(0, 8).map((r) => ({
    metric: r.metric?.trim() || "N/A",
    current: r.current?.trim() || "N/A",
    previous: r.previous?.trim() || "N/A",
  }));
}

function normalizeKeyFigures(rows: KeyFigureRow[] | undefined): KeyFigureRow[] {
  if (!rows || rows.length === 0) {
    return [
      { metric: "Revenues", unit: "(in reported currency millions)", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Operating margin", unit: "% of revenues", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Operating profit", unit: "% of revenues", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Net profit (group share)", unit: "N/A", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Basic EPS", unit: "N/A", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Normalized EPS", unit: "N/A", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Organic free cash flow", unit: "N/A", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
      { metric: "Net cash / (Net debt)", unit: "N/A", priorYear: "N/A", currentYear: "N/A", change: "N/A" },
    ];
  }

  return rows.slice(0, 14).map((r) => ({
    metric: r.metric?.trim() || "N/A",
    unit: r.unit?.trim() || "",
    priorYear: r.priorYear?.trim() || "N/A",
    currentYear: r.currentYear?.trim() || "N/A",
    change: r.change?.trim() || "N/A",
  }));
}

function normalizeRegionRows(rows: RegionRow[] | undefined): RegionRow[] {
  if (!rows || rows.length === 0) {
    return [
      { region: "Total", revenueCurrent: "N/A", yoyReported: "N/A", yoyConstantCurrency: "N/A", opMarginPrior: "N/A", opMarginCurrent: "N/A" },
    ];
  }

  return rows.slice(0, 14).map((r) => ({
    region: r.region?.trim() || "N/A",
    revenueCurrent: r.revenueCurrent?.trim() || "N/A",
    yoyReported: r.yoyReported?.trim() || "N/A",
    yoyConstantCurrency: r.yoyConstantCurrency?.trim() || "N/A",
    opMarginPrior: r.opMarginPrior?.trim() || "N/A",
    opMarginCurrent: r.opMarginCurrent?.trim() || "N/A",
  }));
}

function financialTablesMarkdown(keyFigures: KeyFigureRow[], regions: RegionRow[]): string {
  const keyHeader = [
    "Financial Results: Key Figures",
    "| Metric | Unit | Prior Year | Current Year | Change |",
    "|---|---|---|---|---|",
  ];
  const keyBody = keyFigures.map((r) => `| ${r.metric} | ${r.unit || "-"} | ${r.priorYear} | ${r.currentYear} | ${r.change} |`);

  const regHeader = [
    "Operations by Region",
    "| Region | Revenue (Current Period) | YoY Reported | YoY Constant Currency | Operating Margin Prior Year | Operating Margin Current Year |",
    "|---|---|---|---|---|---|",
  ];
  const regBody = regions.map((r) => `| ${r.region} | ${r.revenueCurrent} | ${r.yoyReported} | ${r.yoyConstantCurrency} | ${r.opMarginPrior} | ${r.opMarginCurrent} |`);

  return [...keyHeader, ...keyBody, "", ...regHeader, ...regBody].join("\n");
}

async function callOpenAi(payload: {
  draft: ContractDraft;
  related: ContractRecord[];
}): Promise<SummaryPayload | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const preferred = process.env.OPENAI_SUMMARY_MODEL ?? "chatgpt-5.4";
  const fallback = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const models = [...new Set([preferred, fallback, "gpt-4o-mini"])];

  const type = payload.draft.informationType ?? "Contracts";
  const prompt = `You are producing concise but high-integrity IT services market intelligence in an institutional analyst structure (similar framing quality expected from top-tier analyst firms). Return strict JSON with keys:\nsummary, insight, keyFiguresTable, operationsByRegionTable.\nRules:\n1) summary must be <=200 words and factual to provided input.\n2) Use a neutral, evidence-led tone; avoid hype.\n3) insight must synthesize market and provider implications in one paragraph.\n4) For Financial Results, include both tables:\n   keyFiguresTable rows with {metric, unit, priorYear, currentYear, change}\n   operationsByRegionTable rows with {region, revenueCurrent, yoyReported, yoyConstantCurrency, opMarginPrior, opMarginCurrent}\n   Include metrics such as revenues, operating margin, operating profit, net profit, EPS, normalized EPS, free cash flow, net cash/debt where available; use N/A when missing.\n5) For non-financial article types, return both tables as empty arrays.\n6) Do not invent precise numbers; if absent, use N/A.`;

  const input = {
    informationType: type,
    title: payload.draft.title,
    body: payload.draft.body,
    provider: payload.draft.serviceProvider,
    serviceLine: payload.draft.serviceLine,
    geography: payload.draft.geography,
    articleUrl: payload.draft.articleUrl ?? null,
    correlatedHistory: payload.related.map((r) => ({ date: r.contractStartDate, title: r.title })),
  };

  for (const model of models) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.15,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "Return valid JSON only." },
            { role: "user", content: `${prompt}\n\n${JSON.stringify(input)}` },
          ],
        }),
        cache: "no-store",
      });

      if (!res.ok) continue;
      const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
      const content = data.choices?.[0]?.message?.content;
      if (!content) continue;
      return JSON.parse(content) as SummaryPayload;
    } catch {
      // try next model
    }
  }

  return null;
}

function fallbackWriteUp(draft: ContractDraft, corpus: ContractRecord[]): string {
  const type = draft.informationType ?? "Contracts";
  const related = correlatedHistory(draft, corpus);

  const firstParagraph = conciseSummary(type, draft, draft.body);
  const secondParagraph = implicationTextByType(type);

  const lines = [
    `Article Type: ${type}`,
    `Summary:\n${firstParagraph}`,
    `Insight:\n${secondParagraph}`,
    `Correlated Historical Signals:\n${related.length > 0 ? related.map((c) => `${c.contractStartDate}: ${c.title}`).join(" | ") : "No direct prior correlate found in current dataset."}`,
  ];

  if (type === "Financial Results") {
    const basic = normalizeSimpleTable(undefined);
    const kf = basic.map((r) => ({ metric: r.metric, unit: "N/A", priorYear: r.previous, currentYear: r.current, change: "N/A" }));
    const regs = normalizeRegionRows(undefined);
    lines.push(financialTablesMarkdown(normalizeKeyFigures(kf), regs));
  }

  if (draft.articleUrl?.trim()) lines.push(`Original Article URL: ${draft.articleUrl.trim()}`);
  return lines.join("\n\n");
}

export async function buildDetailedWriteUp(draft: ContractDraft, corpus: ContractRecord[]): Promise<string> {
  const type = draft.informationType ?? "Contracts";
  const related = correlatedHistory(draft, corpus);
  const ai = await callOpenAi({ draft, related });

  if (!ai) return fallbackWriteUp(draft, corpus);

  const firstParagraph = conciseSummary(type, draft, ai.summary || draft.body);
  const secondParagraph = ai.insight ? trimToWords(normalizeNarrativeText(ai.insight), 75) : implicationTextByType(type);

  const lines = [
    `Article Type: ${type}`,
    `Summary:\n${firstParagraph}`,
    `Insight:\n${secondParagraph}`,
    `Correlated Historical Signals:\n${related.length > 0 ? related.map((c) => `${c.contractStartDate}: ${c.title}`).join(" | ") : "No direct prior correlate found in current dataset."}`,
  ];

  if (type === "Financial Results") {
    const keyFigures = normalizeKeyFigures(ai.keyFiguresTable);
    const regionRows = normalizeRegionRows(ai.operationsByRegionTable);
    lines.push(financialTablesMarkdown(keyFigures, regionRows));
  }

  if (draft.articleUrl?.trim()) lines.push(`Original Article URL: ${draft.articleUrl.trim()}`);

  return lines.join("\n\n");
}

export function buildDeterministicWriteUp(draft: ContractDraft, corpus: ContractRecord[]): string {
  return fallbackWriteUp(draft, corpus);
}
