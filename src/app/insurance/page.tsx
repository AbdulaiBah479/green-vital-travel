import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const description =
  "What travel insurance actually covers, what it doesn't, and why it's a default line item on every itinerary rather than an upsell.";

export const metadata: Metadata = {
  title: "Travel Insurance",
  description,
  alternates: { canonical: "/insurance" },
  openGraph: { title: "Travel Insurance — Green Vital", description, url: "/insurance", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Travel Insurance — Green Vital",
    description: description,
  },
};

const tiers = [
  {
    name: "Essential",
    body: "Trip cancellation and interruption, plus baggage delay — the coverage that protects the money you've already committed.",
  },
  {
    name: "Comprehensive",
    body: "Essential, plus emergency medical coverage abroad and medical evacuation — the tier we recommend as the real default for international trips.",
  },
  {
    name: "Adventure",
    body: "Comprehensive, plus coverage for higher-risk activities named in your itinerary — trekking at altitude, diving, and similar.",
  },
];

export default function InsurancePage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1770196567087-b59ba06aef12.jpg"
          alt="A family walking hand in hand across a grassy hillside"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            Travel Insurance
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            The cheapest insurance against the most expensive surprise.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </Reveal>

        <Reveal className="mt-14 space-y-6 text-sm leading-relaxed text-ink/75">
          <p>
            Insurance earns a bad reputation because most people only think about it after something&rsquo;s
            gone wrong — which is exactly backwards. The best outcome for any policy is that you never
            need to make a claim.
          </p>
          <p>
            We build a recommendation into every itinerary as a default, not an add-on you have to ask
            about, and it can be added directly during booking. Read the fine print against your
            specific itinerary — not every policy covers every activity.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="rounded-3xl border border-ink/10 p-7">
                <p className="eyebrow text-xs uppercase text-accent-deep">{t.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 rounded-2xl border border-ink/10 bg-paper-dim p-6 text-xs leading-relaxed text-ink/70">
          Coverage tiers and pricing vary by provider, traveler age, trip cost, and destination. Our
          team will confirm exact terms and a quote alongside your itinerary — this page is a
          starting overview, not a policy document.
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Already Booking?</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Insurance is one of the add-ons in every reservation request.
          </h2>
          <Magnetic>
            <Link
              href="/tours"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Browse Tours
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
