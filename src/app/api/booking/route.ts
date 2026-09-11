import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";
import { bookingSchema, firstIssueMessage, isSpam } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  if (!rateLimit(`booking:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests sent recently. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    if (isSpam(body)) {
      return NextResponse.json({
        ok: true,
        reference: undefined,
        message: "Your reservation request has been received and our team will follow up shortly.",
      });
    }

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: firstIssueMessage(
            parsed.error,
            "Please complete the trip and traveler details before submitting your request."
          ),
        },
        { status: 400 }
      );
    }

    const result = await submitInquiry("booking", {
      ...parsed.data,
      leadPhone: parsed.data.leadPhone || undefined,
      notes: parsed.data.notes || "",
      source: "website-booking-wizard",
    });

    return NextResponse.json({
      ok: true,
      reference: result.reference,
      message: "Your reservation request has been received and our team will follow up shortly.",
    });
  } catch (error) {
    console.error("Booking inquiry submission failed:", error);
    return NextResponse.json(
      {
        error:
          "We couldn’t submit your reservation request right now. Please try again or get in touch directly.",
      },
      { status: 500 }
    );
  }
}
