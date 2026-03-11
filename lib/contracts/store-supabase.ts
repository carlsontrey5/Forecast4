import { seedContracts } from "@/lib/contracts/seed";
import { normalizeDraft, uniqueSorted } from "@/lib/contracts/normalize";
import type { ContractDraft, ContractFilters, ContractRecord, InformationType } from "@/lib/contracts/types";

type DbRow = {
  id: string;
  title: string;
  body: string;
  article_url: string | null;
  information_type: InformationType;
  service_line: string;
  industry: string;
  service_provider: string;
  geography: string;
  country_signed: string;
  delivery_location: string;
  client_name: string;
  contract_start_date: string;
  contract_length_months: number;
  contract_end_date: string;
  contract_end_estimated: boolean;
  tcv_usd: number;
  tcv_estimated: boolean;
  contract_type: string;
  platform: string;
  saas_platform: boolean;
  incumbent_provider?: string | null;
  renewal_status?: "Renewal" | "Loss" | "No Renewal Insight" | null;
  renewal_confidence?: number | null;
  renewal_rationale?: string | null;
  deal_type_detail?: string | null;
  media_coverage_sentiment?: "Positive" | "Neutral" | "Negative" | null;
  media_coverage_summary?: string | null;
  media_coverage?: unknown;
  source: string;
  ai_confidence: number;
  created_at: string;
  updated_at: string;
};

function env(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for Supabase mode");
  return { url, key };
}

function toRecord(row: DbRow): ContractRecord {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    articleUrl: row.article_url ?? undefined,
    informationType: row.information_type,
    serviceLine: row.service_line,
    industry: row.industry,
    serviceProvider: row.service_provider,
    geography: row.geography,
    countrySigned: row.country_signed,
    deliveryLocation: row.delivery_location,
    clientName: row.client_name,
    contractStartDate: row.contract_start_date,
    contractLengthMonths: row.contract_length_months,
    contractEndDate: row.contract_end_date,
    contractEndEstimated: row.contract_end_estimated,
    tcvUsd: row.tcv_usd,
    tcvEstimated: row.tcv_estimated,
    contractType: row.contract_type,
    platform: row.platform,
    saasPlatform: row.saas_platform,
    incumbentProvider: row.incumbent_provider ?? row.service_provider,
    renewalStatus: row.renewal_status ?? "No Renewal Insight",
    renewalConfidence: row.renewal_confidence ?? 0.4,
    renewalRationale: row.renewal_rationale ?? "No externally corroborated renewal or loss signal identified yet.",
    dealTypeDetail: row.deal_type_detail ?? `${row.contract_type} | ${row.service_line} | ${row.platform}`,
    mediaCoverageSentiment: row.media_coverage_sentiment ?? "Neutral",
    mediaCoverageSummary: row.media_coverage_summary ?? "No additional media coverage identified yet.",
    mediaCoverage: Array.isArray(row.media_coverage) ? (row.media_coverage as ContractRecord["mediaCoverage"]) : [],
    source: row.source,
    aiConfidence: row.ai_confidence,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(record: ContractRecord): DbRow {
  return {
    id: record.id,
    title: record.title,
    body: record.body,
    article_url: record.articleUrl ?? null,
    information_type: record.informationType,
    service_line: record.serviceLine,
    industry: record.industry,
    service_provider: record.serviceProvider,
    geography: record.geography,
    country_signed: record.countrySigned,
    delivery_location: record.deliveryLocation,
    client_name: record.clientName,
    contract_start_date: record.contractStartDate,
    contract_length_months: record.contractLengthMonths,
    contract_end_date: record.contractEndDate,
    contract_end_estimated: record.contractEndEstimated,
    tcv_usd: record.tcvUsd,
    tcv_estimated: record.tcvEstimated,
    contract_type: record.contractType,
    platform: record.platform,
    saas_platform: record.saasPlatform,
    source: record.source,
    ai_confidence: record.aiConfidence,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
  };
}

async function sbFetch(path: string, init?: RequestInit): Promise<Response> {
  const e = env();
  return fetch(`${e.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: e.key,
      Authorization: `Bearer ${e.key}`,
      Prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

function filterParams(filters: ContractFilters): URLSearchParams {
  const p = new URLSearchParams();
  p.set("select", "*");
  p.set("order", "contract_start_date.desc");

  if (filters.serviceLine && filters.serviceLine !== "Any") p.set("service_line", `eq.${filters.serviceLine}`);
  if (filters.industry && filters.industry !== "Any") p.set("industry", `eq.${filters.industry}`);
  if (filters.serviceProvider && filters.serviceProvider !== "Any") p.set("service_provider", `eq.${filters.serviceProvider}`);
  if (filters.geography && filters.geography !== "Any") p.set("geography", `eq.${filters.geography}`);
  if (filters.startDateFrom) p.append("contract_start_date", `gte.${filters.startDateFrom}`);
  if (filters.startDateTo) p.append("contract_start_date", `lte.${filters.startDateTo}`);
  if (filters.informationTypes?.length) p.set("information_type", `in.(${filters.informationTypes.join(",")})`);

  if (filters.freeText?.trim()) {
    const t = filters.freeText.replaceAll(",", " ").trim();
    p.set("or", `(title.ilike.*${t}*,body.ilike.*${t}*,client_name.ilike.*${t}*,platform.ilike.*${t}*,service_provider.ilike.*${t}*)`);
  }

  return p;
}

async function ensureSeeded(): Promise<void> {
  const existingRes = await sbFetch("contracts?select=id&limit=1");
  if (!existingRes.ok) throw new Error("Supabase contracts table not reachable. Apply db/schema.sql first.");

  const existing = (await existingRes.json()) as Array<{ id: string }>;
  if (existing.length > 0) return;

  const rows = seedContracts.map((d) => toRow(normalizeDraft(d)));
  const res = await sbFetch("contracts", {
    method: "POST",
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error("Failed to seed Supabase contracts table");
}

export async function listContractsSupabase(filters: ContractFilters = {}): Promise<ContractRecord[]> {
  await ensureSeeded();
  const q = filterParams(filters).toString();
  const res = await sbFetch(`contracts?${q}`);
  if (!res.ok) throw new Error("Failed to load contracts from Supabase");
  const rows = (await res.json()) as DbRow[];
  let contracts = rows.map(toRecord);

  if (filters.renewalStatus && filters.renewalStatus !== "Any") {
    contracts = contracts.filter((c) => (c.renewalStatus ?? "No Renewal Insight") === filters.renewalStatus);
  }

  return contracts;
}

export async function createContractSupabase(draft: ContractDraft): Promise<ContractRecord> {
  await ensureSeeded();
  const row = toRow(normalizeDraft(draft));
  const res = await sbFetch("contracts", { method: "POST", body: JSON.stringify([row]) });
  if (!res.ok) throw new Error("Failed to create contract in Supabase");
  const rows = (await res.json()) as DbRow[];
  return toRecord(rows[0]);
}

export async function createManySupabase(drafts: ContractDraft[]): Promise<ContractRecord[]> {
  await ensureSeeded();
  const current = await listContractsSupabase();
  const existing = new Set(current.map((c) => `${c.title.toLowerCase()}|${c.contractStartDate}`));
  const rows = drafts
    .filter((d) => !existing.has(`${d.title.toLowerCase()}|${d.contractStartDate}`))
    .map((d) => toRow(normalizeDraft(d)));

  if (rows.length === 0) return [];

  const res = await sbFetch("contracts", { method: "POST", body: JSON.stringify(rows) });
  if (!res.ok) throw new Error("Failed bulk insert into Supabase");
  const created = (await res.json()) as DbRow[];
  return created.map(toRecord);
}

export async function getMetadataSupabase(): Promise<Record<string, string[]>> {
  const contracts = await listContractsSupabase();
  return {
    serviceLines: uniqueSorted(contracts.map((c) => c.serviceLine)),
    industries: uniqueSorted(contracts.map((c) => c.industry)),
    serviceProviders: uniqueSorted(contracts.map((c) => c.serviceProvider)),
    geographies: uniqueSorted(contracts.map((c) => c.geography)),
    informationTypes: uniqueSorted(contracts.map((c) => c.informationType)),
    renewalStatuses: uniqueSorted(contracts.map((c) => c.renewalStatus ?? "No Renewal Insight")),
  };
}
