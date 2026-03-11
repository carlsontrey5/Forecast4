import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { buildDeterministicWriteUp } from "@/lib/contracts/writeup";
import { detectProvider, titleWithProvider } from "@/lib/contracts/providers";
import type { ContractRecord, InformationType } from "@/lib/contracts/types";

const dbPath = path.join(process.cwd(), "data", "contracts.json");

function toDraft(record: ContractRecord) {
  return {
    title: record.title,
    body: record.body,
    articleUrl: record.articleUrl,
    informationType: record.informationType,
    serviceLine: record.serviceLine,
    industry: record.industry,
    serviceProvider: record.serviceProvider,
    geography: record.geography,
    countrySigned: record.countrySigned,
    deliveryLocation: record.deliveryLocation,
    clientName: record.clientName,
    contractStartDate: record.contractStartDate,
    contractLengthMonths: record.contractLengthMonths,
    contractEndDate: record.contractEndDate,
    contractEndEstimated: record.contractEndEstimated,
    tcvUsd: record.tcvUsd,
    tcvEstimated: record.tcvEstimated,
    contractType: record.contractType,
    platform: record.platform,
    saasPlatform: record.saasPlatform,
    incumbentProvider: record.incumbentProvider,
    renewalStatus: record.renewalStatus,
    renewalConfidence: record.renewalConfidence,
    renewalRationale: record.renewalRationale,
    dealTypeDetail: record.dealTypeDetail,
    mediaCoverageSentiment: record.mediaCoverageSentiment,
    mediaCoverageSummary: record.mediaCoverageSummary,
    mediaCoverage: record.mediaCoverage,
    source: record.source,
    aiConfidence: record.aiConfidence,
  };
}

function normalizeNonContractFields(record: ContractRecord): ContractRecord {
  if (record.informationType === "Contracts") return record;

  return {
    ...record,
    contractLengthMonths: 0,
    contractEndDate: record.contractStartDate,
    contractEndEstimated: false,
    tcvEstimated: false,
  };
}

function normalizeDealFields(record: ContractRecord): ContractRecord {
  if (record.informationType !== "Contracts") return record;

  return {
    ...record,
    incumbentProvider: record.incumbentProvider ?? record.serviceProvider,
    renewalStatus: record.renewalStatus ?? "No Renewal Insight",
    renewalConfidence: typeof record.renewalConfidence === "number" ? Math.max(0, Math.min(1, record.renewalConfidence)) : 0.34,
    renewalRationale: record.renewalRationale ?? "No externally corroborated renewal or loss signal identified yet.",
    dealTypeDetail:
      record.dealTypeDetail ??
      `${record.contractType}; Service line: ${record.serviceLine}; Industry: ${record.industry}; Geography: ${record.geography}; Length: ${record.contractLengthMonths} months; Start: ${record.contractStartDate}; Estimated end: ${record.contractEndDate}.`,
    mediaCoverageSentiment: record.mediaCoverageSentiment ?? "Neutral",
    mediaCoverageSummary: record.mediaCoverageSummary ?? "No additional media coverage identified yet.",
    mediaCoverage: record.mediaCoverage ?? [],
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    requireAdmin(req);

    const payload = (await req.json().catch(() => ({}))) as { regenerateAll?: boolean };
    const regenerateAll = payload.regenerateAll === true;

    const raw = await fs.readFile(dbPath, "utf-8");
    const parsed = JSON.parse(raw) as { contracts: ContractRecord[] };
    const contracts = parsed.contracts;

    let providerFixes = 0;
    let titleFixes = 0;
    let writeupFixes = 0;

    const nextContracts: ContractRecord[] = [];

    for (const record of contracts) {
      let next = { ...record };

      const detectedProvider = detectProvider({
        title: next.title,
        body: next.body,
        source: next.source,
        articleUrl: next.articleUrl,
        fallback: next.serviceProvider,
      });

      if (detectedProvider && detectedProvider !== next.serviceProvider) {
        next.serviceProvider = detectedProvider;
        providerFixes += 1;
      }

      const normalizedTitle = titleWithProvider(next.serviceProvider, next.title);
      if (normalizedTitle !== next.title) {
        next.title = normalizedTitle;
        titleFixes += 1;
      }

      next = normalizeNonContractFields(next);
      next = normalizeDealFields(next);

      const needsFinancialStructure =
        next.informationType === ("Financial Results" as InformationType) &&
        (!next.body.includes("Article Type:") || !next.body.includes("Financial Results: Key Figures") || !next.body.includes("Operations by Region"));
      const needsContractDealCleanup = next.informationType === ("Contracts" as InformationType) && next.body.includes("Deal Finder Intelligence");

      if (regenerateAll || needsFinancialStructure || needsContractDealCleanup) {
        const draft = toDraft(next);
        next.body = buildDeterministicWriteUp(draft, contracts);
        writeupFixes += 1;
      }

      nextContracts.push(next);
    }

    await fs.writeFile(dbPath, JSON.stringify({ contracts: nextContracts }, null, 2), "utf-8");

    return NextResponse.json({
      ok: true,
      total: nextContracts.length,
      providerFixes,
      titleFixes,
      writeupFixes,
      message: "Reindex complete: provider coding and financial write-up structure updated.",
    });
  } catch (error) {
    const message = (error as Error).message;
    const status = message === "Admin role required" || message === "Unauthorized" ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
