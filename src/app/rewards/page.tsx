import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { founder } from "@/lib/site";

const description =
  "Three tiers, earned by traveling with us — faster replies, complimentary upgrades, and a few things money can't usually buy.";

export const metadata: Metadata = {
  title: "Rewards",
  description,
  alternates: { canonical: "/rewards" },
  openGraph: { title: "Rewards — Green Vital", description, url: "/rewards", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Rewards — Green Vital",
    description: description,
  },
};

const tiers = [
  {
    name: "Explorer",
    threshold: "Your first trip with us",
    perks: [
      "Priority reply from our team",
      "A welcome note with regional reading picks",
      "Early access to new destination launches",
    ],
  },
  {
    name: "Voyager",
    threshold: "3 trips, or 30+ nights traveled",
    perks: [
      "Everything in Explorer",
      "One complimentary room or cabin upgrade per trip, when available",
      "A dedicated planning-fee credit toward your next trip",
      "Priority booking during high-demand seasons",
    ],
  },
  {
    name: "Globetrotter",
    threshold: "6+ trips, or 75+ nights traveled",
    perks: [
      "Everything in Voyager",
      `A direct WhatsApp line to ${founder.name}, our founder, for total redundancy`,
      "Invitations to small in-person and virtual traveler events",
      "First call on newly opened camps, ships, and properties",
    ],
  },
];

export default function RewardsPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1766928100326-d5d77f98f71b.jpg"
          alt="A couple watching the sunset over the water from a terrace"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">Rewards</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            The more you travel with us, the less you have to ask for.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-xl text-balance text-center text-sm leading-relaxed text-ink/60">
            {description}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-3xl border border-ink/10 p-7">
                <p className="eyebrow text-xs uppercase text-accent-deep">{tier.name}</p>
                <p className="mt-2 text-xs text-ink/50">{tier.threshold}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm leading-relaxed text-ink/70">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-0.5 shrink-0 text-accent-2-deep">✦</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">No Sign-Up Needed</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Your tier tracks automatically from your booking history.
          </h2>
          <p className="max-w-md text-balance text-sm text-paper/70">
            Ask our team where you stand at any point — there&rsquo;s no app, no card, and no points to
            let expire.
          </p>
          <Magnetic>
            <Link
              href="/tours"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Start Your First Trip
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
