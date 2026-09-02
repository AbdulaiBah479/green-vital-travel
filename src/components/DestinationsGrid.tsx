"use client";

import { useMemo, useState } from "react";
import { destinations, regions, type Region } from "@/lib/destinations";
import Reveal from "./Reveal";
import DestinationCard from "./DestinationCard";

export default function DestinationsGrid({ initialRegion }: { initialRegion?: string }) {
  const validInitial = regions.find((r) => r === initialRegion) ?? null;
  const [activeRegion, setActiveRegion] = useState<Region | null>(validInitial);

  const filtered = useMemo(
    () => (activeRegion ? destinations.filter((d) => d.region === activeRegion) : destinations),
    [activeRegion]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveRegion(null)}
          className={pillClass(activeRegion === null)}
        >
          All Regions
        </button>
        {regions.map((r) => (
          <button key={r} type="button" onClick={() => setActiveRegion(r)} className={pillClass(activeRegion === r)}>
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => (
          <Reveal key={d.slug} delay={(i % 3) * 90} variant="scale">
            <DestinationCard destination={d} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-ink/50">No destinations in this region yet.</p>
      )}
    </div>
  );
}

function pillClass(active: boolean) {
  return `rounded-full border px-5 py-2 text-xs eyebrow uppercase transition-colors ${
    active ? "border-accent bg-accent/10 text-accent-deep" : "border-ink/15 text-ink/60 hover:border-accent"
  }`;
}
