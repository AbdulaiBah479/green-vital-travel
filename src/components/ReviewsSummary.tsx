import Link from "next/link";
import Reveal from "./Reveal";
import { Stars } from "./TourCard";
import { reviews, averageRating } from "@/lib/reviews";

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
          ) : (
            <div>
              <p className="font-serif text-2xl text-ink">A newly registered agency.</p>
              <p className="mt-1 text-xs text-ink/70">
                No reviews yet — you&rsquo;d be one of our first travelers.
              </p>
            </div>
          )}
        </div>
        <Link
          href={hasReviews ? "/reviews" : "/planner"}
          data-cursor-hover
          className="rounded-full border border-ink/15 px-6 py-3 text-xs eyebrow uppercase text-ink/70 transition-colors hover:border-accent hover:text-accent-deep"
        >
          {hasReviews ? "Read All Reviews →" : "Start Planning →"}
        </Link>
      </Reveal>
    </section>
  );
}
