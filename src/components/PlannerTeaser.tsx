import Link from "next/link";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function PlannerTeaser() {
  return (
    <section className="border-y border-line-dark bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <Reveal className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <p className="eyebrow text-xs uppercase text-accent-deep">
          The Trip Planner
        </p>
        <h2 className="max-w-2xl text-balance font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Or skip the quiz — build an actual day-by-day itinerary right now.
        </h2>
        <p className="max-w-xl text-balance text-sm leading-relaxed text-ink/70">
          Pick a place, a length, a pace, and what you care about. In under a
          minute you&rsquo;ll have a real draft itinerary, built from the same
          pieces our team uses — no email, no waiting on a call.
        </p>
        <Magnetic strength={0.2}>
          <Link
            href="/planner"
            className="inline-block rounded-full bg-ink px-8 py-4 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
          >
            Build My Itinerary
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
