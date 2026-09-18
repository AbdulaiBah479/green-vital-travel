import { NextResponse } from "next/server";
import { z } from "zod";
import { checkPassword, expectedSessionToken, TOOLS_COOKIE_NAME } from "@/lib/toolsAuth";
import { clientKey, rateLimit } from "@/lib/rateLimit";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  // Deliberately tight — this endpoint exists to brute-force a single
  // shared password, so it gets a much stricter limit than the public
  // contact/chat endpoints.
  if (!rateLimit(`tools-login:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter the password." }, { status: 400 });
  }

  if (!checkPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await expectedSessionToken();
  if (!token) {
    return NextResponse.json({ error: "This tool isn't configured yet — set TOOLS_PASSWORD." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(TOOLS_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
