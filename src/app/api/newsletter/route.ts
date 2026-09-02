import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/inquiries";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await subscribeNewsletter(email);

    return NextResponse.json({ ok: true, message: "You're on the list — welcome aboard." });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { error: "We couldn't subscribe you right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
