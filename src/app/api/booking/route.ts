import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tourSlug = String(body.tourSlug ?? "").trim();
    const tourTitle = String(body.tourTitle ?? "").trim();
    const departureDate = String(body.departureDate ?? "").trim();
    const travelers = Number(body.travelers ?? 1);
    const leadName = String(body.leadName ?? "").trim();
    const leadEmail = String(body.leadEmail ?? "").trim();
    const leadPhone = String(body.leadPhone ?? "").trim();
    const addOns = {
      insurance: Boolean(body.addOns?.insurance),
      transfer: Boolean(body.addOns?.transfer),
      roomUpgrade: Boolean(body.addOns?.roomUpgrade),
    };
    const total = Number(body.total ?? 0);
    const notes = String(body.notes ?? "").trim();

    if (!tourSlug || !tourTitle || !departureDate || !leadName || !leadEmail) {
      return NextResponse.json(
        { error: "Please complete the trip and traveler details before submitting your request." },
        { status: 400 }
      );
    }

    const result = await submitInquiry("booking", {
      tourSlug,
      tourTitle,
      departureDate,
      travelers,
      leadName,
      leadEmail,
      leadPhone: leadPhone || undefined,
      addOns,
      total,
      notes,
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
