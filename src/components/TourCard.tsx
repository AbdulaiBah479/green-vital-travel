"use client";

import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { reviewsForTour, averageRating } from "@/lib/reviews";
import type { Tour } from "@/lib/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  // Real reviews only — never the tour's own baked-in rating/reviewCount,
  // which is leftover placeholder data, not something travelers actually left.
  const tourReviews = reviewsForTour(tour.slug);
  const hasReviews = tourReviews.length > 0;
  const rating = hasReviews ? averageRating(tourReviews) : 0;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      data-cursor-hover
      className="card-lift group block overflow-hidden rounded-2xl border border-ink/10 bg-paper hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={tour.heroImg}
          alt={tour.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <WishlistButton slug={`tour:${tour.slug}`} label={tour.title} className="absolute right-4 top-4" />
      </div>
      <div className="p-5">
        <p className="text-xs eyebrow uppercase text-accent-deep">{tour.category}</p>
        <h3 className="mt-2 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-accent-deep">
          {tour.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-ink/70">
          {hasReviews ? (
            <>
              <Stars rating={rating} />
              <span>
                {rating.toFixed(1)} ({tourReviews.length})
              </span>
            </>
          ) : (
            <span className="eyebrow text-[10px] uppercase text-accent-deep">New</span>
          )}
        </div>
        <div className="mt-4 border-t border-ink/10 pt-4">
          <p className="text-[10px] eyebrow uppercase text-ink/70">Why This Trip</p>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink/80">{tour.highlights[0]}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs eyebrow uppercase text-ink/70 transition-colors group-hover:text-accent-deep">
            View Itinerary →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex text-accent-2" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}
