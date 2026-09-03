import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TourCard, { Stars } from "@/components/TourCard";
import TourItinerary from "@/components/TourItinerary";
import TourBookingSidebar from "@/components/TourBookingSidebar";
import WishlistButton from "@/components/WishlistButton";
import { tours, getTour } from "@/lib/tours";
import { getDestination } from "@/lib/destinations";
import { reviewsForTour, averageRating } from "@/lib/reviews";
import { siteUrl } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};

  return {
    title: t.title,
    description: t.summary,
    alternates: { canonical: `/tours/${t.slug}` },
    openGraph: {
      title: `${t.title} — Greenvital`,
      description: t.summary,
      url: `/tours/${t.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.title} — Greenvital`,
      description: t.summary,
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const destination = getDestination(tour.destinationSlug);
  const tourReviews = reviewsForTour(tour.slug);
  const hasReviews = tourReviews.length > 0;
  const rating = hasReviews ? averageRating(tourReviews) : 0;
  const related = tours.filter((t) => t.category === tour.category && t.slug !== tour.slug).slice(0, 3);
  const discounted = tour.deal ? tour.priceFrom * (1 - tour.deal.percentOff / 100) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: tour.summary,
    image: tour.heroImg,
    aggregateRating:
      tourReviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: rating.toFixed(1),
            reviewCount: tourReviews.length,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: discounted ?? tour.priceFrom,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/tours/${tour.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tours", item: "/tours" },
      { "@type": "ListItem", position: 2, name: tour.title, item: `/tours/${tour.slug}` },
    ],
  };

  return (
    <main className="pb-24 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="relative flex h-[55vh] min-h-[410px] w-full items-end overflow-hidden bg-ink">
        <Image src={tour.heroImg} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <WishlistButton slug={`tour:${tour.slug}`} className="absolute right-6 top-36 z-10 sm:right-10 lg:top-52" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            {tour.category} · {tour.nights} nights
            {destination && (
              <>
                {" "}
                ·{" "}
                <Link href={`/destinations/${destination.slug}`} className="underline underline-offset-2">
                  {destination.name}
                </Link>
              </>
            )}
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            {tour.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-paper/75">
            {hasReviews ? (
              <>
                <Stars rating={rating} />
                <span>{rating.toFixed(1)} ({tourReviews.length} reviews) · </span>
              </>
            ) : (
              <span className="eyebrow text-xs uppercase text-accent-soft">New · </span>
            )}
            <span>
              Up to {tour.groupSizeMax} travelers · {tour.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <p className="font-serif text-2xl italic leading-snug text-ink">{tour.summary}</p>
            </Reveal>

            <Reveal className="mt-10">
              <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Highlights</p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                    <span className="mt-0.5 shrink-0 text-accent-deep">✦</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {tour.gallery.length > 0 && (
              <Reveal className="mt-10 grid grid-cols-2 gap-4">
                {tour.gallery.map((img) => (
                  <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={img} alt={tour.title} fill sizes="50vw" className="object-cover" />
                  </div>
                ))}
              </Reveal>
            )}

            <Reveal className="mt-14">
              <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Day by Day</p>
              <TourItinerary stops={tour.itinerary} />
            </Reveal>

            <Reveal className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Included</p>
                <ul className="space-y-3 text-sm leading-relaxed text-ink/70">
                  {tour.included.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-accent-deep">✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-4 text-xs uppercase text-ink/70">Not Included</p>
                <ul className="space-y-3 text-sm leading-relaxed text-ink/70">
                  {tour.excluded.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-ink/70">–</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-xs uppercase text-accent-deep">
                  Reviews ({tourReviews.length})
                </p>
                <Link href="/reviews" className="text-xs eyebrow uppercase text-ink/70 hover:text-accent-deep">
                  All Reviews →
                </Link>
              </div>
              {tourReviews.length === 0 ? (
                <p className="mt-4 text-sm text-ink/70">No reviews yet for this specific tour.</p>
              ) : (
                <div className="mt-6 space-y-6">
                  {tourReviews.map((r) => (
                    <div key={r.id} className="border-t border-ink/10 pt-6">
                      <div className="flex items-center justify-between">
                        <Stars rating={r.rating} />
                        <span className="text-xs text-ink/70">{r.date}</span>
                      </div>
                      <p className="mt-2 font-serif text-lg text-ink">{r.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/70">{r.body}</p>
                      <p className="mt-2 text-xs eyebrow uppercase text-ink/70">
                        {r.name} · {r.location}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <div className="hidden lg:block">
            <TourBookingSidebar tour={tour} />
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <TourBookingSidebar tour={tour} />
        </div>

        {related.length > 0 && (
          <Reveal className="mt-20 border-t border-ink/10 pt-16">
            <p className="eyebrow mb-6 text-xs uppercase text-accent-deep">You Might Also Like</p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
