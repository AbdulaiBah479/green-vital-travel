import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete all fields before sending your message." },
        { status: 400 }
      );
    }

    await submitInquiry("contact", {
      name,
      email,
      subject,
      message,
      source: "website-contact-form",
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks — a member of our team will respond within one business day.",
    });
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
