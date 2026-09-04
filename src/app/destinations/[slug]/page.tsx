import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import WishlistButton from "@/components/WishlistButton";
import TourCard from "@/components/TourCard";
import { destinations, getDestination } from "@/lib/destinations";
import { toursForDestination } from "@/lib/tours";
import { jsonLdScript } from "@/lib/jsonLd";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};

  return {
    title: d.name,
    description: d.description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: `${d.name} — Greenvital`,
      description: d.description,
      url: `/destinations/${d.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${d.name} — Greenvital`,
      description: d.description,
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const tours = toursForDestination(d.slug);

  const destinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.description,
    image: `${siteUrl}${d.heroImg}`,
    url: `${siteUrl}/destinations/${d.slug}`,
    ...(d.country && {
      containedInPlace: {
        "@type": "Country",
        name: d.country,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Destinations", item: `${siteUrl}/destinations` },
      { "@type": "ListItem", position: 2, name: d.name, item: `${siteUrl}/destinations/${d.slug}` },
    ],
  };

  return (
    <main className="pb-24 sm:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(destinationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="relative flex h-[55vh] min-h-[410px] w-full items-end overflow-hidden bg-ink">
        <Image src={d.heroImg} alt={d.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <WishlistButton
          slug={`destination:${d.slug}`}
          label={d.name}
          className="absolute right-6 top-36 z-10 sm:right-10 lg:top-52"
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            {d.country} · {d.region}
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            {d.name}
          </h1>
          <p className="mt-3 max-w-xl text-balance text-paper/75">{d.hook}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="font-serif text-2xl italic leading-snug text-ink">{d.description}</p>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-2 gap-6 border-y border-ink/10 py-8 sm:grid-cols-4">
          <Fact label="Best Time" value={d.bestTime} />
          <Fact label="Currency" value={d.quickFacts.currency} />
          <Fact label="Language" value={d.quickFacts.language} />
          <Fact label="Getting There" value={d.quickFacts.flightNote} />
        </Reveal>

        <Reveal className="mt-14">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Top Experiences</p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {d.topExperiences.map((e) => (
              <li
                key={e}
                className="flex gap-3 rounded-2xl border border-ink/10 p-5 text-sm leading-relaxed text-ink/75"
              >
                <span className="mt-0.5 shrink-0 text-accent-deep">✦</span>
                {e}
              </li>
            ))}
          </ul>
        </Reveal>

        {d.gallery.length > 0 && (
          <Reveal className="mt-14 grid grid-cols-2 gap-4">
            {d.gallery.map((img) => (
              <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={img} alt={`${d.name} scenery`} fill sizes="50vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        )}

        {tours.length > 0 && (
          <Reveal className="mt-16">
            <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Tours Here</p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {tours.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Plan This Trip</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Not sure where to start in {d.name}?
          </h2>
          <Magnetic>
            <Link
              href="/planner"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Build a Draft Itinerary
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] eyebrow uppercase text-ink/70">{label}</p>
      <p className="mt-1 text-sm text-ink/80">{value}</p>
    </div>
  );
}
