"use client";

import { useMemo, useState } from "react";
import { reviews, tourTitle } from "@/lib/reviews";
import { tours } from "@/lib/tours";
import { Stars } from "./TourCard";

export default function ReviewsList() {
  const [tourSlug, setTourSlug] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(
    () =>
      reviews
        .filter((r) => (tourSlug ? r.tourSlug === tourSlug : true))
        .filter((r) => r.rating >= minRating)
        .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1)),
    [tourSlug, minRating]
  );

  // With no on-site reviews, the page points visitors to the public Google
  // reviews instead of showing empty filters and a "no reviews" message.
  if (reviews.length === 0) return null;

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <label className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs">
          <span className="eyebrow uppercase text-ink/70">Tour</span>
          <select
            value={tourSlug}
            onChange={(e) => setTourSlug(e.target.value)}
            className="bg-transparent text-ink outline-none"
          >
            <option value="">All Tours</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs">
          <span className="eyebrow uppercase text-ink/70">Rating</span>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="bg-transparent text-ink outline-none"
          >
            <option value={0}>Any</option>
            <option value={5}>5 stars</option>
            <option value={4}>4 stars &amp; up</option>
            <option value={3}>3 stars &amp; up</option>
          </select>
        </label>
      </div>

      <div className="space-y-8">
        {filtered.map((r) => (
          <div key={r.id} className="border-t border-ink/10 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Stars rating={r.rating} />
              <span className="text-xs text-ink/70">{r.date}</span>
            </div>
            <p className="mt-3 font-serif text-xl text-ink">{r.title}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70">{r.body}</p>
            <p className="mt-3 text-xs eyebrow uppercase text-ink/70">
              {r.name} · {r.location} · {tourTitle(r.tourSlug)}
              {r.verified && <span className="ml-2 text-accent-deep">✓ Verified traveler</span>}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink/70">
            {reviews.length === 0 ? "No reviews yet." : "No reviews match those filters."}
          </p>
        )}
      </div>
    </div>
  );
}
