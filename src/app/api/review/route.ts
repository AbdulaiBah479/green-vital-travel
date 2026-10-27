import { NextResponse } from "next/server";
import { submitReview } from "@/lib/inquiries";
import { tours } from "@/lib/tours";
import { firstIssueMessage, isSpam, reviewSchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rateLimit";

const SUCCESS_MESSAGE = "Thanks. We read every review, and yours will appear on this page once we have approved it.";

export async function POST(request: Request) {
  if (!rateLimit(`review:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many submissions recently. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    if (isSpam(body)) {
      return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
    }

    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: firstIssueMessage(parsed.error, "Please complete all fields before submitting your review.") },
        { status: 400 }
      );
    }

    const tourTitle = tours.find((t) => t.slug === parsed.data.tourSlug)?.title;
    const service = parsed.data.service || tourTitle || undefined;

    await submitReview({ name: parsed.data.name, rating: parsed.data.rating, body: parsed.data.body, service });

    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Review submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't submit your review right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
