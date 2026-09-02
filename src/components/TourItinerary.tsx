"use client";

import { useState } from "react";
import type { ItineraryStop } from "@/lib/tours";

export default function TourItinerary({ stops }: { stops: ItineraryStop[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {stops.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.day}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="shrink-0 font-serif text-sm italic text-accent-deep">Day {s.day}</span>
                <span className="font-serif text-lg text-ink">{s.title}</span>
              </span>
              <span
                className={`shrink-0 text-xl text-accent-deep transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="min-h-0 max-w-xl text-sm leading-relaxed text-ink/70">{s.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
