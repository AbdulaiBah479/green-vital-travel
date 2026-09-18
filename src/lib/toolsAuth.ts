// Gates the internal /tools/* pages behind one shared staff password
// (TOOLS_PASSWORD) — not a full user-accounts system, which would be
// overkill for a single business owner and occasional staff. Uses Web
// Crypto (crypto.subtle) rather than node:crypto so the same check works
// in both the Edge middleware and the Node.js API route without branching.
export const TOOLS_COOKIE_NAME = "tools_session";

function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function signToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("tools-access"));
  return bufferToHex(signature);
}

export function checkPassword(input: string): boolean {
  const password = process.env.TOOLS_PASSWORD;
  return !!password && input === password;
}

export async function expectedSessionToken(): Promise<string | null> {
  const password = process.env.TOOLS_PASSWORD;
  if (!password) return null;
  return signToken(password);
}

export async function isValidSession(cookieValue: string | undefined | null): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await expectedSessionToken();
  return !!expected && cookieValue === expected;
}
