// Gates the internal /tools/* pages behind one shared staff password
// (TOOLS_PASSWORD) — not a full user-accounts system, which would be
// overkill for a single business owner and occasional staff. Uses Web
// Crypto (crypto.subtle) rather than node:crypto so the same check works
// in both the Edge middleware and the Node.js API route without branching.
export const TOOLS_COOKIE_NAME = "tools_session";

// Constant-time string comparison: every character position is always
// visited, so response time doesn't reveal how many leading characters of a
// guess were correct. A plain `===` short-circuits on the first mismatch.
function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

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

// Trimmed on both sides — a stray trailing newline or space is an easy
// thing to end up with pasting a secret into Vercel's env var UI (this bit
// INDEXNOW_KEY earlier for exactly this reason), and would otherwise make
// the password permanently unmatchable no matter how correctly it's typed
// into the login form.
function configuredPassword(): string | null {
  const password = process.env.TOOLS_PASSWORD?.trim();
  return password || null;
}

export function checkPassword(input: string): boolean {
  const password = configuredPassword();
  return !!password && safeEqual(input.trim(), password);
}

export async function expectedSessionToken(): Promise<string | null> {
  const password = configuredPassword();
  if (!password) return null;
  return signToken(password);
}

export async function isValidSession(cookieValue: string | undefined | null): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await expectedSessionToken();
  return !!expected && safeEqual(cookieValue, expected);
}
