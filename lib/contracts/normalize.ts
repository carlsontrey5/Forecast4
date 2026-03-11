import type { ContractDraft, ContractRecord } from "@/lib/contracts/types";

export function makeId(): string {
  return `ctr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function deriveEndDate(startDate: string, months: number): string {
  const d = new Date(startDate);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0.4;
  return Math.max(0, Math.min(1, value));
}

export function normalizeDraft(draft: ContractDraft): ContractRecord {
  const now = new Date().toISOString();
  const startDate = draft.contractStartDate ?? now.slice(0, 10);
  const informationType = draft.informationType ?? "Contracts";
  const isContract = informationType === "Contracts";
  const months = Number(draft.contractLengthMonths ?? (isContract ? 24 : 0));
  const resolvedEndDate = draft.contractEndDate ?? (months > 0 ? deriveEndDate(startDate, months) : startDate);

  return {
    id: makeId(),
    title: draft.title,
    body: draft.body,
    articleUrl: draft.articleUrl,
    informationType,
    serviceLine: draft.serviceLine ?? "General Services",
    industry: draft.industry ?? "Cross-Industry",
    serviceProvider: draft.serviceProvider ?? "Unknown Provider",
    geography: draft.geography ?? "Global",
    countrySigned: draft.countrySigned ?? "Not Specified",
    deliveryLocation: draft.deliveryLocation ?? "Not Specified",
    clientName: draft.clientName ?? "Undisclosed Client",
    contractStartDate: startDate,
    contractLengthMonths: months,
    contractEndDate: resolvedEndDate,
    contractEndEstimated: isContract ? draft.contractEndEstimated ?? true : false,
    tcvUsd: Number(draft.tcvUsd ?? 0),
    tcvEstimated: isContract ? draft.tcvEstimated ?? true : false,
    contractType: draft.contractType ?? (isContract ? "New Contract" : informationType),
    platform: draft.platform ?? "Not Specified",
    saasPlatform: draft.saasPlatform ?? false,
    incumbentProvider: draft.incumbentProvider ?? draft.serviceProvider ?? "Unknown Provider",
    renewalStatus: draft.renewalStatus ?? "No Renewal Insight",
    renewalConfidence: clamp01(Number(draft.renewalConfidence ?? 0.4)),
    renewalRationale: draft.renewalRationale ?? "No externally corroborated renewal or loss signal identified yet.",
    dealTypeDetail:
      draft.dealTypeDetail ??
      `${draft.contractType ?? (isContract ? "New Contract" : informationType)}${draft.serviceLine ? ` | ${draft.serviceLine}` : ""}${draft.platform ? ` | ${draft.platform}` : ""}`,
    mediaCoverageSentiment: draft.mediaCoverageSentiment ?? "Neutral",
    mediaCoverageSummary: draft.mediaCoverageSummary ?? "No additional media coverage identified yet.",
    mediaCoverage: draft.mediaCoverage ?? [],
    source: draft.source ?? "Manual entry",
    aiConfidence: Number(draft.aiConfidence ?? 0.5),
    createdAt: now,
    updatedAt: now,
  };
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}
