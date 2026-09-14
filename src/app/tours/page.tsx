import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ToursGrid from "@/components/ToursGrid";
import { tours } from "@/lib/tours";

const description = `${tours.length} small-group and private tours across our destinations — filter by style or region, or start from a specific place you already have in mind. Not seeing it? We book any destination, globally.`;

export const metadata: Metadata = {
  title: "Tours & Packages",
  description,
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Tours & Packages — Greenvital",
    description,
    url: "/tours",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours & Packages — Greenvital",
    description: description,
  },
};

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; category?: string }>;
}) {
  const { region, category } = await searchParams;

  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            Tours &amp; Packages
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Curated small-group and private tours.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </Reveal>

        <div className="mt-14">
          <ToursGrid initialRegion={region} initialCategory={category} />
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Anywhere, Really</p>
          <h2 className="max-w-lg text-balance font-serif text-3xl leading-tight">
            This is a starting catalog, not the full range of what we book.
          </h2>
          <p className="max-w-md text-balance text-sm text-paper/70">
            If you already know where you&rsquo;re headed and it isn&rsquo;t listed here, tell us anyway — flights,
            hotels, and a custom itinerary, for any destination in the world.
          </p>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Plan My Trip
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
