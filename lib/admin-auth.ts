import { NextRequest, NextResponse } from "next/server";

export const adminSessionCookie = "admin_session";

const sessionMaxAge = 60 * 60 * 24 * 7;

function getAdminSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "local-dev-admin-secret";
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

async function createSignature(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getAdminSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  const bytes = new Uint8Array(signature);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function constantTimeEqual(left: string, right: string) {
  const leftSignature = await createSignature(left);
  const rightSignature = await createSignature(right);
  return leftSignature === rightSignature;
}

export async function verifyAdminPassword(password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return false;
  }

  return constantTimeEqual(password, expectedPassword);
}

export async function createAdminSession() {
  const expiresAt = Date.now() + sessionMaxAge * 1000;
  const payload = String(expiresAt);
  const signature = await createSignature(payload);

  return `${payload}.${signature}`;
}

export async function verifyAdminSession(session: string | undefined) {
  if (!session) {
    return false;
  }

  const [expiresAt, signature] = session.split(".");
  const expiresAtNumber = Number(expiresAt);

  if (!expiresAt || !signature || !Number.isFinite(expiresAtNumber)) {
    return false;
  }

  if (expiresAtNumber < Date.now()) {
    return false;
  }

  const expectedSignature = await createSignature(expiresAt);
  return signature === expectedSignature;
}

export async function isAdminRequest(request?: NextRequest) {
  return verifyAdminSession(request?.cookies.get(adminSessionCookie)?.value);
}

export function setAdminSessionCookie(response: NextResponse, session: string) {
  response.cookies.set(adminSessionCookie, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(adminSessionCookie, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
