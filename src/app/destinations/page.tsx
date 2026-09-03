import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import DestinationsGrid from "@/components/DestinationsGrid";
import { destinations } from "@/lib/destinations";

const description = `${destinations.length} places we design trips to, across every inhabited continent — pick one for the quick facts, top experiences, and the tours built around it.`;

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
      </div>
    </main>
  );
}
