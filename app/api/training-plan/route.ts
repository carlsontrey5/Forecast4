import { NextResponse } from "next/server";

export const runtime = "nodejs";

type TrainingDay = { day: string; split: string; exercises: string[]; cardio: string };
type TrainingPlan = { intensityNote: string; days: TrainingDay[]; serverWarnings?: string[] };

function cleanTextToJsonCandidate(text: string) {
  return text.replace(/```json|```/g, "").trim();
}

function repairJson(raw: string): string {
  const t = cleanTextToJsonCandidate(raw);
  const start = t.indexOf("{");
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
      else if (ch === "{") depth++;
      else if (ch === "}") {
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

function validateTrainingPlanShape(x: any): x is TrainingPlan {
  if (!x || typeof x !== "object") return false;
  if (typeof x.intensityNote !== "string") return false;
  if (!Array.isArray(x.days) || x.days.length < 2) return false;
  for (const d of x.days) {
    if (!d || typeof d !== "object") return false;
    if (typeof d.day !== "string" || typeof d.split !== "string") return false;
    if (!Array.isArray(d.exercises) || d.exercises.length === 0) return false;
    if (typeof d.cardio !== "string") return false;
  }
  return true;
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
      max_tokens: 1600,
      messages: [{ role: "user", content: prompt }],
    }),
  });
}

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();
    if (!process.env.ANTHROPIC_API_KEY) return new NextResponse("Missing ANTHROPIC_API_KEY", { status: 500 });

    const basePrompt = `You are an expert bodybuilding coach.
Create a weekly training plan based on the client profile.

Client:
- Sex: ${profile?.sex}
- Age: ${profile?.age}
- Weight: ${profile?.weightKg ?? profile?.weight ?? "N/A"} ${profile?.weightKg ? "kg" : profile?.weightUnit ?? ""}
- Height: ${profile?.heightCm ?? profile?.height ?? "N/A"} ${profile?.heightCm ? "cm" : profile?.heightUnit ?? ""}
- BMI: ${profile?.bmi ?? "N/A"} ${profile?.bmiLabel ? `(${profile.bmiLabel})` : ""}
- Goal: ${profile?.goal}
- Experience: ${profile?.exp}
- Training days/week: ${profile?.days}
- Session duration: ${profile?.time}

Rules:
- Match the requested number of days.
- Use a sensible split for the goal/experience.
- Exercise strings must include sets x reps (e.g. "Bench Press 4x6-8").
- Include a short cardio recommendation string per day (or "" if none).
- Include an overall intensityNote for progression, RPE, rest, and deload guidance.

Return ONLY valid JSON (no markdown) with this schema:
{
  "intensityNote":"string",
  "days":[{"day":"Day 1","split":"Push","exercises":["Bench Press 4x6-8"],"cardio":"string"}]
}`;

    // Attempt 1
    let r = await callClaude(basePrompt);
    if (!r.ok) return new NextResponse(await r.text(), { status: 502 });
    let data = await r.json();
    let raw = extractAssistantText(data);

    let plan: any = null;
    try {
      plan = JSON.parse(repairJson(raw));
    } catch {
      plan = null;
    }

    // Attempt 2
    if (!plan || !validateTrainingPlanShape(plan)) {
      const fixPrompt = `${basePrompt}

The previous output was invalid JSON or didn't match the schema.
Regenerate the entire JSON from scratch and ensure it matches the schema exactly.`;

      r = await callClaude(fixPrompt);
      if (!r.ok) return new NextResponse(await r.text(), { status: 502 });
      data = await r.json();
      raw = extractAssistantText(data);
      plan = JSON.parse(repairJson(raw));
    }

    const warnings = validateTrainingPlanShape(plan) ? [] : ["Invalid output after regeneration"];
    return NextResponse.json({ ...plan, serverWarnings: warnings });
  } catch (e: any) {
    return new NextResponse(e?.message || "Server error", { status: 500 });
  }
}
