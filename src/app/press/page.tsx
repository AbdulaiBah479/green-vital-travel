import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { contact, siteFullName } from "@/lib/site";

const description = `Press and media inquiries for ${siteFullName}.`;

export const metadata: Metadata = {
  title: "Press",
  description,
  alternates: { canonical: "/press" },
  openGraph: { title: "Press — Green Vital", description, url: "/press", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Press — Green Vital",
    description: description,
  },
};

export default function PressPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1781709246027-8c8f59aed2e8.jpg"
          alt="Silhouette of a photographer capturing a vast mountainous landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-16 sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">Press</p>
          <h1 className="max-w-xl text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Writing about Green Vital, or want to?
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/70">
            We&rsquo;re a small, founder-led agency and keep our press outreach the
            same way — direct, and case by case, rather than a standing media
            kit. If you&rsquo;re working on a story that involves us, reach out and
            you&rsquo;ll hear back from a person, usually within a couple of days.
          </p>
          <p className="mt-8 text-sm eyebrow uppercase text-ink/60">
            {contact.email}
          </p>
        </Reveal>
      </div>
    </main>
  );
}
