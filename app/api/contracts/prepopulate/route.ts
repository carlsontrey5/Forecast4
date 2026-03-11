import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { createManyContracts, createManyFromText } from "@/lib/contracts/db";
import { buildHistoricalDrafts } from "@/lib/contracts/historical";
import { prepopulateSnippets } from "@/lib/contracts/seed";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    requireAdmin(req);
    const payload = (await req.json().catch(() => ({}))) as {
      snippets?: string[];
      count?: number;
      historical?: boolean;
      startYear?: number;
      endYear?: number;
      categories?: string[];
      maxPerCategoryPerYear?: number;
    };

    const shouldRunHistorical = payload.historical === true || typeof payload.startYear === "number";
    if (shouldRunHistorical) {
      const historical = await buildHistoricalDrafts({
        startYear: payload.startYear ?? 2010,
        endYear: payload.endYear,
        categories: payload.categories,
        maxPerCategoryPerYear: payload.maxPerCategoryPerYear ?? 2,
      });

      const created = await createManyContracts(historical.drafts);
      return NextResponse.json({
        createdCount: created.length,
        created,
        mode: "historical",
        range: historical.range,
        categories: historical.categories,
        liveCount: historical.liveCount,
        syntheticCount: historical.syntheticCount,
        warnings: historical.warnings,
        message:
          created.length === 0
            ? "No new historical records inserted (duplicates skipped)."
            : `Historical prepopulation complete for ${historical.range.startYear}-${historical.range.endYear}.`,
      });
    }

    const count = Math.max(1, Math.min(20, Number(payload.count ?? 6)));
    const snippets = payload.snippets?.length ? payload.snippets : prepopulateSnippets.slice(0, count);

    const created = await createManyFromText(snippets);

    return NextResponse.json({
      createdCount: created.length,
      created,
      message: created.length === 0 ? "No new contracts inserted (duplicates skipped)." : "Contracts prepopulated successfully.",
    });
  } catch (error) {
    const message = (error as Error).message;
    const status = message === "Admin role required" || message === "Unauthorized" ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
