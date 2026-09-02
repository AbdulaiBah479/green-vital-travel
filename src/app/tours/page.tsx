import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ToursGrid from "@/components/ToursGrid";
import { tours } from "@/lib/tours";

const description = `${tours.length} small-group and private tours across our destinations — filter by style, region, or length, or start from a specific place you already have in mind.`;

export const metadata: Metadata = {
  title: "Tours & Packages",
  description,
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Tours & Packages — Green Vital",
    description,
    url: "/tours",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours & Packages — Green Vital",
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
      </div>
    </main>
  );
}
