import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const description =
  "For independent travel advisors and corporate travel partners — referral commissions, co-branded itineraries, and a single point of contact on our side.";

export const metadata: Metadata = {
  title: "Partners",
  description,
  alternates: { canonical: "/partners" },
  openGraph: { title: "Partners — Green Vital", description, url: "/partners", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Partners — Green Vital",
    description: description,
  },
};

const tracks = [
  {
    title: "Independent Travel Advisors",
    body: "Refer a client and stay in the loop throughout — commission paid on completed trips, and full credit for the referral, always.",
  },
  {
    title: "Corporate Travel Programs",
    body: "A standing arrangement for company offsites, incentive trips, and executive travel, with predictable turnaround and a dedicated account contact.",
  },
  {
    title: "Hospitality & Supplier Partners",
    body: "Camps, hotels, and guides interested in working with us directly — we vet in person, not from a listing page.",
  },
];

export default function PartnersPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1781861799305-d22ee4b22795.jpg"
          alt="Two travel partners reviewing a route together over a paper map"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">Partners</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            We work with people who already do this well.
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tracks.map((t, i) => (
            <Reveal key={t.title} delay={i * 100}>
              <div className="rounded-3xl border border-ink/10 p-7">
                <h2 className="font-serif text-xl text-ink">{t.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Get in Touch</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Tell us which track fits, and a bit about your business.
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
