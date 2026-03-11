import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { enrichDealIntelligence } from "@/lib/contracts/deal-intelligence";
import type { ContractRecord } from "@/lib/contracts/types";

const dbPath = path.join(process.cwd(), "data", "contracts.json");

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    requireAdmin(req);
    if (process.env.DATABASE_PROVIDER === "supabase") {
      return NextResponse.json(
        { error: "Deal intelligence refresh currently persists only in file database mode. Switch DATABASE_PROVIDER=file for this operation." },
        { status: 400 },
      );
    }

    const payload = (await req.json().catch(() => ({}))) as {
      ids?: string[];
      refresh?: boolean;
      limit?: number;
    };

    const raw = await fs.readFile(dbPath, "utf-8");
    const parsed = JSON.parse(raw) as { contracts: ContractRecord[] };
    const ids = new Set((payload.ids ?? []).filter(Boolean));
    const refresh = payload.refresh === true;
    const limit = Math.max(1, Math.min(200, Number(payload.limit ?? 50)));

    const selected = parsed.contracts
      .filter((c) => c.informationType === "Contracts")
      .filter((c) => (ids.size > 0 ? ids.has(c.id) : true))
      .slice(0, limit);

    let updatedCount = 0;
    const nextById = new Map<string, ContractRecord>();

    for (const contract of selected) {
      const hasExisting =
        Boolean(contract.renewalStatus) &&
        typeof contract.renewalConfidence === "number" &&
        Boolean(contract.renewalRationale) &&
        Boolean(contract.dealTypeDetail) &&
        Boolean(contract.mediaCoverageSummary);

      if (!refresh && hasExisting) continue;

      const enrichment = await enrichDealIntelligence(contract);
      nextById.set(contract.id, {
        ...contract,
        ...enrichment,
        updatedAt: new Date().toISOString(),
      });
      updatedCount += 1;
    }

    if (updatedCount > 0) {
      const contracts = parsed.contracts.map((c) => nextById.get(c.id) ?? c);
      await fs.writeFile(dbPath, JSON.stringify({ contracts }, null, 2), "utf-8");
    }

    return NextResponse.json({
      ok: true,
      considered: selected.length,
      updatedCount,
      message:
        updatedCount > 0
          ? "Deal intelligence updated from external coverage signals."
          : "No records needed updating.",
    });
  } catch (error) {
    const message = (error as Error).message;
    const status = message === "Admin role required" || message === "Unauthorized" ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
