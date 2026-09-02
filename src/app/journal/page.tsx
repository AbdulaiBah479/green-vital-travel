import type { Metadata } from "next";
import { journalEntries } from "@/lib/journal";
import Reveal from "@/components/Reveal";
import JournalList from "@/components/JournalList";

const description =
  "Notes on how we plan, where we'd actually go, and what tailor-made travel should mean.";

export const metadata: Metadata = {
  title: "The Journal",
  description,
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "The Journal — Green Vital",
    description,
    url: "/journal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journal — Green Vital",
    description: description,
  },
};

export default function JournalPage() {
  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">
            The Journal
          </p>
          <h1 className="max-w-2xl text-balance font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Notes on planning, places, and the difference between the two.
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="hidden text-xs eyebrow uppercase text-ink/60 sm:block">
              Hover a title to preview
            </p>
            <a
              href="/journal/feed.xml"
              data-cursor-hover
              className="text-xs eyebrow uppercase text-ink/60 transition-colors hover:text-accent-deep"
            >
              RSS
            </a>
          </div>
        </Reveal>

        <div className="mt-16">
          <JournalList entries={journalEntries} />
        </div>
      </div>
    </main>
  );
}
