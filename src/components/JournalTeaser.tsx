import Image from "next/image";
import Link from "next/link";
import { journalEntries } from "@/lib/journal";
import Reveal from "./Reveal";

export default function JournalTeaser() {
  const entries = journalEntries.slice(0, 3);

  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">
                From the Journal
              </p>
              <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
                Notes on planning, not just postcards.
              </h2>
            </div>
            <Link
              href="/journal"
              data-cursor-hover
              className="text-xs eyebrow uppercase text-ink/70 transition-colors hover:text-accent-deep"
            >
              Read the Journal →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {entries.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 100}>
              <Link href={`/journal/${entry.slug}`} data-cursor-hover className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={entry.img}
                    alt={entry.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs eyebrow uppercase text-accent-deep">
                  {entry.category} · {entry.readTime}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-accent-deep">
                  {entry.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
