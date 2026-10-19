import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ReviewsList from "@/components/ReviewsList";
import WriteReviewForm from "@/components/WriteReviewForm";
import { reviews, averageRating, ratingBreakdown } from "@/lib/reviews";
import { googleReviewUrl } from "@/lib/site";

const description =
  "What travelers actually say after the trip is over — every review tied to a real tour, filterable by destination or rating.";

export const metadata: Metadata = {
  title: "Reviews",
  description,
  alternates: { canonical: "/reviews" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Reviews — Green Vital",
    description,
    url: "/reviews",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Reviews — Green Vital",
    description: description,
  },
};

export default function ReviewsPage() {
  const avg = averageRating();
  const breakdown = ratingBreakdown();
  const total = reviews.length;
  const hasReviews = total > 0;

  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            Traveler Reviews
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {hasReviews ? `${avg.toFixed(1)} out of 5, across ${total} reviews.` : "No reviews yet — you could be first."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {hasReviews
              ? description
              : "We're a newly registered agency in Freetown — every review here will be from a real traveler, tied to a real tour. Traveled with us already? Leave the first one below."}
          </p>
        </Reveal>

        {hasReviews && (
          <Reveal className="mx-auto mt-14 max-w-md space-y-2">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = breakdown[star];
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs text-ink/70">
                  <span className="w-10 shrink-0">{star} star</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
                    <span
                      className="block h-full rounded-full bg-accent-2"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right">{count}</span>
                </div>
              );
            })}
          </Reveal>
        )}

        <Reveal className="mt-16">
          <ReviewsList />
        </Reveal>

        <Reveal className="mt-20 border-t border-ink/10 pt-16">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Write a Review</p>
          <h2 className="mb-6 max-w-md font-serif text-2xl leading-tight text-ink">
            Traveled with us? We&rsquo;d like to hear how it went.
          </h2>
          <WriteReviewForm />
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-ink px-8 py-12 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Review us on Google</p>
          <h2 className="max-w-md text-balance font-serif text-2xl leading-tight">
            Happy with our service? A Google review helps other travelers find us.
          </h2>
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
          >
            Leave a Google review
          </a>
        </Reveal>
      </div>
    </main>
  );
}
