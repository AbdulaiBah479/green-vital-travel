import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { founder } from "@/lib/site";

const description =
  "Meet the founder behind Greenvital's trips, and the local network of guides and partners the agency works with directly.";

export const metadata: Metadata = {
  title: "Our Team",
  description,
  alternates: { canonical: "/about/designers" },
  openGraph: { title: "Our Team — Greenvital", description, url: "/about/designers", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Our Team — Greenvital",
    description: description,
  },
};

const team = [
  {
    initials: "IB",
    name: founder.name,
    focus: founder.title,
    bio: "Founded Greenvital Travel and Tour Agency in Freetown to make booking a trip — flight, hotel, visa, and everything after — a conversation with one person instead of five separate errands. Still handles most enquiries personally.",
  },
];

export default function DesignersPage() {
  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">
            Our Team
          </p>
          <h1 className="max-w-2xl text-balance font-serif text-4xl leading-tight text-ink sm:text-5xl">
            A small, founder-led agency — and growing.
          </h1>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {team.map((d, i) => (
            <Reveal key={d.name} delay={i * 80}>
              <div className="flex gap-5">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg italic text-paper"
                  aria-hidden="true"
                >
                  {d.initials}
                </span>
                <div>
                  <p className="font-serif text-xl text-ink">{d.name}</p>
                  <p className="mt-1 text-xs eyebrow uppercase text-accent-deep">
                    {d.focus}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {d.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-16 max-w-2xl border-t border-ink/10 pt-10 text-sm leading-relaxed text-ink/70">
          <p>
            Behind every booking is also a network of hotels, airlines, guides,
            and drivers we work with directly across the destinations we
            serve — not an anonymous marketplace. As Greenvital grows, this
            page will grow with it.
          </p>
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Talk to the Team</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Ready to start planning? Reach out directly.
          </h2>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Start the Conversation
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
