"use client";

import { useMemo, useState } from "react";
import { tours as allTours, categories, type TourCategory } from "@/lib/tours";
import { destinations, regions, type Region } from "@/lib/destinations";
import { reviewsForTour, averageRating } from "@/lib/reviews";
import TourCard from "./TourCard";
import Reveal from "./Reveal";

// Real reviews only, never the tour's own baked-in rating field — see
// the same note in TourCard.tsx.
function realRating(slug: string) {
  const list = reviewsForTour(slug);
  return list.length > 0 ? averageRating(list) : 0;
}

type SortKey = "recommended" | "nights-asc" | "nights-desc" | "rating";
type DurationKey = "" | "short" | "medium" | "long";

const durationOptions: { value: DurationKey; label: string }[] = [
  { value: "", label: "Any length" },
  { value: "short", label: "Up to 7 nights" },
  { value: "medium", label: "8–10 nights" },
  { value: "long", label: "11+ nights" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "nights-asc", label: "Shortest First" },
  { value: "nights-desc", label: "Longest First" },
  { value: "rating", label: "Highest Rated" },
];

function destinationRegion(destSlug: string): Region | undefined {
  return destinations.find((d) => d.slug === destSlug)?.region;
}

export default function ToursGrid({
  initialRegion,
  initialCategory,
}: {
  initialRegion?: string;
  initialCategory?: string;
}) {
  const [region, setRegion] = useState<Region | "">(regions.find((r) => r === initialRegion) ?? "");
  const [category, setCategory] = useState<TourCategory | "">(
    categories.find((c) => c === initialCategory) ?? ""
  );
  const [duration, setDuration] = useState<DurationKey>("");
  const [sort, setSort] = useState<SortKey>("recommended");

  const filtered = useMemo(() => {
    const list = allTours.filter((t) => {
      if (region && destinationRegion(t.destinationSlug) !== region) return false;
      if (category && t.category !== category) return false;
      if (duration === "short" && t.nights > 7) return false;
      if (duration === "medium" && (t.nights < 8 || t.nights > 10)) return false;
      if (duration === "long" && t.nights < 11) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "nights-asc") return a.nights - b.nights;
      if (sort === "nights-desc") return b.nights - a.nights;
      if (sort === "rating") return realRating(b.slug) - realRating(a.slug);
      return 0;
    });
  }, [region, category, duration, sort]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <Select
          label="Region"
          value={region}
          onChange={(v) => setRegion(v as Region | "")}
          options={[{ value: "", label: "All Regions" }, ...regions.map((r) => ({ value: r, label: r }))]}
        />
        <Select
          label="Style"
          value={category}
          onChange={(v) => setCategory(v as TourCategory | "")}
          options={[{ value: "", label: "All Styles" }, ...categories.map((c) => ({ value: c, label: c }))]}
        />
        <Select label="Length" value={duration} onChange={(v) => setDuration(v as DurationKey)} options={durationOptions} />
        <Select label="Sort" value={sort} onChange={(v) => setSort(v as SortKey)} options={sortOptions} />
      </div>

      <p className="mb-8 text-center text-sm text-ink/70">
        {filtered.length} tour{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 3) * 90} variant="scale">
            <TourCard tour={t} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-ink/70">
          No tours match those filters yet — try widening your search.
        </p>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs">
      <span className="eyebrow uppercase text-ink/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
