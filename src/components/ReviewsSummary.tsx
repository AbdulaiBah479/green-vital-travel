import Link from "next/link";
import Reveal from "./Reveal";
import { Stars } from "./TourCard";
import { reviews, averageRating } from "@/lib/reviews";
import { featuredGoogleReview } from "@/lib/googleReviews";
import { googleBusinessUrl } from "@/lib/site";

export default function ReviewsSummary() {
  const avg = averageRating();
  const hasReviews = reviews.length > 0;

  return (
    <section className="border-y border-line-dark bg-paper-dim px-6 py-16 sm:px-10">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          {hasReviews ? (
            <>
              <span className="font-serif text-4xl text-ink">{avg.toFixed(1)}</span>
              <div>
                <Stars rating={avg} />
                <p className="mt-1 text-xs text-ink/70">Based on {reviews.length} traveler reviews</p>
              </div>
            </>
          ) : featuredGoogleReview ? (
            <figure className="max-w-2xl">
              <Stars rating={featuredGoogleReview.rating} />
              <blockquote className="mt-2 font-serif text-xl leading-snug text-ink sm:text-2xl">
                &ldquo;{featuredGoogleReview.text}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs text-ink/70">
                {featuredGoogleReview.name}, Google review
              </figcaption>
            </figure>
          ) : (
            <div>
              <p className="font-serif text-2xl text-ink">Real reviews, on Google.</p>
              <p className="mt-1 text-xs text-ink/70">
                See what travelers say about Green Vital, in their own words.
              </p>
            </div>
          )}
        </div>
        {hasReviews ? (
          <Link
            href="/reviews"
            data-cursor-hover
            className="rounded-full border border-ink/15 px-6 py-3 text-xs eyebrow uppercase text-ink/70 transition-colors hover:border-accent hover:text-accent-deep"
          >
            Read All Reviews →
          </Link>
        ) : (
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="rounded-full border border-ink/15 px-6 py-3 text-xs eyebrow uppercase text-ink/70 transition-colors hover:border-accent hover:text-accent-deep"
          >
            Read Our Google Reviews →
          </a>
        )}
      </Reveal>
    </section>
  );
}
