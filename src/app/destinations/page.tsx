import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import DestinationsGrid from "@/components/DestinationsGrid";
import { destinations } from "@/lib/destinations";

const description = `${destinations.length} places we've already built trips around, across every inhabited continent — and a starting point, not the full list. If your destination isn't here, we can still book it.`;

export const metadata: Metadata = {
  title: "Destinations",
  description,
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Destinations — Greenvital",
    description,
    url: "/destinations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destinations — Greenvital",
    description: description,
  },
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;

  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            Everywhere We Go
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {destinations.length} places, across every inhabited continent.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </Reveal>

        <div className="mt-14">
          <DestinationsGrid initialRegion={region} />
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Not On This List?</p>
          <h2 className="max-w-lg text-balance font-serif text-3xl leading-tight">
            We book anywhere in the world — this is just where we&rsquo;ve started.
          </h2>
          <p className="max-w-md text-balance text-sm text-paper/70">
            These are the trips we&rsquo;ve already designed and can move on quickly. Tell us where you
            actually want to go, anywhere globally, and we&rsquo;ll build the itinerary from there.
          </p>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Tell Us Where
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
