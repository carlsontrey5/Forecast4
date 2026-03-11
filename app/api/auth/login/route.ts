import { NextRequest, NextResponse } from "next/server";
import { login, sessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const payload = (await req.json().catch(() => ({}))) as { username?: string; password?: string };
  const username = payload.username?.trim() ?? "";
  const password = payload.password?.trim() ?? "";

  const auth = login(username, password);
  if (!auth) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const res = NextResponse.json({ user: auth.user });
  res.headers.set("Set-Cookie", sessionCookie(auth.token));
  return res;
}
