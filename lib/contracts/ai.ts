import type { ContractDraft, InformationType } from "@/lib/contracts/types";
import { detectProvider } from "@/lib/contracts/providers";

const infoTypeRules: Array<{ pattern: RegExp; type: InformationType }> = [
  { pattern: /financial results|earnings|revenue|fiscal|quarterly|annual results/i, type: "Financial Results" },
  { pattern: /acquir|merger|m&a/i, type: "M&A" },
  { pattern: /launch|new offering|introduced/i, type: "New Offerings" },
  { pattern: /partnership|alliance|collaborat/i, type: "Partnerships" },
  { pattern: /contract|agreement|awarded|signed/i, type: "Contracts" },
];

const serviceLineRules: Array<{ pattern: RegExp; value: string }> = [
  { pattern: /finance|accounting|order-to-cash|ap\b|ar\b/i, value: "F&A" },
  { pattern: /banking operations|core banking|payments/i, value: "Banking Operations Transformation" },
  { pattern: /customer experience|cx|contact center/i, value: "Customer Experience Transformation" },
  { pattern: /industry-specific customer experience|customer experience services by industry/i, value: "Customer experience Services by Industry" },
  { pattern: /supply chain|logistics|planning/i, value: "Supply Chain Transformation" },
  { pattern: /hr transformation/i, value: "HR Transformation" },
  { pattern: /hr|talent|workforce/i, value: "HR & Talent Transformation" },
  { pattern: /healthcare|insurance/i, value: "Healthcare & Insurance Transformation" },
  { pattern: /procurement|source-to-pay/i, value: "Procurement" },
  { pattern: /rpo|talent acquisition/i, value: "RPO and Total Talent Acquisition" },
  { pattern: /payroll/i, value: "Payroll Services" },
  { pattern: /infrastructure|network|workplace|datacenter|cloud ops/i, value: "Cloud and Infrastructure Management" },
  { pattern: /mortgage|loan servicing/i, value: "Mortgage and Loan services" },
  { pattern: /wealth|asset management/i, value: "Wealth and Asset Management" },
  { pattern: /life insurance|annuities/i, value: "Life & Annuities" },
  { pattern: /payer/i, value: "Healthcare Payer" },
  { pattern: /property and casualty|p&c|property & casualty/i, value: "Property & Casualty" },
  { pattern: /learning tech|lms|learning services/i, value: "Learning Tech & Services" },
  { pattern: /benefits administration|benefits/i, value: "Benefits Administration" },
];

const industryRules: Array<{ pattern: RegExp; value: string }> = [
  { pattern: /retail/i, value: "Retail" },
  { pattern: /telecom|communications/i, value: "Telecom" },
  { pattern: /health|payer|provider/i, value: "Healthcare" },
  { pattern: /bank|financial|insurance|bfsi/i, value: "BFSI" },
  { pattern: /manufacturing|industrial/i, value: "Manufacturing" },
  { pattern: /public sector|government/i, value: "Public Sector" },
];

const platformRules = ["Workday", "SAP", "Salesforce", "ServiceNow", "AWS", "Azure", "Google Cloud", "Snowflake", "Coupa", "Ariba"];

const geographyRules: Array<{ pattern: RegExp; value: string; country?: string }> = [
  { pattern: /north america|us|united states|canada/i, value: "North America", country: "United States" },
  { pattern: /europe|uk|united kingdom|france|germany|spain|italy/i, value: "Europe", country: "United Kingdom" },
  { pattern: /asia|india|philippines|singapore|japan|china|korea|thailand|vietnam|indonesia/i, value: "Asia", country: "India" },
  { pattern: /south america|latin america|brazil|mexico|argentina|chile|peru|colombia/i, value: "South America", country: "Brazil" },
  { pattern: /oceania|australia|new zealand/i, value: "Oceania", country: "Australia" },
  { pattern: /global|multinational/i, value: "Global" },
];

type ExtractedEvent = {
  event_type?: string;
  event_subtype?: string;
  confidence_score?: number;
  materiality_score?: number;
  evidence_status?: string;
  canonical_company_names?: string[];
  aliases_detected?: string[];
  announcement_date?: string;
  effective_date?: string;
  source_type?: string;
  source_tier?: string;
  source_url?: string;
  structured_summary?: string;
  structured_metadata?: Record<string, unknown>;
  dedupe_hints?: unknown;
  summary?: string;
  key_evidence?: string[];
  uncertainty_notes?: string[];
  source?: {
    source_type?: string;
    source_tier?: string;
    evidence_status?: string;
    url?: string | null;
    title?: string | null;
  };
  scoring?: {
    confidence_score?: number | null;
    materiality_score?: number | null;
    partnership_depth_score?: number | null;
  };
};

type EventExtractionOutput = {
  relevant?: boolean;
  reason?: string;
  events?: ExtractedEvent[];
};

type EventTypeKey = "contract_announcement" | "financial_announcement" | "m&a" | "new_offering" | "partnership";

type CompanyIdentityResolution = {
  extracted_name?: string;
  canonical_name?: string;
  entity_type?: string;
  parent_company?: string | null;
  historical_aliases?: string[];
  uncertainty_flag?: boolean;
  notes?: string;
};

function eventMateriality(event: ExtractedEvent): number {
  if (typeof event.materiality_score === "number") return event.materiality_score;
  const nested = event.scoring?.materiality_score;
  if (typeof nested === "number") return nested;
  return 0;
}

function eventConfidence(event: ExtractedEvent): number {
  if (typeof event.confidence_score === "number") return event.confidence_score;
  const nested = event.scoring?.confidence_score;
  if (typeof nested === "number") return nested;
  return 0;
}

function normalizeSchemaStyleEvent(raw: unknown): ExtractedEvent {
  const obj = asObject(raw) ?? {};
  const source = asObject(obj.source) ?? {};
  const dates = asObject(obj.dates) ?? {};
  const provider = asObject(obj.provider) ?? {};
  const counterparties = asObject(obj.counterparties) ?? {};
  const classification = asObject(obj.classification) ?? {};
  const geography = asObject(classification.geography) ?? {};
  const values = asObject(obj.value_fields) ?? {};
  const scoring = asObject(obj.scoring) ?? {};
  const keyEvidence = Array.isArray(obj.key_evidence)
    ? obj.key_evidence.filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    : [];
  const uncertaintyNotes = Array.isArray(obj.uncertainty_notes)
    ? obj.uncertainty_notes.filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    : [];

  const canonical = readStringFromObject(provider, ["canonical_name"]);
  const extracted = readStringFromObject(provider, ["extracted_name"]);
  const companies = [canonical, extracted]
    .concat(["client", "partner", "target", "seller"].map((k) => readStringFromObject(counterparties, [k])))
    .filter((v): v is string => Boolean(v));

  return {
    event_type: readStringFromObject(obj, ["event_type"]),
    event_subtype: readStringFromObject(obj, ["event_subtype"]),
    confidence_score: readNumberFromObject(scoring, ["confidence_score"]) ?? readNumberFromObject(obj, ["confidence_score"]),
    materiality_score: readNumberFromObject(scoring, ["materiality_score"]) ?? readNumberFromObject(obj, ["materiality_score"]),
    evidence_status: readStringFromObject(source, ["evidence_status"]) ?? readStringFromObject(obj, ["evidence_status"]),
    canonical_company_names: companies,
    aliases_detected: [],
    announcement_date: readStringFromObject(dates, ["announcement_date"]) ?? readStringFromObject(obj, ["announcement_date"]),
    effective_date:
      readStringFromObject(dates, ["effective_date", "completion_date"]) ??
      readStringFromObject(obj, ["effective_date", "completion_date"]),
    source_type: readStringFromObject(source, ["source_type"]) ?? readStringFromObject(obj, ["source_type"]),
    source_tier: readStringFromObject(source, ["source_tier"]) ?? readStringFromObject(obj, ["source_tier"]),
    source_url: readStringFromObject(source, ["url"]) ?? readStringFromObject(obj, ["source_url"]),
    structured_summary: readStringFromObject(obj, ["summary", "structured_summary"]),
    structured_metadata: {
      provider: canonical ?? extracted ?? null,
      provider_extracted: extracted ?? null,
      provider_canonical: canonical ?? null,
      client: readStringFromObject(counterparties, ["client"]) ?? null,
      partner: readStringFromObject(counterparties, ["partner"]) ?? null,
      target: readStringFromObject(counterparties, ["target"]) ?? null,
      seller: readStringFromObject(counterparties, ["seller"]) ?? null,
      service_line: readStringFromObject(classification, ["macro_service_line"]) ?? null,
      micro_service_line: readStringFromObject(classification, ["micro_service_line"]) ?? null,
      industry: readStringFromObject(classification, ["industry"]) ?? null,
      geography: readStringFromObject(geography, ["region", "continent"]) ?? null,
      country: readStringFromObject(geography, ["country"]) ?? null,
      contract_term: values.term_length ?? null,
      contract_value: values.contract_value ?? null,
      deal_value: values.deal_value ?? null,
      currency: values.currency ?? null,
      stake_percentage: values.stake_percentage ?? null,
      revenue: values.revenue ?? null,
      revenue_growth_reported: values.revenue_growth_reported ?? null,
      constant_currency_growth: values.constant_currency_growth ?? null,
      operating_margin: values.operating_margin ?? null,
      bookings: values.bookings ?? null,
      guidance: values.guidance ?? null,
      key_evidence: keyEvidence,
      uncertainty_notes: uncertaintyNotes,
    },
    dedupe_hints: undefined,
    summary: readStringFromObject(obj, ["summary"]),
    key_evidence: keyEvidence,
    uncertainty_notes: uncertaintyNotes,
    source: {
      source_type: readStringFromObject(source, ["source_type"]),
      source_tier: readStringFromObject(source, ["source_tier"]),
      evidence_status: readStringFromObject(source, ["evidence_status"]),
      url: readStringFromObject(source, ["url"]),
      title: readStringFromObject(source, ["title"]),
    },
    scoring: {
      confidence_score: readNumberFromObject(scoring, ["confidence_score"]),
      materiality_score: readNumberFromObject(scoring, ["materiality_score"]),
      partnership_depth_score: readNumberFromObject(scoring, ["partnership_depth_score"]),
    },
  };
}

function pickByRules(input: string, rules: Array<{ pattern: RegExp; value: string }>, fallback: string): string {
  const hit = rules.find((rule) => rule.pattern.test(input));
  return hit?.value ?? fallback;
}

function pickInformationType(input: string): InformationType {
  const hit = infoTypeRules.find((rule) => rule.pattern.test(input));
  return hit?.type ?? "Contracts";
}

function pickPlatform(input: string): string {
  const hit = platformRules.find((platform) => new RegExp(platform, "i").test(input));
  return hit ?? "Not Specified";
}

function parseDate(input: string): string {
  const fullDate = input.match(/\b([A-Z][a-z]+\s+\d{1,2},\s*\d{4})\b/);
  if (fullDate) {
    const d = new Date(fullDate[1]);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  const monthYear = input.match(/\b([A-Z][a-z]+\s+\d{4})\b/);
  if (monthYear) {
    const d = new Date(`${monthYear[1]} 01`);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
}

function parseMonths(input: string): number {
  const years = input.match(/(\d+)\s*-?\s*year/i);
  if (years) return Number(years[1]) * 12;

  const months = input.match(/(\d+)\s*-?\s*month/i);
  if (months) return Number(months[1]);

  return 24;
}

function parseTcv(input: string): { value: number; estimated: boolean } {
  const bill = input.match(/\$\s*(\d+(?:\.\d+)?)\s*b/i);
  if (bill) return { value: Math.round(Number(bill[1]) * 1_000_000_000), estimated: true };

  const mill = input.match(/\$\s*(\d+(?:\.\d+)?)\s*m/i);
  if (mill) return { value: Math.round(Number(mill[1]) * 1_000_000), estimated: true };

  const plain = input.match(/\$\s*(\d{1,3}(?:,\d{3})+)/);
  if (plain) return { value: Number(plain[1].replaceAll(",", "")), estimated: false };

  return { value: 5_000_000, estimated: true };
}

function deriveEndDate(startDate: string, months: number): string {
  const d = new Date(startDate);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function titleFromText(input: string, provider: string): string {
  const firstSentence = input.split(/[.!?]/).find((line) => line.trim().length > 20)?.trim();
  if (firstSentence) return firstSentence;
  return `${provider} contract update`;
}

function bodyFromText(input: string): string {
  const clean = input.replace(/\s+/g, " ").trim();
  return clean.length > 420 ? `${clean.slice(0, 417)}...` : clean;
}

function clientFromText(input: string): string {
  const withClient = input.match(/with\s+(?:a|an|the)?\s*([A-Za-z0-9\-\s]+?)\s*(?:,|\.|for|to)/i);
  if (withClient && withClient[1]) return withClient[1].trim();
  return "Undisclosed Client";
}

function geographyFromText(input: string): { geography: string; country: string } {
  const hit = geographyRules.find((rule) => rule.pattern.test(input));
  return {
    geography: hit?.value ?? "Global",
    country: hit?.country ?? "Not Specified",
  };
}

function confidenceFromDraft(draft: ContractDraft): number {
  const checks = [
    draft.serviceProvider && draft.serviceProvider !== "Unknown Provider",
    draft.serviceLine && draft.serviceLine !== "General Services",
    draft.industry && draft.industry !== "Cross-Industry",
    draft.tcvUsd && draft.tcvUsd > 0,
    draft.contractLengthMonths && draft.contractLengthMonths > 0,
    draft.platform && draft.platform !== "Not Specified",
    draft.clientName && draft.clientName !== "Undisclosed Client",
  ];

  const score = checks.filter(Boolean).length / checks.length;
  return Number((0.55 + score * 0.4).toFixed(2));
}

function clampConfidence(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0.66;
  return Math.max(0.05, Math.min(0.99, value));
}

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readStringFromObject(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

function readNumberFromObject(obj: Record<string, unknown>, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const n = Number(value.replaceAll(",", "").replace(/[^0-9.\-]/g, ""));
      if (!Number.isNaN(n) && Number.isFinite(n)) return n;
    }
  }
  return undefined;
}

function readStringArrayFromObject(obj: Record<string, unknown>, keys: string[]): string[] {
  for (const key of keys) {
    const value = obj[key];
    if (Array.isArray(value)) {
      const strings = value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
      if (strings.length > 0) return strings;
    }
  }
  return [];
}

function mapEventTypeToInformationType(eventType: string | undefined): InformationType | null {
  const value = (eventType ?? "").trim().toLowerCase();
  if (!value) return null;
  if (value.includes("contract")) return "Contracts";
  if (value.includes("financial")) return "Financial Results";
  if (value.includes("merger") || value.includes("acquisition") || value.includes("m&a")) return "M&A";
  if (value.includes("offering")) return "New Offerings";
  if (value.includes("partnership")) return "Partnerships";
  return null;
}

function parseEventArray(output: unknown): { events: ExtractedEvent[]; relevant: boolean; reason?: string } {
  if (Array.isArray(output)) {
    return { events: output.map((event) => normalizeSchemaStyleEvent(event)), relevant: output.length > 0 };
  }

  const obj = asObject(output);
  if (!obj) {
    return { events: [], relevant: false, reason: "Output was not a JSON object." };
  }

  if (obj.relevant === false) {
    return { events: [], relevant: false, reason: typeof obj.reason === "string" ? obj.reason : "No valid event found." };
  }

  if (Array.isArray(obj.events)) {
    return { events: obj.events.map((event) => normalizeSchemaStyleEvent(event)), relevant: true };
  }

  if (typeof obj.event_type === "string") {
    return { events: [normalizeSchemaStyleEvent(obj)], relevant: true };
  }

  return { events: [], relevant: false, reason: "No event records were returned." };
}

function pickMostMaterialEvent(events: ExtractedEvent[]): ExtractedEvent | null {
  if (events.length === 0) return null;
  return [...events].sort((a, b) => {
    const materialA = eventMateriality(a);
    const materialB = eventMateriality(b);
    if (materialA !== materialB) return materialB - materialA;
    const confidenceA = eventConfidence(a);
    const confidenceB = eventConfidence(b);
    return confidenceB - confidenceA;
  })[0];
}

function maybeDate(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback;
  return d.toISOString().slice(0, 10);
}

function deriveMonthsFromMetadata(metadata: Record<string, unknown>, summaryText: string, fallbackMonths: number): number {
  const direct = readNumberFromObject(metadata, ["contract_length_months", "contract_term_months", "term_months", "length_months"]);
  if (typeof direct === "number" && direct > 0) return Math.round(direct);

  const term = readStringFromObject(metadata, ["contract_term", "contract_length", "term"]);
  if (term) {
    const parsed = parseMonths(term);
    if (parsed > 0) return parsed;
  }

  const parsedFromSummary = parseMonths(summaryText);
  if (parsedFromSummary > 0) return parsedFromSummary;

  return fallbackMonths;
}

function toDraftFromEvent(event: ExtractedEvent, fallbackText: string): ContractDraft {
  const fallback = extractContractFromText(fallbackText);
  const mappedType = mapEventTypeToInformationType(event.event_type) ?? fallback.informationType ?? "Contracts";
  const isContract = mappedType === "Contracts";
  const metadata = asObject(event.structured_metadata) ?? {};
  const canonicalCompanies = Array.isArray(event.canonical_company_names) ? event.canonical_company_names.filter(Boolean) : [];
  const aliases = Array.isArray(event.aliases_detected) ? event.aliases_detected.filter(Boolean) : [];

  const providerCandidate =
    canonicalCompanies[0] ||
    readStringFromObject(metadata, ["service_provider", "provider", "company", "vendor"]) ||
    fallback.serviceProvider ||
    "Unknown Provider";

  const serviceProvider = detectProvider({
    title: readStringFromObject(metadata, ["title", "headline"]),
    body: event.structured_summary,
    source: readStringFromObject(metadata, ["source", "source_name"]),
    articleUrl: event.source_url || readStringFromObject(metadata, ["source_url", "article_url", "url"]),
    fallback: providerCandidate,
  });

  const announcementDate = maybeDate(event.announcement_date, fallback.contractStartDate ?? parseDate(fallbackText));
  const effectiveDate = maybeDate(event.effective_date, announcementDate);
  const startDate = maybeDate(
    readStringFromObject(metadata, ["contract_start_date", "start_date", "service_start_date"]),
    isContract ? effectiveDate : announcementDate,
  );

  const months = isContract ? deriveMonthsFromMetadata(metadata, event.structured_summary ?? fallbackText, fallback.contractLengthMonths ?? 24) : 0;
  const endDate = isContract
    ? maybeDate(readStringFromObject(metadata, ["contract_end_date", "end_date", "term_end_date"]), deriveEndDate(startDate, months))
    : announcementDate;

  const tcvFromMetadata = readNumberFromObject(metadata, ["tcv_usd", "tcv_estimate_usd", "contract_value_usd", "deal_value_usd"]);
  const parsedTcv = parseTcv(`${event.structured_summary ?? ""} ${JSON.stringify(metadata)}`);
  const tcvUsd = isContract ? Math.round(tcvFromMetadata ?? parsedTcv.value ?? fallback.tcvUsd ?? 0) : 0;
  const tcvEstimated = isContract ? (tcvFromMetadata === undefined ? true : false) : false;

  const serviceLine = readStringFromObject(metadata, ["service_line", "service_line_horizontal", "offering_area"]) ?? fallback.serviceLine;
  const industry = readStringFromObject(metadata, ["industry", "vertical", "sector"]) ?? fallback.industry;
  const geography = readStringFromObject(metadata, ["geography", "region"]) ?? fallback.geography;
  const countrySigned = readStringFromObject(metadata, ["country_signed", "country"]) ?? fallback.countrySigned;
  const deliveryLocation = readStringFromObject(metadata, ["delivery_location", "delivery_country", "delivery_region"]) ?? fallback.deliveryLocation;
  const clientName = readStringFromObject(metadata, ["client_name", "buyer", "customer", "counterparty"]) ?? fallback.clientName;
  const platform = readStringFromObject(metadata, ["platform", "technology_platform", "stack"]) ?? fallback.platform;
  const articleUrl = event.source_url || readStringFromObject(metadata, ["source_url", "article_url", "url"]) || fallback.articleUrl;

  const summaryText = (event.structured_summary ?? "").trim();
  const evidenceStatus = (event.evidence_status ?? "inferred").trim();
  const sourceType = (event.source_type ?? "unknown").trim();
  const sourceTier = (event.source_tier ?? "secondary").trim();
  const subtype = (event.event_subtype ?? "").trim();
  const confidenceRaw = typeof event.confidence_score === "number" ? event.confidence_score : undefined;
  const confidenceScaled = typeof confidenceRaw === "number" && confidenceRaw > 1 ? confidenceRaw / 100 : confidenceRaw;

  const title =
    readStringFromObject(metadata, ["headline", "title", "event_title"]) ||
    summaryText.split(/(?<=[.!?])\s+/)[0]?.trim() ||
    fallback.title;

  const bodyLines = [
    summaryText || fallback.body,
    `Evidence Status: ${evidenceStatus}`,
    `Source Type: ${sourceType}`,
    `Source Tier: ${sourceTier}`,
  ];
  if (canonicalCompanies.length > 0) bodyLines.push(`Canonical Companies: ${canonicalCompanies.join(", ")}`);
  if (aliases.length > 0) bodyLines.push(`Aliases Detected: ${aliases.join(", ")}`);

  return normalizeAiDraft(
    {
      title,
      body: bodyLines.join("\n"),
      articleUrl,
      informationType: mappedType,
      serviceLine,
      industry,
      serviceProvider,
      geography,
      countrySigned,
      deliveryLocation,
      clientName,
      contractStartDate: startDate,
      contractLengthMonths: months,
      contractEndDate: endDate,
      contractEndEstimated: isContract ? !Boolean(readStringFromObject(metadata, ["contract_end_date", "end_date", "term_end_date"])) : false,
      tcvUsd,
      tcvEstimated,
      contractType: subtype || (mappedType === "Contracts" ? "Contract announcement" : mappedType),
      platform,
      saasPlatform: /saas|cloud|workday|salesforce|servicenow|snowflake|coupa|ariba/i.test(`${platform} ${summaryText}`),
      source: `EventExtraction:${sourceType}:${sourceTier}:${evidenceStatus}`,
      aiConfidence: clampConfidence(confidenceScaled),
      dealTypeDetail: subtype || undefined,
    },
    fallbackText,
  );
}

function mapInformationTypeToEventTypeKey(type: InformationType): EventTypeKey {
  if (type === "Contracts") return "contract_announcement";
  if (type === "Financial Results") return "financial_announcement";
  if (type === "M&A") return "m&a";
  if (type === "New Offerings") return "new_offering";
  return "partnership";
}

function mapAnyEventTypeToEventTypeKey(value: string | undefined, fallbackText: string): EventTypeKey {
  const clean = (value ?? "").toLowerCase();
  if (clean.includes("contract")) return "contract_announcement";
  if (clean.includes("financial")) return "financial_announcement";
  if (clean.includes("merger") || clean.includes("acquisition") || clean.includes("m&a")) return "m&a";
  if (clean.includes("offering")) return "new_offering";
  if (clean.includes("partnership")) return "partnership";
  return mapInformationTypeToEventTypeKey(pickInformationType(fallbackText));
}

function mapEventTypeKeyToInformationType(key: EventTypeKey): InformationType {
  if (key === "contract_announcement") return "Contracts";
  if (key === "financial_announcement") return "Financial Results";
  if (key === "m&a") return "M&A";
  if (key === "new_offering") return "New Offerings";
  return "Partnerships";
}

function parseJsonResponse(content: string): unknown {
  return JSON.parse(content) as unknown;
}

async function callOpenAiJson(apiKey: string, model: string, systemPrompt: string, userPrompt: string): Promise<unknown> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      temperature: 0.1,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`OpenAI extraction failed (${res.status})`);
  }

  const payload = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned an empty extraction");
  return parseJsonResponse(content);
}

function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "true") return true;
    if (v === "false") return false;
  }
  return undefined;
}

function normalizeCurrency(value: string | undefined): string {
  if (!value) return "USD";
  const clean = value.trim().toUpperCase();
  if (clean === "$" || clean === "US$") return "USD";
  return clean;
}

function parseNumericLoose(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const n = Number(value.replaceAll(",", "").replace(/[^0-9.\-]/g, ""));
    if (!Number.isNaN(n) && Number.isFinite(n)) return n;
  }
  return null;
}

async function classifySourceQuality(apiKey: string, model: string, eventRecord: Record<string, unknown>, contextText: string): Promise<{
  source_tier?: string;
  source_type?: string;
  rationale?: string;
}> {
  const prompt = `You are classifying the evidentiary quality of a source used in an IT services and BPO event database.

Classify source_tier as:
- tier_1_primary
- tier_2_secondary
- tier_3_derived

Also classify source_type more specifically, such as:
- company_press_release
- investor_relations_release
- annual_report
- quarterly_results
- earnings_presentation
- earnings_transcript
- sec_filing
- regulator_filing
- official_solution_page
- official_partner_page
- procurement_notice
- news_article
- trade_publication
- analyst_summary
- company_blog
- linkedin_post
- archived_webpage

Return JSON with:
- source_tier
- source_type
- rationale`;

  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      prompt,
      `Classify source quality for this event JSON:\n${JSON.stringify(eventRecord)}\n\nContext:\n${contextText}\n\nOutput JSON only.`,
    );
    const obj = asObject(json) ?? {};
    return {
      source_tier: readStringFromObject(obj, ["source_tier"]),
      source_type: readStringFromObject(obj, ["source_type"]),
      rationale: readStringFromObject(obj, ["rationale"]),
    };
  } catch {
    return {};
  }
}

async function scoreMateriality(
  apiKey: string,
  model: string,
  eventRecord: Record<string, unknown>,
  contextText: string,
): Promise<{ materiality_score?: number; rationale?: string }> {
  const prompt = `You are scoring the materiality of an event involving an IT services or BPO provider.

Score from 1 to 5 where:
1 = minor / low strategic significance
2 = modest significance
3 = meaningful but not major
4 = major strategic significance
5 = highly material / market-moving / financially significant

Consider:
- transaction value or contract value
- named strategic client or partner
- service line significance
- impact on revenue/growth/guidance
- geographic expansion significance
- capability significance
- AI/cloud/data strategic relevance
- whether the event affects corporate narrative, competitiveness, or market positioning

Do not over-score generic press releases.

Return JSON with:
- materiality_score
- rationale`;

  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      prompt,
      `Score materiality for this event JSON:\n${JSON.stringify(eventRecord)}\n\nContext:\n${contextText}\n\nOutput JSON only.`,
    );
    const obj = asObject(json) ?? {};
    const materiality = parseNumericLoose(obj.materiality_score);
    return {
      materiality_score: materiality === null ? undefined : Math.max(1, Math.min(5, Math.round(materiality))),
      rationale: readStringFromObject(obj, ["rationale"]),
    };
  } catch {
    return {};
  }
}

async function scoreConfidence(
  apiKey: string,
  model: string,
  eventRecord: Record<string, unknown>,
  contextText: string,
): Promise<{ confidence_score?: number; rationale?: string }> {
  const prompt = `You are scoring confidence in the accuracy and completeness of an extracted event record.

Score from 1 to 100%:
with 1% been weak 100% certainty

Consider:
- whether the source is primary or secondary
- whether key entities are clearly identified
- whether dates are explicit
- whether the event type is unambiguous
- whether value, counterparties, and scope are clearly stated
- whether multiple corroborating sources exist

Return JSON with:
- confidence_score
- rationale`;

  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      prompt,
      `Score confidence for this event JSON:\n${JSON.stringify(eventRecord)}\n\nContext:\n${contextText}\n\nOutput JSON only.`,
    );
    const obj = asObject(json) ?? {};
    const score = parseNumericLoose(obj.confidence_score);
    return {
      confidence_score: score === null ? undefined : Math.max(1, Math.min(100, Math.round(score))),
      rationale: readStringFromObject(obj, ["rationale"]),
    };
  } catch {
    return {};
  }
}

async function evaluateFalsePositive(
  apiKey: string,
  model: string,
  eventRecord: Record<string, unknown>,
  contextText: string,
): Promise<{ relevant?: boolean; reason?: string }> {
  const prompt = `Before finalising an event record, test whether the content is actually a false positive.

Common false positives:
- thought leadership content
- generic capability marketing
- executive commentary without a concrete event
- partnership ecosystem listings without an actual announcement
- vague “working with clients” claims
- strategy statements
- case studies that do not evidence a contract announcement
- financial commentary not tied to a formal reporting event

If the content is better classified as a false positive, return:
{
  "relevant": false,
  "reason": "..."
}`;

  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      prompt,
      `Evaluate this extracted event JSON for false positives:\n${JSON.stringify(eventRecord)}\n\nContext:\n${contextText}\n\nOutput JSON only.`,
    );
    const obj = asObject(json) ?? {};
    return {
      relevant: asBoolean(obj.relevant),
      reason: readStringFromObject(obj, ["reason"]),
    };
  } catch {
    return {};
  }
}

async function generateAnalystSummary(
  apiKey: string,
  model: string,
  eventRecord: Record<string, unknown>,
): Promise<string | undefined> {
  const prompt = `Convert the structured event record into a concise analyst-style summary.

Requirements:
- 2 to 4 sentences
- factual, not promotional
- mention the event type, provider, counterparties if any, timing, and strategic significance
- mention uncertainty if material facts are missing
- do not use marketing language from the source

Return JSON:
{
  "analyst_summary": ""
}`;

  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      prompt,
      `Generate analyst summary for this event JSON:\n${JSON.stringify(eventRecord)}\n\nOutput JSON only.`,
    );
    const obj = asObject(json) ?? {};
    return readStringFromObject(obj, ["analyst_summary"]);
  } catch {
    return undefined;
  }
}

function normalizeCompanyIdentity(raw: unknown, extractedName: string): CompanyIdentityResolution {
  const obj = asObject(raw) ?? {};
  const canonical = readStringFromObject(obj, ["canonical_name"]) ?? extractedName;
  const aliases = readStringArrayFromObject(obj, ["historical_aliases"]);
  const parent = readStringFromObject(obj, ["parent_company"]) ?? null;
  const uncertainty = asBoolean(obj.uncertainty_flag) ?? false;
  const entityType = readStringFromObject(obj, ["entity_type"]) ?? "current brand";
  const notes = readStringFromObject(obj, ["notes"]);
  return {
    extracted_name: extractedName,
    canonical_name: canonical,
    entity_type: entityType,
    parent_company: parent,
    historical_aliases: aliases,
    uncertainty_flag: uncertainty,
    notes,
  };
}

function extractedEntityCandidates(eventRecord: Record<string, unknown>, eventType: EventTypeKey): string[] {
  const keysByType: Record<EventTypeKey, string[]> = {
    contract_announcement: ["provider", "client"],
    financial_announcement: ["provider"],
    "m&a": ["acquirer", "target", "seller"],
    new_offering: ["provider"],
    partnership: ["provider", "partner"],
  };

  const candidates: string[] = [];
  for (const key of keysByType[eventType]) {
    const value = eventRecord[key];
    if (typeof value === "string" && value.trim()) candidates.push(value.trim());
  }
  return [...new Set(candidates)];
}

function applyIdentityToEventRecord(eventRecord: Record<string, unknown>, identityByExtracted: Record<string, CompanyIdentityResolution>): Record<string, unknown> {
  const next = { ...eventRecord };
  const keys = ["provider", "client", "partner", "acquirer", "target", "seller"];
  for (const key of keys) {
    const value = next[key];
    if (typeof value !== "string" || !value.trim()) continue;
    const identity = identityByExtracted[value.trim()];
    if (!identity) continue;
    next[key] = identity.canonical_name ?? value;
  }
  return next;
}

type PipelineRecord = {
  eventType: EventTypeKey;
  eventRecord: Record<string, unknown>;
};

function isSchemaStyleRecord(eventRecord: Record<string, unknown>): boolean {
  return Boolean(
    asObject(eventRecord.provider) ||
      asObject(eventRecord.counterparties) ||
      asObject(eventRecord.dates) ||
      asObject(eventRecord.source) ||
      asObject(eventRecord.classification) ||
      asObject(eventRecord.value_fields) ||
      Array.isArray(eventRecord.events),
  );
}

function appendUncertaintyNote(eventRecord: Record<string, unknown>, note: string): void {
  const existing = Array.isArray(eventRecord.uncertainty_notes)
    ? (eventRecord.uncertainty_notes as unknown[]).filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];
  if (!existing.includes(note)) existing.push(note);
  eventRecord.uncertainty_notes = existing;
}

function scoreFromRecord(eventRecord: Record<string, unknown>, key: "materiality_score" | "confidence_score"): number {
  const direct = parseNumericLoose(eventRecord[key]);
  if (direct !== null) return direct;
  const nested = asObject(eventRecord.scoring);
  if (nested) {
    const nestedScore = parseNumericLoose(nested[key]);
    if (nestedScore !== null) return nestedScore;
  }
  return 0;
}

function toPipelineRecord(eventType: EventTypeKey, eventRecord: Record<string, unknown>): PipelineRecord {
  const recordType = mapAnyEventTypeToEventTypeKey(readStringFromObject(eventRecord, ["event_type"]) ?? eventType, JSON.stringify(eventRecord));
  return { eventType: recordType, eventRecord };
}

function choosePrimaryPipelineRecord(left: PipelineRecord, right: PipelineRecord, preferredPrimaryRecord: number | null): PipelineRecord {
  if (preferredPrimaryRecord === 1) return right;
  if (preferredPrimaryRecord === 0) return left;
  const leftMateriality = scoreFromRecord(left.eventRecord, "materiality_score");
  const rightMateriality = scoreFromRecord(right.eventRecord, "materiality_score");
  if (leftMateriality !== rightMateriality) return leftMateriality > rightMateriality ? left : right;
  const leftConfidence = scoreFromRecord(left.eventRecord, "confidence_score");
  const rightConfidence = scoreFromRecord(right.eventRecord, "confidence_score");
  if (leftConfidence !== rightConfidence) return leftConfidence >= rightConfidence ? left : right;
  return left;
}

function mergeMissingFields(primary: PipelineRecord, secondary: PipelineRecord, mergeableFields: string[]): PipelineRecord {
  const merged = { ...primary.eventRecord };
  for (const field of mergeableFields) {
    if (!field || field.includes(".")) continue;
    const current = merged[field];
    if (current !== undefined && current !== null && `${current}`.trim() !== "") continue;
    const fallback = secondary.eventRecord[field];
    if (fallback === undefined || fallback === null || `${fallback}`.trim() === "") continue;
    merged[field] = fallback;
  }
  return toPipelineRecord(primary.eventType, merged);
}

function seedRecordFromCandidate(candidate: ExtractedEvent, fallbackType: EventTypeKey): Record<string, unknown> {
  const metadata = asObject(candidate.structured_metadata) ?? {};
  const keyEvidence = Array.isArray(candidate.key_evidence)
    ? candidate.key_evidence.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];
  const uncertaintyNotes = Array.isArray(candidate.uncertainty_notes)
    ? candidate.uncertainty_notes.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];

  return {
    event_type: candidate.event_type ?? fallbackType,
    event_subtype: candidate.event_subtype,
    provider: readStringFromObject(metadata, ["provider_canonical", "provider", "provider_extracted", "service_provider"]),
    client: readStringFromObject(metadata, ["client", "client_name", "buyer", "customer"]),
    partner: readStringFromObject(metadata, ["partner"]),
    target: readStringFromObject(metadata, ["target"]),
    seller: readStringFromObject(metadata, ["seller"]),
    announcement_date: candidate.announcement_date,
    effective_date: candidate.effective_date,
    source_type: candidate.source_type ?? candidate.source?.source_type,
    source_tier: candidate.source_tier ?? candidate.source?.source_tier,
    source_url: candidate.source_url ?? candidate.source?.url,
    evidence_status: candidate.evidence_status ?? candidate.source?.evidence_status,
    summary: candidate.structured_summary ?? candidate.summary,
    service_line: readStringFromObject(metadata, ["service_line"]),
    micro_service_line: readStringFromObject(metadata, ["micro_service_line"]),
    industry: readStringFromObject(metadata, ["industry"]),
    geography: readStringFromObject(metadata, ["geography"]),
    country: readStringFromObject(metadata, ["country"]),
    contract_term: metadata.contract_term ?? null,
    contract_value: metadata.contract_value ?? null,
    deal_value: metadata.deal_value ?? null,
    currency: metadata.currency ?? null,
    stake_percentage: metadata.stake_percentage ?? null,
    revenue: metadata.revenue ?? null,
    revenue_growth_reported: metadata.revenue_growth_reported ?? null,
    constant_currency_growth: metadata.constant_currency_growth ?? null,
    operating_margin: metadata.operating_margin ?? null,
    bookings: metadata.bookings ?? null,
    guidance: metadata.guidance ?? null,
    key_evidence: keyEvidence,
    uncertainty_notes: uncertaintyNotes,
    confidence_score: candidate.confidence_score ?? candidate.scoring?.confidence_score ?? null,
    materiality_score: candidate.materiality_score ?? candidate.scoring?.materiality_score ?? null,
  };
}

function eventRecordToDraft(eventType: EventTypeKey, eventRecord: Record<string, unknown>, fallbackText: string): ContractDraft {
  if (isSchemaStyleRecord(eventRecord)) {
    const schemaEvent = normalizeSchemaStyleEvent(eventRecord);
    schemaEvent.event_type = schemaEvent.event_type ?? eventType;
    if (schemaEvent.confidence_score === undefined) {
      schemaEvent.confidence_score = parseNumericLoose(eventRecord.confidence_score) ?? undefined;
    }
    if (schemaEvent.materiality_score === undefined) {
      schemaEvent.materiality_score = parseNumericLoose(eventRecord.materiality_score) ?? undefined;
    }
    if (!schemaEvent.structured_summary) {
      schemaEvent.structured_summary = readStringFromObject(eventRecord, ["summary"]);
    }
    return toDraftFromEvent(schemaEvent, fallbackText);
  }

  const fallback = extractContractFromText(fallbackText);
  const infoType = mapEventTypeKeyToInformationType(eventType);
  const isContract = infoType === "Contracts";

  const announcementDate = maybeDate(readStringFromObject(eventRecord, ["announcement_date"]), fallback.contractStartDate ?? parseDate(fallbackText));
  const effectiveDate = maybeDate(readStringFromObject(eventRecord, ["effective_date", "completion_date"]), announcementDate);
  const startDate = isContract ? effectiveDate : announcementDate;

  const termText = readStringFromObject(eventRecord, ["contract_term"]);
  const termMonths = isContract ? (termText ? parseMonths(termText) : fallback.contractLengthMonths ?? 24) : 0;

  const endDate = isContract
    ? maybeDate(readStringFromObject(eventRecord, ["contract_end_date"]), deriveEndDate(startDate, termMonths))
    : announcementDate;

  const currency = normalizeCurrency(readStringFromObject(eventRecord, ["currency", "revenue_currency"]));
  const valueRaw = parseNumericLoose(eventRecord.contract_value ?? eventRecord.deal_value ?? eventRecord.revenue);
  const tcvUsd = isContract ? Math.round(valueRaw ?? fallback.tcvUsd ?? 0) : 0;
  const tcvEstimated = isContract ? valueRaw === null || currency !== "USD" : false;

  const providerValue =
    readStringFromObject(eventRecord, ["provider", "acquirer"]) ??
    fallback.serviceProvider ??
    "Unknown Provider";
  const provider = detectProvider({ title: fallback.title, body: JSON.stringify(eventRecord), fallback: providerValue });
  const clientName =
    readStringFromObject(eventRecord, ["client", "partner", "target"]) ??
    fallback.clientName ??
    (isContract ? "Undisclosed Client" : "N/A");

  const summary = readStringFromObject(eventRecord, ["summary"]) ?? fallback.body;
  const keyEvidence = Array.isArray(eventRecord.key_evidence) ? (eventRecord.key_evidence as unknown[]).filter((v) => typeof v === "string") as string[] : [];
  const evidenceStatus = readStringFromObject(eventRecord, ["evidence_status"]) ?? "inferred";
  const sourceType = readStringFromObject(eventRecord, ["source_type"]) ?? "unknown";
  const sourceTier = readStringFromObject(eventRecord, ["source_tier"]) ?? "tier-3";
  const confidenceRaw = parseNumericLoose(eventRecord.confidence_score) ?? parseNumericLoose(eventRecord.confidence_score_pct) ?? fallback.aiConfidence ?? 0.66;
  const confidenceScaled = confidenceRaw > 1 ? confidenceRaw / 100 : confidenceRaw;
  const confidence = clampConfidence(confidenceScaled);
  const materiality = parseNumericLoose(eventRecord.materiality_score);

  const metadataLines = [
    `Evidence Status: ${evidenceStatus}`,
    `Source Type: ${sourceType}`,
    `Source Tier: ${sourceTier}`,
  ];
  if (materiality !== null) metadataLines.push(`Materiality Score: ${materiality}`);
  if (keyEvidence.length > 0) metadataLines.push(`Key Evidence: ${keyEvidence.join(" | ")}`);

  const sourceUrl = readStringFromObject(eventRecord, ["source_url"]);
  const serviceLine = readStringFromObject(eventRecord, ["service_line"]) ?? fallback.serviceLine;
  const microServiceLine = readStringFromObject(eventRecord, ["micro_service_line"]);
  const geography = readStringFromObject(eventRecord, ["geography"]) ?? fallback.geography;
  const country = readStringFromObject(eventRecord, ["country"]) ?? fallback.countrySigned;
  const platform = readStringFromObject(eventRecord, ["offering_name"]) ?? fallback.platform;
  const eventSubtype = readStringFromObject(eventRecord, ["event_subtype"]) ?? infoType;

  return normalizeAiDraft(
    {
      title: readStringFromObject(eventRecord, ["summary", "offering_name"]) ?? titleFromText(summary, provider),
      body: [summary, ...metadataLines].join("\n"),
      articleUrl: sourceUrl ?? fallback.articleUrl,
      informationType: infoType,
      serviceLine,
      industry: readStringFromObject(eventRecord, ["industry"]) ?? fallback.industry,
      serviceProvider: provider,
      geography,
      countrySigned: country,
      deliveryLocation: geography,
      clientName,
      contractStartDate: startDate,
      contractLengthMonths: termMonths,
      contractEndDate: endDate,
      contractEndEstimated: isContract ? !Boolean(readStringFromObject(eventRecord, ["effective_date", "contract_end_date"])) : false,
      tcvUsd,
      tcvEstimated,
      contractType: eventSubtype,
      platform,
      saasPlatform: /saas|cloud|ai|platform/i.test(`${platform} ${summary}`),
      source: `EventPipeline:${sourceType}:${sourceTier}:${evidenceStatus}`,
      aiConfidence: confidence,
      dealTypeDetail: microServiceLine ?? eventSubtype,
    },
    fallbackText,
  );
}

export function extractContractFromText(input: string): ContractDraft {
  const text = input.trim();
  const serviceProvider = detectProvider({ title: text, body: text });
  const informationType = pickInformationType(text);
  const isContract = informationType === "Contracts";
  const serviceLine = pickByRules(text, serviceLineRules, "General Services");
  const industry = pickByRules(text, industryRules, "Cross-Industry");
  const geography = geographyFromText(text);
  const contractStartDate = parseDate(text);
  const contractLengthMonths = isContract ? parseMonths(text) : 0;
  const contractEndDate = isContract ? deriveEndDate(contractStartDate, contractLengthMonths) : contractStartDate;
  const tcv = parseTcv(text);
  const platform = pickPlatform(text);

  const draft: ContractDraft = {
    title: titleFromText(text, serviceProvider),
    body: bodyFromText(text),
    informationType,
    serviceLine,
    industry,
    serviceProvider,
    geography: geography.geography,
    countrySigned: geography.country,
    deliveryLocation: geography.geography,
    clientName: clientFromText(text),
    contractStartDate,
    contractLengthMonths,
    contractEndDate,
    contractEndEstimated: isContract,
    tcvUsd: tcv.value,
    tcvEstimated: isContract ? tcv.estimated : false,
    contractType: informationType === "Contracts" ? "New Contract" : informationType,
    platform,
    saasPlatform: /saas|cloud|workday|salesforce|servicenow|snowflake|coupa|ariba/i.test(text),
    source: "AI prepopulation",
  };

  draft.aiConfidence = confidenceFromDraft(draft);
  return draft;
}

function clampDate(value: string | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function normalizeAiDraft(draft: Partial<ContractDraft>, fallbackText: string): ContractDraft {
  const fallback = extractContractFromText(fallbackText);
  const merged: ContractDraft = {
    ...fallback,
    ...draft,
  };

  merged.title = (merged.title ?? "").trim() || fallback.title;
  merged.body = (merged.body ?? "").trim() || fallback.body;
  merged.informationType = (merged.informationType as InformationType | undefined) ?? fallback.informationType;
  const isContract = merged.informationType === "Contracts";
  merged.contractStartDate = clampDate(merged.contractStartDate);
  merged.contractLengthMonths = Number(merged.contractLengthMonths ?? fallback.contractLengthMonths ?? (isContract ? 24 : 0));
  merged.contractEndDate = merged.contractEndDate ?? (merged.contractLengthMonths > 0 ? deriveEndDate(merged.contractStartDate, merged.contractLengthMonths) : merged.contractStartDate);
  merged.contractEndEstimated = isContract ? (merged.contractEndEstimated ?? true) : false;
  merged.tcvUsd = Number(merged.tcvUsd ?? fallback.tcvUsd ?? 0);
  merged.tcvEstimated = isContract ? (merged.tcvEstimated ?? true) : false;
  merged.aiConfidence = Math.min(0.99, Math.max(0.5, Number(merged.aiConfidence ?? 0.9)));
  merged.source = merged.source ?? "OpenAI extraction";

  return merged;
}

export async function extractContractWithOpenAi(input: string): Promise<ContractDraft> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const routingSystemPrompt = `You are an analyst-grade event intelligence extraction engine focused on IT services and BPO providers.

Your job is to identify, extract, classify, normalise, and quality-score historical corporate events from source documents and web pages.

You must work at EVENT level, not ARTICLE level. Multiple articles or documents may refer to the same underlying event. Your goal is to represent one real-world event with structured metadata and linked evidence.

You are extracting the following event types:
1. Contract announcement
2. Financial announcement
3. Merger or acquisition
4. New offering
5. Partnership

You must prioritise primary sources over secondary sources wherever possible.

Primary sources include:
- company press releases
- investor relations announcements
- annual reports
- quarterly / half-year / annual result statements
- earnings presentations
- earnings call transcripts
- SEC or equivalent regulatory filings
- official solution / offering launch pages
- official partner announcements
- official procurement award notices

Secondary sources may be used for enrichment or gap-filling, but must be labelled as such.

You must distinguish between:
- confirmed / officially announced events
- third-party reported events
- inferred events

You must never treat marketing commentary or vague corporate messaging as a concrete event unless there is clear evidence of an actual launch, partnership, contract, or transaction.

For every candidate event, output:
- event_type
- event_subtype
- confidence_score
- materiality_score
- evidence_status
- canonical company names
- aliases detected
- announcement_date
- effective_date if available
- source_type
- source_tier
- structured summary
- structured metadata relevant to the event type
- dedupe hints for grouping similar records

Use precise, conservative classification. If evidence is weak or ambiguous, say so explicitly.

Always separate:
- announcement date
- reporting period date
- transaction completion date
- contract start date
where applicable.

Return output in valid JSON only unless explicitly instructed otherwise.`;

  const routingTaskPrompt = `The supplied content may contain more than one event.

Read the full text and:
1. Identify every distinct event relevant to IT services/BPO providers.
2. Split them into separate event records.
3. Classify each event independently.
4. Avoid collapsing different events into one record just because they appear in the same source.

Before finalising an event record, test whether the content is actually a false positive.

Common false positives:
- thought leadership content
- generic capability marketing
- executive commentary without a concrete event
- partnership ecosystem listings without an actual announcement
- vague “working with clients” claims
- strategy statements
- case studies that do not evidence a contract announcement
- financial commentary not tied to a formal reporting event

If false positive, return:
{
  "relevant": false,
  "reason": "..."
}

Return output using this exact JSON schema:
{
  "relevant": true,
  "events": [
    {
      "event_type": "",
      "event_subtype": "",
      "provider": {
        "extracted_name": "",
        "canonical_name": ""
      },
      "counterparties": {
        "client": null,
        "partner": null,
        "target": null,
        "seller": null
      },
      "dates": {
        "announcement_date": null,
        "effective_date": null,
        "completion_date": null,
        "reporting_period_start": null,
        "reporting_period_end": null
      },
      "source": {
        "source_type": "",
        "source_tier": "",
        "evidence_status": "",
        "url": null,
        "title": null
      },
      "classification": {
        "macro_service_line": null,
        "micro_service_line": null,
        "industry": null,
        "geography": {
          "continent": null,
          "region": null,
          "country": null
        },
        "technology_tags": []
      },
      "value_fields": {
        "contract_value": null,
        "deal_value": null,
        "currency": null,
        "term_length": null,
        "stake_percentage": null,
        "revenue": null,
        "revenue_growth_reported": null,
        "constant_currency_growth": null,
        "operating_margin": null,
        "bookings": null,
        "guidance": null
      },
      "scoring": {
        "confidence_score": null,
        "materiality_score": null,
        "partnership_depth_score": null
      },
      "summary": "",
      "key_evidence": [],
      "uncertainty_notes": []
    }
  ]
}

Output JSON only.

TEXT:
${input}`;

  const routingJson = await callOpenAiJson(apiKey, model, routingSystemPrompt, routingTaskPrompt);
  const parsed = parseEventArray(routingJson);

  if (!parsed.relevant || parsed.events.length === 0) {
    const reason = parsed.reason ?? "No relevant event detected.";
    throw new Error(`NO_RELEVANT_EVENT: ${reason}`);
  }

  const extractorPrompts: Record<EventTypeKey, string> = {
    contract_announcement: `You are detecting contract announcements involving IT services or BPO providers.

Identify whether the text describes a real customer contract, outsourcing agreement, managed services agreement, renewal, expansion, or transformation deal.

Positive signals include phrases such as:
- awarded contract
- selected by
- chosen by
- signs agreement
- signs multi-year deal
- won contract
- secures contract
- expands existing engagement
- renews contract
- outsourcing agreement
- managed services agreement
- business process outsourcing deal
- transformation contract

You must distinguish between:
- new contract
- renewal
- expansion
- framework agreement
- public procurement award
- preferred supplier arrangement
- informal customer reference

A valid contract record should ideally include some combination of:
- provider
- client
- service scope
- contract/award language
- date
- duration or value if available

If client name is absent but evidence strongly indicates a contract, flag the client as unknown and reduce confidence.

Return JSON with:
- relevant
- event_type
- event_subtype
- provider
- client
- announcement_date
- effective_date
- contract_status
- contract_scope
- service_line
- micro_service_line
- industry
- geography
- country
- contract_term
- contract_value
- currency
- evidence_status
- source_type
- source_tier
- confidence_score
- materiality_score
- summary
- key_evidence`,
    financial_announcement: `You are detecting financial announcements for IT services and BPO providers.

Identify whether the text contains an official financial disclosure such as:
- quarterly results
- half-year / biannual / interim results
- annual / full-year results
- earnings release
- annual report
- investor results presentation
- earnings transcript commentary

Extract both the announcement metadata and the reporting period metadata.

Key fields to detect include:
- reporting period type: Q1, Q2, Q3, Q4, H1, H2, FY, annual, interim
- reporting period end date
- announcement date
- revenue
- revenue growth
- operating margin
- bookings if stated
- guidance
- regional performance
- segment performance
- commentary on demand, AI, cloud, BPO, consulting, headcount, pricing

Do not confuse generic investor commentary with an official financial announcement unless the period and results context is clear.

Return JSON with:
- relevant
- event_type: "financial_announcement"
- event_subtype
- provider
- reporting_period_type
- reporting_period_label
- reporting_period_start
- reporting_period_end
- announcement_date
- fiscal_year
- revenue
- revenue_currency
- revenue_growth_reported
- constant_currency_growth
- operating_margin
- bookings
- guidance
- ai_commentary_present
- region_breakdown
- segment_breakdown
- source_type
- source_tier
- evidence_status
- confidence_score
- materiality_score
- summary
- key_evidence`,
    "m&a": `You are detecting mergers, acquisitions, divestitures, carve-outs, and strategic investments involving IT services and BPO providers.

Identify whether the text describes any of the following:
- acquisition announced
- acquisition completed
- merger announced
- merger completed
- divestiture
- carve-out
- strategic investment
- stake purchase
- disposal of business unit

Important:
- Distinguish between announced and completed.
- Do not treat exploratory language or rumours as confirmed transactions unless the evidence clearly indicates a formal announcement or credible report.
- Capture both acquirer and target.
- If the seller is mentioned, capture seller separately.
- If deal value is missing, return null rather than guessing.

Return JSON with:
- relevant
- event_type: "m&a"
- event_subtype
- transaction_status
- acquirer
- target
- seller
- announcement_date
- completion_date
- deal_value
- currency
- stake_percentage
- strategic_rationale
- capability_area
- geography
- target_headquarters
- source_type
- source_tier
- evidence_status
- confidence_score
- materiality_score
- summary
- key_evidence`,
    new_offering: `You are detecting formal new offerings launched by IT services and BPO providers.

A valid new offering should generally involve a clearly identifiable service, solution, platform, managed service, accelerator, industry solution, AI offering, or packaged commercial capability.

Positive signals include:
- launches
- unveils
- introduces
- announces new offering
- debuts
- releases platform
- expands portfolio with
- new managed service
- new consulting offer
- new AI solution
- new industry solution

Do not classify the following as a valid new offering unless there is stronger evidence:
- general thought leadership
- strategy blogs
- capability statements without launch language
- vague “we help clients with X”
- broad announcements of ambition without a named or defined offer

Return JSON with:
- relevant
- event_type: "new_offering"
- event_subtype
- provider
- offering_name
- offering_category
- announcement_date
- target_industries
- target_functions
- service_line
- micro_service_line
- technology_tags
- ai_relevance
- geography
- launch_significance
- source_type
- source_tier
- evidence_status
- confidence_score
- materiality_score
- summary
- key_evidence`,
    partnership: `You are detecting formal partnerships involving IT services and BPO providers.

A valid partnership may include:
- strategic alliance
- joint go-to-market relationship
- implementation partnership
- co-innovation partnership
- co-development agreement
- preferred partner status
- expanded alliance
- reseller/channel partnership
- cloud/model/software alliance
- joint venture

Positive language includes:
- partners with
- enters strategic alliance
- expands partnership
- signs alliance agreement
- collaborates with
- launches jointly
- co-develops with
- preferred partner

Be careful:
- Do not classify every collaboration mention as a formal partnership.
- Distinguish between a lightweight ecosystem relationship and a deep strategic alliance.
- Score partnership depth.

Return JSON with:
- relevant
- event_type: "partnership"
- event_subtype
- provider
- partner
- announcement_date
- partnership_scope
- partnership_category
- joint_gtm
- co_development
- dedicated_investment
- certifications_or_marketplace_evidence
- target_industries
- service_line
- geography
- partnership_depth_score
- source_type
- source_tier
- evidence_status
- confidence_score
- materiality_score
- summary
- key_evidence`,
  };

  const identityPrompt = `You are resolving company identity for an IT services and BPO event database.

Given a company name extracted from a source, determine:
1. the canonical company name
2. whether the extracted name is:
   - current brand
   - legacy brand
   - acquired company
   - subsidiary
   - regional legal entity
   - business unit
3. likely aliases or former names relevant for historical search and matching

Rules:
- Preserve the exact extracted name.
- Also return a canonical normalised parent name where appropriate.
- If uncertain, return an uncertainty flag.
- Do not collapse genuinely separate firms into one entity.
- Be especially careful with rebrands, mergers, and business unit names.

Return JSON with:
- extracted_name
- canonical_name
- entity_type
- parent_company
- historical_aliases
- uncertainty_flag
- notes`;

  const normalizerPrompt = `You are normalising raw extracted event records for an IT services and BPO event database.

Your tasks:
1. Standardise event_type and event_subtype.
2. Normalise company names to canonical forms while preserving extracted names.
3. Standardise dates to ISO 8601.
4. Separate announcement date from effective/completion/reporting period dates.
5. Standardise currencies, values, and percentages.
6. Map service descriptions into:
   - macro service line
   - micro service line
7. Map geography into:
   - continent
   - region
   - country
8. Preserve uncertainty explicitly rather than fabricating precision.

Do not invent missing values.
If a value cannot be confidently inferred, return null and add an uncertainty note.

Return a single clean JSON event record ready for database insertion.`;

  const processedCandidates: PipelineRecord[] = [];
  for (const candidate of parsed.events) {
    const routedType = mapAnyEventTypeToEventTypeKey(candidate.event_type, input);
    const seededRecord = seedRecordFromCandidate(candidate, routedType);

    let typedEventRecord = seededRecord;
    try {
      const typedJson = await callOpenAiJson(
        apiKey,
        model,
        extractorPrompts[routedType],
        `Output JSON only.\nEVENT SEED JSON:\n${JSON.stringify(seededRecord)}\n\nFULL TEXT:\n${input}`,
      );
      const typedObj = asObject(typedJson) ?? {};
      const typedRelevant = asBoolean(typedObj.relevant);
      if (typedRelevant === false) continue;

      const typedEvidence = readStringArrayFromObject(typedObj, ["key_evidence"]);
      const typedNotes = readStringArrayFromObject(typedObj, ["uncertainty_notes"]);
      typedEventRecord = {
        ...seededRecord,
        ...typedObj,
        event_type: readStringFromObject(typedObj, ["event_type"]) ?? seededRecord.event_type,
        event_subtype: readStringFromObject(typedObj, ["event_subtype"]) ?? seededRecord.event_subtype,
        source_url: readStringFromObject(typedObj, ["source_url", "url"]) ?? seededRecord.source_url,
        summary: readStringFromObject(typedObj, ["summary"]) ?? seededRecord.summary,
        key_evidence: typedEvidence.length > 0 ? typedEvidence : seededRecord.key_evidence,
        uncertainty_notes: typedNotes.length > 0 ? typedNotes : seededRecord.uncertainty_notes,
      };
    } catch {
      typedEventRecord = seededRecord;
    }

    const identityByExtracted: Record<string, CompanyIdentityResolution> = {};
    for (const extractedName of extractedEntityCandidates(typedEventRecord, routedType)) {
      try {
        const identityJson = await callOpenAiJson(
          apiKey,
          model,
          identityPrompt,
          `Resolve company identity for:\n${extractedName}\n\nContext text:\n${input}\n\nOutput JSON only.`,
        );
        identityByExtracted[extractedName] = normalizeCompanyIdentity(identityJson, extractedName);
      } catch {
        identityByExtracted[extractedName] = normalizeCompanyIdentity({}, extractedName);
      }
    }

    const withIdentity = applyIdentityToEventRecord(typedEventRecord, identityByExtracted);

    let normalizedRecord = withIdentity;
    try {
      const normalizedJson = await callOpenAiJson(
        apiKey,
        model,
        normalizerPrompt,
        `Normalize this event JSON for database insertion.\n\nRaw event:\n${JSON.stringify(withIdentity)}\n\nIdentity resolution:\n${JSON.stringify(identityByExtracted)}\n\nOutput JSON only.`,
      );
      normalizedRecord = asObject(normalizedJson) ?? withIdentity;
    } catch {
      normalizedRecord = withIdentity;
    }

    if (Object.keys(normalizedRecord).length === 0) {
      normalizedRecord = withIdentity;
    }
    if (!readStringFromObject(normalizedRecord, ["event_type"])) {
      normalizedRecord.event_type = routedType;
    }
    if (!readStringFromObject(normalizedRecord, ["summary"])) {
      normalizedRecord.summary = readStringFromObject(withIdentity, ["summary"]) ?? candidate.structured_summary;
    }
    if (!readStringFromObject(normalizedRecord, ["source_url"])) {
      normalizedRecord.source_url =
        readStringFromObject(withIdentity, ["source_url"]) ??
        candidate.source_url ??
        readStringFromObject(asObject(candidate.structured_metadata) ?? {}, ["source_url", "article_url", "url"]);
    }

    const falsePositive = await evaluateFalsePositive(apiKey, model, normalizedRecord, input);
    if (falsePositive.relevant === false) {
      continue;
    }
    if (falsePositive.reason) {
      appendUncertaintyNote(normalizedRecord, `False-positive check note: ${falsePositive.reason}`);
    }

    const sourceQuality = await classifySourceQuality(apiKey, model, normalizedRecord, input);
    if (sourceQuality.source_tier) normalizedRecord.source_tier = sourceQuality.source_tier;
    if (sourceQuality.source_type) normalizedRecord.source_type = sourceQuality.source_type;
    if (sourceQuality.rationale) {
      appendUncertaintyNote(normalizedRecord, `Source quality rationale: ${sourceQuality.rationale}`);
    }

    const materialityScore = await scoreMateriality(apiKey, model, normalizedRecord, input);
    if (typeof materialityScore.materiality_score === "number") normalizedRecord.materiality_score = materialityScore.materiality_score;
    if (materialityScore.rationale) {
      appendUncertaintyNote(normalizedRecord, `Materiality rationale: ${materialityScore.rationale}`);
    }

    const confidenceScore = await scoreConfidence(apiKey, model, normalizedRecord, input);
    if (typeof confidenceScore.confidence_score === "number") normalizedRecord.confidence_score = confidenceScore.confidence_score;
    if (confidenceScore.rationale) {
      appendUncertaintyNote(normalizedRecord, `Confidence rationale: ${confidenceScore.rationale}`);
    }

    const analystSummary = await generateAnalystSummary(apiKey, model, normalizedRecord);
    if (analystSummary) normalizedRecord.summary = analystSummary;

    processedCandidates.push(toPipelineRecord(routedType, normalizedRecord));
  }

  if (processedCandidates.length === 0) {
    throw new Error("NO_RELEVANT_EVENT: No event records survived specialist extraction and validation.");
  }

  const dedupedCandidates: PipelineRecord[] = [];
  const suppressed = new Set<number>();
  for (let i = 0; i < processedCandidates.length; i += 1) {
    if (suppressed.has(i)) continue;
    let current = processedCandidates[i];
    let currentIndex = i;

    for (let j = i + 1; j < processedCandidates.length; j += 1) {
      if (suppressed.has(j)) continue;
      const candidate = processedCandidates[j];
      const dedupe = await compareEventRecordsForDuplication([current.eventRecord, candidate.eventRecord]);
      const likelyDuplicate = dedupe.same_event || dedupe.duplicate_likelihood_score >= 75;
      if (!likelyDuplicate) continue;

      const preferred = choosePrimaryPipelineRecord(current, candidate, dedupe.preferred_primary_record);
      const preferredIsCurrent = preferred === current;
      const secondary = preferredIsCurrent ? candidate : current;
      const secondaryIndex = preferredIsCurrent ? j : currentIndex;
      const primaryIndex = preferredIsCurrent ? currentIndex : j;
      current = mergeMissingFields(preferred, secondary, dedupe.mergeable_fields);
      appendUncertaintyNote(current.eventRecord, `Deduplication note: ${dedupe.rationale}`);
      suppressed.add(secondaryIndex);
      currentIndex = primaryIndex;
    }

    dedupedCandidates.push(current);
  }

  const selected = [...dedupedCandidates].sort((left, right) => {
    const rightMateriality = scoreFromRecord(right.eventRecord, "materiality_score");
    const leftMateriality = scoreFromRecord(left.eventRecord, "materiality_score");
    if (rightMateriality !== leftMateriality) return rightMateriality - leftMateriality;
    const rightConfidence = scoreFromRecord(right.eventRecord, "confidence_score");
    const leftConfidence = scoreFromRecord(left.eventRecord, "confidence_score");
    return rightConfidence - leftConfidence;
  })[0];

  if (!selected) {
    throw new Error("NO_RELEVANT_EVENT: No event records available after deduplication.");
  }

  return eventRecordToDraft(selected.eventType, selected.eventRecord, input);
}

export async function extractContractWithAiOrRules(input: string): Promise<ContractDraft> {
  try {
    return await extractContractWithOpenAi(input);
  } catch (error) {
    const message = (error as Error).message ?? "";
    if (message.startsWith("NO_RELEVANT_EVENT:")) throw error;
    return extractContractFromText(input);
  }
}

export async function compareEventRecordsForDuplication(records: unknown[]): Promise<{
  duplicate_likelihood_score: number;
  same_event: boolean;
  rationale: string;
  preferred_primary_record: number | null;
  mergeable_fields: string[];
  conflicting_fields: string[];
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  if (!apiKey) {
    return {
      duplicate_likelihood_score: 0,
      same_event: false,
      rationale: "OPENAI_API_KEY is not configured.",
      preferred_primary_record: null,
      mergeable_fields: [],
      conflicting_fields: [],
    };
  }

  const dedupePrompt = `You are comparing two or more event records to determine whether they refer to the same underlying real-world event.

Two records may be duplicates even if:
- titles differ
- one source is a press release and another is a news article
- dates differ slightly due to publication lag
- one source uses a subsidiary name and another uses the parent name
- wording differs across provider and partner/client announcements

Evaluate the likelihood that the records describe the same event using:
- company identity
- counterparty identity
- event type
- timing
- named offering/deal/transaction
- contract scope / transaction description / partnership scope
- geography
- amount/value
- reporting period

Return JSON with:
- duplicate_likelihood_score
- same_event: true/false
- rationale
- preferred_primary_record
- mergeable_fields
- conflicting_fields`;

  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      dedupePrompt,
      `Compare these event records:\n${JSON.stringify(records)}\n\nOutput JSON only.`,
    );
    const obj = asObject(json) ?? {};
    return {
      duplicate_likelihood_score: clampConfidence(parseNumericLoose(obj.duplicate_likelihood_score) ?? 0),
      same_event: asBoolean(obj.same_event) ?? false,
      rationale: readStringFromObject(obj, ["rationale"]) ?? "No rationale provided.",
      preferred_primary_record: parseNumericLoose(obj.preferred_primary_record) ?? null,
      mergeable_fields: readStringArrayFromObject(obj, ["mergeable_fields"]),
      conflicting_fields: readStringArrayFromObject(obj, ["conflicting_fields"]),
    };
  } catch {
    return {
      duplicate_likelihood_score: 0,
      same_event: false,
      rationale: "Dedupe comparison failed.",
      preferred_primary_record: null,
      mergeable_fields: [],
      conflicting_fields: [],
    };
  }
}

async function generateQueriesWithPrompt(
  apiKey: string,
  model: string,
  prompt: string,
  providerName: string,
  aliases: string[],
): Promise<Record<string, unknown>> {
  try {
    const json = await callOpenAiJson(
      apiKey,
      model,
      prompt,
      `Provider name: ${providerName}\nAliases: ${aliases.join(", ")}\nOutput JSON only.`,
    );
    return asObject(json) ?? {};
  } catch {
    return {};
  }
}

export async function generateHistoricalSearchQueries(providerName: string, aliases: string[] = []): Promise<Record<string, unknown>> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  if (!apiKey) {
    return {
      provider_name: providerName,
      aliases,
      error: "OPENAI_API_KEY is not configured.",
    };
  }

  const contractPrompt = `Generate historical search queries for contract announcements involving the following IT services/BPO provider.

Use the provider name and aliases to generate queries that capture:
- new contracts
- renewals
- expansions
- managed services agreements
- outsourcing deals
- BPO deals
- transformation deals
- public sector awards

Include phrases such as:
- awarded contract
- selected by
- signs agreement
- wins deal
- renews contract
- expands engagement
- managed services
- outsourcing agreement
- business process outsourcing

Return JSON with:
- provider_name
- start date
- Contract Length
- TCV estimate (and confidence level)
- Macro IT/BPO Service Line
- Micro Service Line
- broad_queries
- precise_queries
- client-led_queries
- public-procurement_queries
- archive_queries`;

  const financialPrompt = `Generate historical search queries for financial announcements by the following IT services/BPO provider.

Create queries for:
- quarterly results
- half-year / interim results
- annual results
- earnings release
- annual report
- earnings presentation
- earnings transcript

Include likely wording variants such as:
- quarterly results
- Q1 results
- Q2 results
- half year results
- interim results
- annual results
- full year results
- earnings release
- annual report

Return JSON with:
- provider_name
- broad_queries
- precise_queries
- investor_relations_queries
- filings_queries
- archive_queries`;

  const maPrompt = `Generate historical search queries for mergers, acquisitions, divestitures, and strategic investments involving the following IT services/BPO provider.

Include terms such as:
- acquires
- to acquire
- completes acquisition
- merger
- divestiture
- carve-out
- strategic investment
- stake purchase
- disposal

Return JSON with:
- provider_name
- broad_queries
- precise_queries
- investor_relations_queries
- filings_queries
- news_validation_queries
- archive_queries`;

  const offeringPrompt = `Generate historical search queries for new offerings launched by the following IT services/BPO provider.

Target:
- new services
- AI offerings
- managed services
- platforms
- accelerators
- industry solutions
- cloud/data/cyber offerings
- BPO solutions

Include terms such as:
- launches
- unveils
- introduces
- new offering
- new platform
- new service
- managed service
- AI solution
- industry solution

Return JSON with:
- provider_name
- broad_queries
- precise_queries
- solution_page_queries
- conference_or_event_queries
- archive_queries`;

  const partnershipPrompt = `Generate historical search queries for partnerships involving the following IT services/BPO provider.

Target:
- strategic alliances
- cloud/model/software partnerships
- co-innovation arrangements
- joint go-to-market alliances
- implementation partnerships
- reseller/channel partnerships

Include terms such as:
- partners with
- strategic alliance
- alliance
- expanded partnership
- joint go-to-market
- co-develop
- co-innovation
- preferred partner

Return JSON with:
- provider_name
- broad_queries
- precise_queries
- partner-led_queries
- official_partner_directory_queries
- archive_queries`;

  const [contracts, financial, ma, offerings, partnerships] = await Promise.all([
    generateQueriesWithPrompt(apiKey, model, contractPrompt, providerName, aliases),
    generateQueriesWithPrompt(apiKey, model, financialPrompt, providerName, aliases),
    generateQueriesWithPrompt(apiKey, model, maPrompt, providerName, aliases),
    generateQueriesWithPrompt(apiKey, model, offeringPrompt, providerName, aliases),
    generateQueriesWithPrompt(apiKey, model, partnershipPrompt, providerName, aliases),
  ]);

  return {
    provider_name: providerName,
    aliases,
    contracts,
    financial_announcements: financial,
    m_and_a: ma,
    new_offerings: offerings,
    partnerships,
  };
}
