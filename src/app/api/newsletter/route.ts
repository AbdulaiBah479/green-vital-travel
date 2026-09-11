import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/inquiries";
import { firstIssueMessage, isSpam, newsletterSchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rateLimit";

const SUCCESS_MESSAGE = "You're on the list — welcome aboard.";

export async function POST(request: Request) {
  if (!rateLimit(`newsletter:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many attempts recently. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    if (isSpam(body)) {
      return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
    }

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: firstIssueMessage(parsed.error, "Please enter a valid email address.") },
        { status: 400 }
      );
    }

    await subscribeNewsletter(parsed.data.email);

    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { error: "We couldn't subscribe you right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
