import type { Metadata } from "next";
import type { BreadcrumbList, FAQPage, WithContext } from "schema-dts";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { servicePages } from "@/lib/servicePages";
import { jsonLdScript } from "@/lib/jsonLd";
import {
  siteUrl,
  siteFullName,
  contact,
  businessHours,
  googleBusinessUrl,
  googleReviewUrl,
  companyRegistration,
} from "@/lib/site";

const description =
  "Registered travel agency in Freetown, Sierra Leone: air tickets, Lungi ferry tickets, visas, hotels, car hire and tours. Visit us at Congo Cross.";

export const metadata: Metadata = {
  title: "Travel Agency in Freetown, Sierra Leone",
  description,
  alternates: { canonical: "/travel-agency-freetown" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Travel Agency in Freetown, Sierra Leone — Green Vital",
    description,
    url: "/travel-agency-freetown",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Travel Agency in Freetown, Sierra Leone — Green Vital",
    description,
  },
};

const questions = [
  {
    q: "Is the agency a registered company with a real office?",
    a: `Ask for the registration details and the address. ${siteFullName} is a registered ${companyRegistration.entityType.toLowerCase()} in Sierra Leone (registration number ${companyRegistration.registrationNumber}), with an office at ${contact.address.street}, ${contact.address.city}.`,
  },
  {
    q: "Will they check visa and entry rules before you pay?",
    a: "A good agency checks the rules for your specific passport first, and is honest that the embassy decides. We do that before you buy a ticket, and we never promise a visa approval.",
  },
  {
    q: "Is there a real person you can call or message?",
    a: `You should be able to reach a human quickly. You can call or WhatsApp us on ${contact.phones[1]}, email ${contact.email}, or visit us ${businessHours.label.toLowerCase()}.`,
  },
  {
    q: "Do they explain baggage, connections and change rules?",
    a: "The cheapest fare is not always the best one. We compare the whole journey with you: baggage allowance, connection time, change and refund rules, and the visa rules for every country on the route.",
  },
  {
    q: "Can they handle the Lungi airport crossing and your pickup?",
    a: "The airport is at Lungi, across the estuary from Freetown, so most journeys include a water crossing. We plan the crossing and the road transfers around your real flight times.",
  },
  {
    q: "Are prices and conditions explained clearly?",
    a: "Prices depend on dates, routes and availability, so a real person should quote them directly and explain what is and is not included. That is how we work: we quote you directly once we know your plans.",
  },
  {
    q: "Can you read what other customers say?",
    a: "Look for independent, public reviews. Ours are on Google, where anyone can read them.",
  },
];

const faqs = [
  {
    question: "Where is Green Vital's office in Freetown?",
    answer: `${contact.address.street}, ${contact.address.city}, ${contact.address.country}. We are open ${businessHours.label.toLowerCase()}.`,
  },
  {
    question: "What does a travel agency in Freetown do?",
    answer:
      "We arrange the practical side of travel: air tickets, boat tickets and the Lungi crossing, visa assistance, hotel bookings, car rental, airport transfers, tour packages and travel insurance, so you deal with one team instead of several.",
  },
  {
    question: "Can you book flights for any airline?",
    answer:
      "We ticket almost any airline serving your route, including major carriers such as Brussels Airlines, Air France, KLM, Turkish Airlines, British Airways, Kenya Airways, Ethiopian Airlines, Royal Air Maroc, ASKY, Air Côte d'Ivoire, Qatar Airways and Emirates.",
  },
  {
    question: "Do you help with visas?",
    answer:
      "Yes. We guide you through the documents and steps for key destinations and check the rules for your passport before you book. The final decision always belongs to the embassy or consulate, so we cannot guarantee approval.",
  },
  {
    question: "How do I contact Green Vital?",
    answer: `Call or WhatsApp ${contact.phones.join(" or ")}, email ${contact.email}, or visit us at ${contact.address.street}, ${contact.address.city}.`,
  },
  {
    question: "Do you serve people outside Freetown?",
    answer:
      "Yes. We help travellers across Sierra Leone and Sierra Leoneans abroad who are flying home, and we arrange pickups at Lungi and transfers to the peninsula and beyond.",
  },
];

export default function TravelAgencyFreetownPage() {
  const url = `${siteUrl}/travel-agency-freetown`;

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
      { "@type": "ListItem", position: 2, name: "Travel agency in Freetown", item: url },
    ],
  };

  return (
    <main className="pb-24 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />

      <div className="relative flex h-[50vh] min-h-[440px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1504609773096-104ff2c73ba4.jpg"
          alt="Travel planning essentials: camera, compass and journal on a wooden table"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">Freetown, Sierra Leone</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            A travel agency in Freetown that answers when you call.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal className="space-y-6 text-sm leading-relaxed text-ink/75">
          <p>
            {siteFullName} is a registered travel agency at {contact.address.street}, {contact.address.city}. We arrange
            air and boat tickets, visa assistance, hotels, car rental, airport transfers, tour packages and travel
            insurance, for people travelling from Sierra Leone and for Sierra Leoneans flying home.
          </p>
          <p>
            Every booking is handled by a real person who stays in touch from your first message to your return.
            Visit us {businessHours.label.toLowerCase()}, call or WhatsApp {contact.phones[1]}, or message us anytime.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-6 sm:px-10">
        <h2 className="eyebrow mb-6 text-xs uppercase text-accent-deep">What we arrange</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="block h-full rounded-2xl border border-ink/10 p-5 text-sm text-ink transition-colors hover:border-ink/30"
              >
                <span className="font-serif text-lg">{s.name}</span>
                <span className="mt-1 block text-xs text-ink/60">{s.h1}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/tours"
              className="block h-full rounded-2xl border border-ink/10 p-5 text-sm text-ink transition-colors hover:border-ink/30"
            >
              <span className="font-serif text-lg">Tour packages</span>
              <span className="mt-1 block text-xs text-ink/60">Ready-made trips and custom itineraries</span>
            </Link>
          </li>
          <li>
            <Link
              href="/insurance"
              className="block h-full rounded-2xl border border-ink/10 p-5 text-sm text-ink transition-colors hover:border-ink/30"
            >
              <span className="font-serif text-lg">Travel insurance</span>
              <span className="mt-1 block text-xs text-ink/60">Cover for cancellations, delays and medical care</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-16 max-w-2xl px-6 sm:px-10">
        <h2 className="eyebrow mb-3 text-xs uppercase text-accent-deep">How to choose a travel agency in Freetown</h2>
        <p className="mb-8 text-sm leading-relaxed text-ink/70">
          Seven questions worth asking any agency, ours included, and our honest answers.
        </p>
        <ol className="space-y-5">
          {questions.map((item, i) => (
            <Reveal key={item.q}>
              <li className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-serif text-lg leading-snug text-ink">
                  {i + 1}. {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.a}</p>
              </li>
            </Reveal>
          ))}
        </ol>
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
          <p className="eyebrow text-xs uppercase text-accent-soft">Visit or message us</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            {contact.address.street}, {contact.address.city}
          </h2>
          <p className="text-sm text-paper/70">
            {businessHours.label} · {contact.phones[1]} · {contact.email}
          </p>
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
              <a
                href={googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-paper/30 px-8 py-4 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper"
              >
                Read our Google reviews
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-paper/30 px-8 py-4 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper"
              >
                Leave a review
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-xs text-ink/60">
          Planning to visit Sierra Leone?{" "}
          <Link href="/visit-sierra-leone" className="underline underline-offset-4 hover:text-ink">
            Read our travel guides
          </Link>{" "}
          or{" "}
          <Link href="/visit-sierra-leone/quiz" className="underline underline-offset-4 hover:text-ink">
            take the one-minute trip quiz
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
