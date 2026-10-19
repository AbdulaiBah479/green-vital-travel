import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { founder, companyRegistration } from "@/lib/site";

const description =
  "Green Vital is a full-service travel agency in Freetown, Sierra Leone — flights, hotels, visas, and tours, handled by a real person, not a database.";

export const metadata: Metadata = {
  title: "About Us — Freetown Travel Agency",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Green Vital", description, url: "/about", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "About — Green Vital",
    description: description,
  },
};

export default function AboutPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1476514525535-07fb3b4ae5f1.jpg"
          alt="Mountain lake at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">About</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            A full-service travel agency, built from Freetown outward.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-ink/80">
            <p className="font-serif text-2xl italic leading-snug text-ink">
              Green Vital Travel and Tour Agency Limited was incorporated in{" "}
              {companyRegistration.jurisdiction} in {companyRegistration.incorporatedDate.split(" ").slice(1).join(" ")}, on a simple idea: one traveler
              should be able to reach one real person for everything a trip
              needs — the flight, the hotel, the visa, and the plan for the
              days in between.
            </p>
            <p>
              We&rsquo;re a small, founder-led agency, deliberately — built by{" "}
              {founder.name} to work the way a trip actually gets planned:
              directly, with someone who follows it from the first enquiry
              through the last day on the ground, not a rotating queue or an
              algorithm.
            </p>
            <p>
              We book flights, arrange hotels and visas, and sell ready-made
              package tours when that&rsquo;s what fits — and we design a fully
              custom itinerary when it doesn&rsquo;t. Explore, experience, enjoy:
              the parts of your trip we can&rsquo;t control, we plan carefully
              enough that they rarely go wrong.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-ink/10 pt-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">
            What Stays the Same
          </p>
          <ul className="space-y-4 text-sm leading-relaxed text-ink/70">
            <li>
              <strong className="text-ink">No commissions steering advice.</strong>{" "}
              Our fees are disclosed upfront — a hotel doesn&rsquo;t get
              recommended because it pays better.
            </li>
            <li>
              <strong className="text-ink">A named contact, not a queue.</strong>{" "}
              You reach the person who planned your trip, not a rotating
              support desk.
            </li>
            <li>
              <strong className="text-ink">A local network, not a platform.</strong>{" "}
              Every guide, driver, and partner is someone we&rsquo;ve worked with
              directly.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Ready When You Are</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Tell us where you&rsquo;re headed, and let&rsquo;s start planning.
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
