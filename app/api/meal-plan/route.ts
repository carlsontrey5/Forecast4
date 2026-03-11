import { NextResponse } from "next/server";

export const runtime = "nodejs";

type MealItem = { food: string; portion: string; calories: number; protein: number; carbs: number; fat: number };
type Meal = { items: MealItem[] };
type Day = {
  day: string;
  isCheat: boolean;
  meals: { breakfast: Meal; lunch: Meal; dinner: Meal; snack1: Meal; snack2: Meal };
  totals: { calories: number; protein: number; carbs: number; fat: number };
};
type Grocery = { item: string; quantity: string; notes: string };
type MealPlan = { days: Day[]; groceryList?: Grocery[]; prepNotes?: string[]; serverWarnings?: string[] };

function cleanTextToJsonCandidate(text: string) {
  return text.replace(/```json|```/g, "").trim();
}

// Basic JSON repair: salvage first {...} or [...] block; strip trailing commas.
function repairJson(raw: string): string {
  const t = cleanTextToJsonCandidate(raw);
  const firstObj = t.indexOf("{");
  const firstArr = t.indexOf("[");
  const start = firstObj === -1 ? firstArr : firstArr === -1 ? firstObj : Math.min(firstObj, firstArr);
  if (start === -1) return t;

  let depth = 0;
  let inStr = false;
  let esc = false;
  let end = -1;

  for (let i = start; i < t.length; i++) {
    const ch = t[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
    } else {
      if (ch === '"') inStr = true;
      else if (ch === "{" || ch === "[") depth++;
      else if (ch === "}" || ch === "]") {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }

  const slice = end !== -1 ? t.slice(start, end) : t.slice(start);
  return slice.replace(/,\s*(\}|\])/g, "$1");
}

function extractAssistantText(data: any): string {
  return (data?.content || []).map((c: any) => c?.text || "").join("");
}

function isFiniteNumber(n: any) {
  return typeof n === "number" && Number.isFinite(n);
}

function validateMealPlanShape(x: any): x is MealPlan {
  if (!x || typeof x !== "object" || !Array.isArray(x.days) || x.days.length < 5) return false;

  for (const d of x.days) {
    if (!d || typeof d !== "object") return false;
    if (typeof d.day !== "string") return false;
    if (typeof d.isCheat !== "boolean") return false;
    if (!d.meals || typeof d.meals !== "object") return false;

    const keys = ["breakfast", "lunch", "dinner", "snack1", "snack2"] as const;
    for (const k of keys) {
      const meal = d.meals[k];
      if (!meal || typeof meal !== "object" || !Array.isArray(meal.items) || meal.items.length === 0) return false;
      for (const it of meal.items) {
        if (!it || typeof it !== "object") return false;
        if (typeof it.food !== "string" || typeof it.portion !== "string") return false;
        if (![it.calories, it.protein, it.carbs, it.fat].every(isFiniteNumber)) return false;
      }
    }

    if (!d.totals || typeof d.totals !== "object") return false;
    if (![d.totals.calories, d.totals.protein, d.totals.carbs, d.totals.fat].every(isFiniteNumber)) return false;
  }

  if (x.groceryList && !Array.isArray(x.groceryList)) return false;
  if (Array.isArray(x.groceryList)) {
    for (const g of x.groceryList) {
      if (!g || typeof g !== "object") return false;
      if (typeof g.item !== "string" || typeof g.quantity !== "string" || typeof g.notes !== "string") return false;
    }
  }

  return true;
}

function within(v: number, target: number, tol: number) {
  return Math.abs(v - target) <= tol;
}

function serverMacroChecks(plan: MealPlan, targets: { calories: number; protein: number; carbs: number; fat: number }) {
  const issues: string[] = [];
  for (const d of plan.days) {
    if (d.isCheat) continue;
    const calTol = Math.round(targets.calories * 0.05);
    if (!within(d.totals.calories, targets.calories, calTol)) issues.push(`${d.day}: calories off target`);
    if (!within(d.totals.protein, targets.protein, 10)) issues.push(`${d.day}: protein off target`);
    if (!within(d.totals.carbs, targets.carbs, 10)) issues.push(`${d.day}: carbs off target`);
    if (!within(d.totals.fat, targets.fat, 10)) issues.push(`${d.day}: fat off target`);
  }
  return issues;
}

async function callClaude(prompt: string) {
  return fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2400,
      messages: [{ role: "user", content: prompt }],
    }),
  });
}

export async function POST(req: Request) {
  try {
    const { profile, needs, diet } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) return new NextResponse("Missing ANTHROPIC_API_KEY", { status: 500 });
    if (!needs?.targetCals || !needs?.protein || !needs?.carbs || !needs?.fat) return new NextResponse("Missing macro targets (needs)", { status: 400 });

    const targets = { calories: needs.targetCals, protein: needs.protein, carbs: needs.carbs, fat: needs.fat };

    const basePrompt = `You are a bodybuilding sports nutritionist and meal-prep chef.
Create a tasty, realistic 7-day meal plan (Mon–Sun).

Client:
- Sex: ${profile?.sex}
- Age: ${profile?.age}
- Weight: ${needs?.weightKg ?? "N/A"} kg
- Height: ${needs?.heightCm ?? "N/A"} cm
- Training: ${profile?.days} days/week, ${profile?.time} per session
- Experience: ${profile?.exp}
- Goal: ${profile?.goal}
- Diet/preferences: ${diet || "None"}

Daily targets to hit closely (non-cheat days):
- Calories: ${targets.calories}
- Protein: ${targets.protein} g
- Carbs: ${targets.carbs} g
- Fat: ${targets.fat} g

Rules:
- 5 feedings/day: breakfast, lunch, dinner, snack1, snack2
- Provide exact portions (grams/ml or common measures)
- Each non-cheat day: ±5% calories and within ±10g for each macro
- Saturday is cheat day: relaxed macros but protein-forward and still sensible
- Use common ingredients and reasonable cooking time
- Include a grocery list consolidating ingredients for the full week

Return ONLY valid JSON (no markdown) with this schema:
{
  "days":[
    {
      "day":"Monday",
      "isCheat":false,
      "meals":{
        "breakfast":{"items":[{"food":"","portion":"","calories":0,"protein":0,"carbs":0,"fat":0}]},
        "lunch":{"items":[{"food":"","portion":"","calories":0,"protein":0,"carbs":0,"fat":0}]},
        "dinner":{"items":[{"food":"","portion":"","calories":0,"protein":0,"carbs":0,"fat":0}]},
        "snack1":{"items":[{"food":"","portion":"","calories":0,"protein":0,"carbs":0,"fat":0}]},
        "snack2":{"items":[{"food":"","portion":"","calories":0,"protein":0,"carbs":0,"fat":0}]}
      },
      "totals":{"calories":0,"protein":0,"carbs":0,"fat":0}
    }
  ],
  "groceryList":[{"item":"","quantity":"","notes":""}],
  "prepNotes":["..."]
}`;

    // Attempt 1
    let r = await callClaude(basePrompt);
    if (!r.ok) return new NextResponse(await r.text(), { status: 502 });
    let data = await r.json();
    let raw = extractAssistantText(data);

    let plan: MealPlan | null = null;
    try {
      plan = JSON.parse(repairJson(raw));
    } catch {
      plan = null;
    }

    // Attempt 2: self-heal with error feedback
    if (!plan || !validateMealPlanShape(plan) || serverMacroChecks(plan, targets).length) {
      const issues = plan && validateMealPlanShape(plan) ? serverMacroChecks(plan, targets) : ["Invalid JSON or schema"];
      const fixPrompt = `${basePrompt}

The previous output had problems:
- ${issues.join("\\n- ")}

Regenerate the entire JSON from scratch and ensure it matches the schema and macro tolerances.`;

      r = await callClaude(fixPrompt);
      if (!r.ok) return new NextResponse(await r.text(), { status: 502 });
      data = await r.json();
      raw = extractAssistantText(data);
      plan = JSON.parse(repairJson(raw));
    }

    const warnings = plan && validateMealPlanShape(plan) ? serverMacroChecks(plan, targets) : ["Invalid output after regeneration"];
    const payload: MealPlan = { ...(plan as any), serverWarnings: warnings };

    return NextResponse.json(payload);
  } catch (e: any) {
    return new NextResponse(e?.message || "Server error", { status: 500 });
  }
}
