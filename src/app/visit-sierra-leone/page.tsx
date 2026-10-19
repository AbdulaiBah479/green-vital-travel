import type { Metadata } from "next";
import type { BreadcrumbList, FAQPage, ItemList, WithContext } from "schema-dts";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { getHubEntries } from "@/lib/journal";
import { servicePages } from "@/lib/servicePages";
import { jsonLdScript } from "@/lib/jsonLd";
import { siteUrl, contact } from "@/lib/site";

const description =
  "Plan a trip to Sierra Leone: guides to beaches, Bunce Island, Tiwai Island and more, plus visas, money, safety and tours arranged by a Freetown agency.";

export const metadata: Metadata = {
  title: "Visit Sierra Leone: Travel Guides & Planning",
  description,
  alternates: { canonical: "/visit-sierra-leone" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Visit Sierra Leone: Travel Guides & Planning — Green Vital",
    description,
    url: "/visit-sierra-leone",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Visit Sierra Leone: Travel Guides & Planning — Green Vital",
    description,
  },
};

const faqs = [
  {
    question: "When is the best time to visit Sierra Leone?",
    answer:
      "The dry season, roughly November to April, is the most popular time, with more reliable weather and easier travel by road and boat. The rainy season is greener and quieter but can disrupt transport.",
  },
  {
    question: "Do I need a visa to visit Sierra Leone?",
    answer:
      "It depends on the passport you hold. Requirements change, so confirm them with an official source such as the embassy or consulate before you book. Green Vital can guide you through the documents and steps.",
  },
  {
    question: "How do I get from the airport to Freetown?",
    answer:
      "The airport is at Lungi, across the estuary from the city. Most visitors take a water taxi, which takes roughly half an hour, with road transfers at each end. The public ferry is cheaper but slower, and the road around the estuary takes several hours.",
  },
  {
    question: "Which vaccinations do I need?",
    answer:
      "A yellow fever certificate is commonly required, and malaria is present in the country. Speak to a doctor or travel clinic well before you travel, and check the current rules for your route.",
  },
  {
    question: "What currency is used, and can I pay by card?",
    answer:
      "The currency is the leone. Cash is widely used, and card payments cannot be assumed outside larger hotels and some restaurants, so carry enough cash.",
  },
  {
    question: "Can Green Vital arrange my whole trip?",
    answer:
      "Yes. We are a Freetown-based agency that arranges flights, visas, hotels, airport pickups and the Lungi crossing, boat trips, car hire and guided tours, either as a package or built around your plans.",
  },
];

export default function VisitSierraLeonePage() {
  const guides = getHubEntries("visit-sierra-leone");

  const faqJsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Visit Sierra Leone", item: `${siteUrl}/visit-sierra-leone` },
    ],
  };

  const listJsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sierra Leone travel guides",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${siteUrl}/journal/${g.slug}`,
    })),
  };

  return (
    <main className="pb-24 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(listJsonLd) }} />

      <div className="relative flex h-[55vh] min-h-[420px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1611395813517-41f9be5e292d.jpg"
          alt="A palm-fringed beach on the Freetown Peninsula, Sierra Leone"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">Visit Sierra Leone</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Plan your trip to Sierra Leone with a team that lives here.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal className="space-y-6 text-sm leading-relaxed text-ink/75">
          <p>
            Sierra Leone offers long Atlantic beaches, rainforest and wildlife, and a deep history, and it is still
            far less crowded than better-known destinations. Green Vital is a travel agency in Freetown, so the
            guides below come from the people who arrange these trips day to day.
          </p>
          <p>
            Start with the guide that matches where you are in your planning, then tell us your dates and we will
            arrange flights, visas, hotels, transfers, boat crossings and guides in one booking.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <h2 className="eyebrow mb-6 text-xs uppercase text-accent-deep">Sierra Leone travel guides</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 4) * 80}>
              <Link
                href={`/journal/${g.slug}`}
                className="group block h-full rounded-3xl border border-ink/10 p-7 transition-colors hover:border-ink/30"
              >
                <p className="eyebrow text-[10px] uppercase text-accent-deep">{g.readTime}</p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-ink group-hover:text-accent-deep">
                  {g.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{g.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl px-6 sm:px-10">
        <h2 className="eyebrow mb-6 text-xs uppercase text-accent-deep">Common questions</h2>
        <dl className="space-y-4">
          {faqs.map((f) => (
            <Reveal key={f.question}>
              <div className="rounded-2xl border border-ink/10 p-6">
                <dt className="font-serif text-lg leading-snug text-ink">{f.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">{f.answer}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Ready to plan?</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Tell us when you want to travel and we will build the trip.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
              >
                WhatsApp us
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/tours"
                className="inline-block rounded-full border border-paper/30 px-8 py-4 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper"
              >
                Browse tours
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-14">
          <h2 className="eyebrow mb-4 text-xs uppercase text-accent-deep">Services we arrange</h2>
          <ul className="flex flex-wrap gap-3">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-block rounded-full border border-ink/15 px-5 py-2 text-xs text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/destinations"
                className="inline-block rounded-full border border-ink/15 px-5 py-2 text-xs text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
              >
                Destinations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
