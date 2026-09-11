import { NextResponse } from "next/server";
import { submitReview } from "@/lib/inquiries";
import { tours } from "@/lib/tours";
import { firstIssueMessage, isSpam, reviewSchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rateLimit";

const SUCCESS_MESSAGE = "Thanks — we'll verify it against your booking before it goes live.";

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
    const tour = parsed.success ? tours.find((t) => t.slug === parsed.data.tourSlug) : undefined;

    if (!parsed.success || !tour) {
      return NextResponse.json(
        {
          error: parsed.success
            ? "Please choose a valid tour."
            : firstIssueMessage(parsed.error, "Please complete all fields before submitting your review."),
        },
        { status: 400 }
      );
    }

    await submitReview({ ...parsed.data, tourTitle: tour.title });

    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Review submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't submit your review right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
