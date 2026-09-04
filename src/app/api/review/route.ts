import { NextResponse } from "next/server";
import { submitReview } from "@/lib/inquiries";
import { tours } from "@/lib/tours";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tourSlug = String(body.tourSlug ?? "").trim();
    const rating = Number(body.rating);
    const name = String(body.name ?? "").trim();
    const reviewBody = String(body.body ?? "").trim();

    const tour = tours.find((t) => t.slug === tourSlug);

    if (!tour || !name || !reviewBody || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please complete all fields before submitting your review." },
        { status: 400 }
      );
    }

    await submitReview({ tourSlug, tourTitle: tour.title, rating, name, body: reviewBody });

    return NextResponse.json({
      ok: true,
      message: "Thanks — we'll verify it against your booking before it goes live.",
    });
  } catch (error) {
    console.error("Review submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't submit your review right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
