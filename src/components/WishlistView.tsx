"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/WishlistContext";
import { getTour } from "@/lib/tours";
import { getDestination } from "@/lib/destinations";
import TourCard from "./TourCard";
import DestinationCard from "./DestinationCard";

export default function WishlistView() {
  const { saved } = useWishlist();
  const slugs = Array.from(saved);

  const savedTours = slugs
    .filter((s) => s.startsWith("tour:"))
    .map((s) => getTour(s.replace("tour:", "")))
    .filter((t): t is NonNullable<typeof t> => !!t);

  const savedDestinations = slugs
    .filter((s) => s.startsWith("destination:"))
    .map((s) => getDestination(s.replace("destination:", "")))
    .filter((d): d is NonNullable<typeof d> => !!d);

  if (savedTours.length === 0 && savedDestinations.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-ink/55">
          Nothing saved yet — tap the heart on any tour or destination to keep it here.
        </p>
        <Link
          href="/tours"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
        >
          Browse Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {savedTours.length > 0 && (
        <div>
          <p className="eyebrow mb-6 text-xs uppercase text-accent-deep">Saved Tours</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      )}

      {savedDestinations.length > 0 && (
        <div>
          <p className="eyebrow mb-6 text-xs uppercase text-accent-deep">Saved Destinations</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedDestinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
