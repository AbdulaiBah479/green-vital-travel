import Link from "next/link";
import Reveal from "./Reveal";
import TourCard from "./TourCard";
import { tours } from "@/lib/tours";

const featuredSlugs = [
  "freetown-peninsula-beach-escape",
  "tiwai-island-rainforest-safari",
  "serengeti-great-migration-safari",
  "santorini-caldera-honeymoon-escape",
  "peru-machu-picchu-inca-trail",
  "maldives-overwater-luxury-retreat",
];

export default function FeaturedTours() {
  const featured = featuredSlugs
    .map((slug) => tours.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <section className="bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Tours &amp; Packages</p>
              <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
                Small-group and private, ready to book.
              </h2>
            </div>
            <Link
              href="/tours"
              data-cursor-hover
              className="text-xs eyebrow uppercase text-ink/70 transition-colors hover:text-accent-deep"
            >
              See All Tours →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 90} variant="scale">
              <TourCard tour={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
