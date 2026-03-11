import { promises as fs } from "node:fs";
import path from "node:path";
import { seedContracts } from "@/lib/contracts/seed";
import { normalizeDraft, uniqueSorted } from "@/lib/contracts/normalize";
import type { ContractDb, ContractDraft, ContractFilters, ContractRecord } from "@/lib/contracts/types";

const dbPath = path.join(process.cwd(), "data", "contracts.json");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDb(): Promise<void> {
  const exists = await fileExists(dbPath);
  if (exists) return;

  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  const seeded: ContractRecord[] = seedContracts.map((draft) => normalizeDraft(draft));
  const payload: ContractDb = { contracts: seeded };
  await fs.writeFile(dbPath, JSON.stringify(payload, null, 2), "utf-8");
}

async function readDb(): Promise<ContractDb> {
  await ensureDb();
  const raw = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(raw) as ContractDb;
}

async function writeDb(db: ContractDb): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

export async function listContractsFile(filters: ContractFilters = {}): Promise<ContractRecord[]> {
  const db = await readDb();

  return db.contracts
    .filter((contract) => {
      if (filters.serviceLine && filters.serviceLine !== "Any" && contract.serviceLine !== filters.serviceLine) return false;
      if (filters.industry && filters.industry !== "Any" && contract.industry !== filters.industry) return false;
      if (filters.serviceProvider && filters.serviceProvider !== "Any" && contract.serviceProvider !== filters.serviceProvider) return false;
      if (filters.geography && filters.geography !== "Any" && contract.geography !== filters.geography) return false;
      if (filters.informationTypes && filters.informationTypes.length > 0 && !filters.informationTypes.includes(contract.informationType)) return false;
      if (filters.renewalStatus && filters.renewalStatus !== "Any") {
        const status = contract.renewalStatus ?? "No Renewal Insight";
        if (status !== filters.renewalStatus) return false;
      }
      if (filters.startDateFrom && contract.contractStartDate < filters.startDateFrom) return false;
      if (filters.startDateTo && contract.contractStartDate > filters.startDateTo) return false;

      if (filters.freeText?.trim()) {
        const haystack = `${contract.title} ${contract.body} ${contract.clientName} ${contract.platform} ${contract.serviceProvider} ${contract.incumbentProvider ?? ""} ${contract.renewalRationale ?? ""} ${contract.mediaCoverageSummary ?? ""}`.toLowerCase();
        if (!haystack.includes(filters.freeText.toLowerCase())) return false;
      }

      return true;
    })
    .sort((a, b) => b.contractStartDate.localeCompare(a.contractStartDate));
}

export async function createContractFile(draft: ContractDraft): Promise<ContractRecord> {
  const db = await readDb();
  const record = normalizeDraft(draft);
  db.contracts.push(record);
  await writeDb(db);
  return record;
}

export async function createManyFile(drafts: ContractDraft[]): Promise<ContractRecord[]> {
  const db = await readDb();
  const existingKeys = new Set(db.contracts.map((c) => `${c.title.toLowerCase()}|${c.contractStartDate}`));
  const created: ContractRecord[] = [];

  for (const draft of drafts) {
    const key = `${draft.title.toLowerCase()}|${draft.contractStartDate}`;
    if (existingKeys.has(key)) continue;

    const record = normalizeDraft(draft);
    db.contracts.push(record);
    existingKeys.add(key);
    created.push(record);
  }

  if (created.length > 0) await writeDb(db);
  return created;
}

export async function getMetadataFile(): Promise<Record<string, string[]>> {
  const db = await readDb();

  return {
    serviceLines: uniqueSorted(db.contracts.map((c) => c.serviceLine)),
    industries: uniqueSorted(db.contracts.map((c) => c.industry)),
    serviceProviders: uniqueSorted(db.contracts.map((c) => c.serviceProvider)),
    geographies: uniqueSorted(db.contracts.map((c) => c.geography)),
    informationTypes: uniqueSorted(db.contracts.map((c) => c.informationType)),
    renewalStatuses: uniqueSorted(db.contracts.map((c) => c.renewalStatus ?? "No Renewal Insight")),
  };
}
