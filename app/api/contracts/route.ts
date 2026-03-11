import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireSession } from "@/lib/auth/session";
import { createContract, createContractFromTextWithLlm, getDatabaseProvider, getMetadata, listContracts } from "@/lib/contracts/db";
import type { InformationType } from "@/lib/contracts/types";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const session = requireSession(req);
    const params = req.nextUrl.searchParams;
    const infoTypes = params.getAll("informationType") as InformationType[];

    const contracts = await listContracts({
      freeText: params.get("freeText") ?? undefined,
      serviceLine: params.get("serviceLine") ?? undefined,
      industry: params.get("industry") ?? undefined,
      serviceProvider: params.get("serviceProvider") ?? undefined,
      geography: params.get("geography") ?? undefined,
      startDateFrom: params.get("startDateFrom") ?? undefined,
      startDateTo: params.get("startDateTo") ?? undefined,
      renewalStatus: (params.get("renewalStatus") as "Renewal" | "Loss" | "No Renewal Insight" | "Any" | null) ?? undefined,
      informationTypes: infoTypes.length > 0 ? infoTypes : undefined,
    });

    const meta = await getMetadata();
    return NextResponse.json({ contracts, meta, user: session, databaseProvider: getDatabaseProvider() });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    requireAdmin(req);
    const payload = await req.json();

    if (payload.rawText && typeof payload.rawText === "string") {
      const created = await createContractFromTextWithLlm(payload.rawText);
      return NextResponse.json({ created }, { status: 201 });
    }

    const created = await createContract(payload.contract ?? payload);
    return NextResponse.json({ created }, { status: 201 });
  } catch (error) {
    const message = (error as Error).message;
    const status =
      message === "Admin role required" || message === "Unauthorized"
        ? 403
        : message.startsWith("NO_RELEVANT_EVENT:")
        ? 422
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
