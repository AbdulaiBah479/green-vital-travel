import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const description =
  "Family reunions, corporate retreats, and destination weddings — group logistics designed around the group's actual mix of ages, budgets, and energy levels.";

export const metadata: Metadata = {
  title: "Group & Corporate Travel from Freetown",
  description,
  alternates: { canonical: "/groups" },
  openGraph: {
    images: ["/opengraph-image"], title: "Group & Corporate Travel — Green Vital", description, url: "/groups", type: "website" },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Group & Corporate Travel — Green Vital",
    description: description,
  },
};

const categories = [
  {
    title: "Family Reunions",
    body: "Multi-generational trips designed around the group's actual mix of ages and energy levels — not one itinerary asking everyone to keep up.",
  },
  {
    title: "Corporate Retreats & Incentive Travel",
    body: "Offsites and incentive trips that don't feel like a conference with better scenery — private venues, team logistics, and a single point of contact throughout.",
  },
  {
    title: "Destination Weddings & Honeymoons",
    body: "From a 40-guest weekend to a two-person elopement — venue sourcing, guest room blocks, and a honeymoon that starts the moment the reception ends.",
  },
  {
    title: "Milestone Celebrations",
    body: "Anniversaries, big birthdays, graduation trips — built around the occasion, not a generic package with a cake added on.",
  },
];

export default function GroupsPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1506869640319-fe1a24fd76dc.jpg"
          alt="A group of friends celebrating together on a mountaintop at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            Group &amp; Corporate Travel
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Harder logistics. Better payoff.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="rounded-3xl border border-ink/10 p-7">
                <h2 className="font-serif text-xl text-ink">{c.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Get a Group Quote</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Tell us the group size and the occasion.
          </h2>
          <p className="max-w-md text-balance text-sm text-paper/70">
            Group trips get a dedicated consultant from the first call — usually within one business day.
          </p>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Start a Group Inquiry
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
