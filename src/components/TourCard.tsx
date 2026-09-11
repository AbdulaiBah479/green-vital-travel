"use client";

import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/lib/CurrencyContext";
import WishlistButton from "./WishlistButton";
import { reviewsForTour, averageRating } from "@/lib/reviews";
import { activeDeal, type Tour } from "@/lib/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  const { formatPrice } = useCurrency();
  const deal = activeDeal(tour);
  const discounted = deal ? tour.priceFrom * (1 - deal.percentOff / 100) : null;
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
        {deal && (
          <span className="absolute left-4 top-4 rounded-full bg-accent-2 px-3 py-1 text-[10px] eyebrow uppercase text-ink">
            {deal.label} · {deal.percentOff}% off
          </span>
        )}
        <WishlistButton slug={`tour:${tour.slug}`} label={tour.title} className="absolute right-4 top-4" />
      </div>
      <div className="p-5">
        <p className="text-xs eyebrow uppercase text-accent-deep">
          {tour.category} · {tour.nights} nights
        </p>
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
        <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
          <div>
            <p className="text-[10px] eyebrow uppercase text-ink/70">From</p>
            {discounted ? (
              <p className="flex items-baseline gap-2">
                <span className="text-sm text-ink/70 line-through">{formatPrice(tour.priceFrom)}</span>
                <span className="font-serif text-xl text-accent-2-deep">{formatPrice(discounted)}</span>
              </p>
            ) : (
              <p className="font-serif text-xl text-ink">{formatPrice(tour.priceFrom)}</p>
            )}
          </div>
          <span className="text-xs eyebrow uppercase text-ink/70 transition-colors group-hover:text-accent-deep">
            View →
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
