"use client";

import { useState } from "react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useCurrency } from "@/lib/CurrencyContext";
import type { Tour } from "@/lib/tours";

export default function TourBookingSidebar({ tour }: { tour: Tour }) {
  const { formatPrice } = useCurrency();
  const [date, setDate] = useState(tour.departureDates[0] ?? "");
  const [travelers, setTravelers] = useState(2);

  const unitPrice = tour.deal ? tour.priceFrom * (1 - tour.deal.percentOff / 100) : tour.priceFrom;
  const total = unitPrice * travelers;
  const bookHref = `/book/${tour.slug}?date=${encodeURIComponent(date)}&travelers=${travelers}`;

  return (
    <div className="sticky top-36 lg:top-52 rounded-3xl border border-ink/10 bg-paper-dim p-6">
      <p className="text-[10px] eyebrow uppercase text-ink/70">From</p>
      <div className="flex items-baseline gap-2">
        {tour.deal && (
          <span className="text-sm text-ink/70 line-through">{formatPrice(tour.priceFrom)}</span>
        )}
        <span className="font-serif text-3xl text-ink">{formatPrice(unitPrice)}</span>
        <span className="text-xs text-ink/70">/ person</span>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-[10px] eyebrow uppercase text-ink/70">Departure Date</span>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          >
            {tour.departureDates.map((d) => (
              <option key={d} value={d}>
                {new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] eyebrow uppercase text-ink/70">Travelers</span>
          <div className="flex items-center justify-between rounded-xl border border-ink/15 bg-paper px-4 py-2">
            <button
              type="button"
              onClick={() => setTravelers((t) => Math.max(1, t - 1))}
              aria-label="Fewer travelers"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-paper-dim"
            >
              −
            </button>
            <span className="text-sm text-ink">{travelers}</span>
            <button
              type="button"
              onClick={() => setTravelers((t) => Math.min(tour.groupSizeMax, t + 1))}
              aria-label="More travelers"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-paper-dim"
            >
              +
            </button>
          </div>
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
        <span className="text-ink/70">Estimated total</span>
        <span className="font-serif text-xl text-ink">{formatPrice(total)}</span>
      </div>

      <Magnetic strength={0.15} className="mt-6 block w-full">
        <Link
          href={bookHref}
          data-cursor-hover
          className="btn-shine block w-full rounded-full bg-accent px-7 py-4 text-center text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
        >
          Reserve This Trip
        </Link>
      </Magnetic>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink/70">
        No payment due now — our team confirms availability and takes a deposit.
      </p>
    </div>
  );
}
