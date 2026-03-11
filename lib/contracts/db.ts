import { extractContractFromText, extractContractWithAiOrRules } from "@/lib/contracts/ai";
import { createContractFile, createManyFile, getMetadataFile, listContractsFile } from "@/lib/contracts/store-file";
import { createContractSupabase, createManySupabase, getMetadataSupabase, listContractsSupabase } from "@/lib/contracts/store-supabase";
import { enrichDealIntelligence } from "@/lib/contracts/deal-intelligence";
import { normalizeDraft } from "@/lib/contracts/normalize";
import type { ContractDraft, ContractFilters, ContractRecord } from "@/lib/contracts/types";
import { buildDetailedWriteUp } from "@/lib/contracts/writeup";

type Provider = "file" | "supabase";

function provider(): Provider {
  return process.env.DATABASE_PROVIDER === "supabase" ? "supabase" : "file";
}

function isSupabase(): boolean {
  return provider() === "supabase";
}

export function getDatabaseProvider(): Provider {
  return provider();
}

export async function listContracts(filters: ContractFilters = {}): Promise<ContractRecord[]> {
  return isSupabase() ? listContractsSupabase(filters) : listContractsFile(filters);
}

export async function createContract(draft: ContractDraft): Promise<ContractRecord> {
  if (!draft.title?.trim() || !draft.body?.trim()) {
    throw new Error("Title and body are required");
  }

  const enrichedDraft = await enrichDraftWithDealIntelligence(draft);
  const corpus = await listContracts();
  const enriched: ContractDraft = {
    ...enrichedDraft,
    body: await buildDetailedWriteUp(enrichedDraft, corpus),
  };

  return isSupabase() ? createContractSupabase(enriched) : createContractFile(enriched);
}

export async function createContractFromText(text: string): Promise<ContractRecord> {
  const draft = extractContractFromText(text);
  return createContract(draft);
}

export async function createContractFromTextWithLlm(text: string): Promise<ContractRecord> {
  const draft = await extractContractWithAiOrRules(text);
  return createContract(draft);
}

export async function createManyContracts(drafts: ContractDraft[]): Promise<ContractRecord[]> {
  const corpus = await listContracts();
  const enrichedDrafts: ContractDraft[] = [];
  for (const draft of drafts) {
    const withDealSignals = await enrichDraftWithDealIntelligence(draft);
    enrichedDrafts.push({
      ...withDealSignals,
      body: await buildDetailedWriteUp(withDealSignals, corpus),
    });
  }

  return isSupabase() ? createManySupabase(enrichedDrafts) : createManyFile(enrichedDrafts);
}

export async function createManyFromText(snippets: string[]): Promise<ContractRecord[]> {
  const drafts = snippets.map((snippet) => extractContractFromText(snippet));
  return createManyContracts(drafts);
}

export async function getMetadata(): Promise<Record<string, string[]>> {
  return isSupabase() ? getMetadataSupabase() : getMetadataFile();
}

async function enrichDraftWithDealIntelligence(draft: ContractDraft): Promise<ContractDraft> {
  if ((draft.informationType ?? "Contracts") !== "Contracts") return draft;

  try {
    const normalized = normalizeDraft(draft);
    const signals = await enrichDealIntelligence(normalized);
    return {
      ...draft,
      ...signals,
      incumbentProvider: signals.incumbentProvider,
    };
  } catch {
    return draft;
  }
}
