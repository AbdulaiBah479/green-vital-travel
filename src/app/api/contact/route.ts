import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";
import { contactSchema, firstIssueMessage, isSpam } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rateLimit";

const SUCCESS_MESSAGE = "Thanks — a member of our team will respond within one business day.";

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many messages sent recently. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Spam is accepted with a normal success response and silently dropped —
    // never sent, never charged against the email quota, and the bot never
    // learns it was caught.
    if (isSpam(body)) {
      return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: firstIssueMessage(parsed.error, "Please complete all fields before sending your message.") },
        { status: 400 }
      );
    }

    await submitInquiry("contact", { ...parsed.data, source: "website-contact-form" });

    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        error:
          "We couldn’t send your message right now. Please email us directly or try again shortly.",
      },
      { status: 500 }
    );
  }
}
