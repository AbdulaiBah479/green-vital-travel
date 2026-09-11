import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/TourCard";
import { activeDeal, tours } from "@/lib/tours";

const description =
  "Time-limited offers on a handful of tours — early-bird, seasonal, and last-minute pricing. Same trip, same team, a better number.";

export const metadata: Metadata = {
  title: "Deals & Offers",
  description,
  alternates: { canonical: "/deals" },
  openGraph: {
    title: "Deals & Offers — Greenvital",
    description,
    url: "/deals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deals & Offers — Greenvital",
    description: description,
  },
};

export default function DealsPage() {
  const deals = tours
    .filter((t) => !!activeDeal(t))
    .sort((a, b) => (activeDeal(b)?.percentOff ?? 0) - (activeDeal(a)?.percentOff ?? 0));

  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-2-deep">
            Deals &amp; Offers
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Fewer trips, better numbers.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </Reveal>

        {deals.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 90}>
                <div>
                  <TourCard tour={t} />
                  {activeDeal(t) && (
                    <p className="mt-3 text-center text-xs text-ink/70">
                      Offer ends{" "}
                      {new Date(activeDeal(t)!.endsIso).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-ink/70">
            No active offers right now — check back soon, or browse the full{" "}
            <Link href="/tours" className="text-accent-deep underline underline-offset-2">
              tour catalog
            </Link>
            .
          </p>
        )}
      </div>
    </main>
  );
}
