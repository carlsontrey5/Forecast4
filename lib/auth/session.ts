import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export type UserRole = "admin" | "analyst";

export interface SessionUser {
  username: string;
  role: UserRole;
  exp: number;
}

const cookieName = "tracker_session";

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "change-me-in-env";
}

function sign(payloadBase64: string): string {
  return createHmac("sha256", getSecret()).update(payloadBase64).digest("base64url");
}

function encode(payload: SessionUser): string {
  const payloadBase64 = Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
  return `${payloadBase64}.${sign(payloadBase64)}`;
}

function decode(token: string): SessionUser | null {
  const [payloadBase64, providedSig] = token.split(".");
  if (!payloadBase64 || !providedSig) return null;

  const expectedSig = sign(payloadBase64);
  if (providedSig.length !== expectedSig.length) return null;
  const ok = timingSafeEqual(Buffer.from(providedSig), Buffer.from(expectedSig));
  if (!ok) return null;

  const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf-8")) as SessionUser;
  if (payload.exp < Date.now()) return null;
  return payload;
}

function configuredUsers(): Array<{ username: string; password: string; role: UserRole }> {
  return [
    {
      username: process.env.ADMIN_USER ?? "admin",
      password: process.env.ADMIN_PASS ?? "admin123",
      role: "admin",
    },
    {
      username: process.env.ANALYST_USER ?? "analyst",
      password: process.env.ANALYST_PASS ?? "analyst123",
      role: "analyst",
    },
  ];
}

export function createSessionToken(username: string, role: UserRole): string {
  const exp = Date.now() + 1000 * 60 * 60 * 8;
  return encode({ username, role, exp });
}

export function login(username: string, password: string): { token: string; user: SessionUser } | null {
  const user = configuredUsers().find((item) => item.username === username && item.password === password);
  if (!user) return null;

  const token = createSessionToken(user.username, user.role);
  const session = decode(token);
  if (!session) return null;
  return { token, user: session };
}

export function getSessionFromRequest(req: NextRequest): SessionUser | null {
  const token = req.cookies.get(cookieName)?.value;
  if (!token) return null;
  return decode(token);
}

export function requireSession(req: NextRequest): SessionUser {
  const session = getSessionFromRequest(req);
  if (!session) throw new Error("Unauthorized");
  return session;
}

export function requireAdmin(req: NextRequest): SessionUser {
  const session = requireSession(req);
  if (session.role !== "admin") throw new Error("Admin role required");
  return session;
}

export function sessionCookie(token: string): string {
  return `${cookieName}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=28800`;
}

export function clearSessionCookie(): string {
  return `${cookieName}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}
