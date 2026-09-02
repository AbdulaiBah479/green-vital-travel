import Reveal from "./Reveal";
import { founder } from "@/lib/site";

export default function Philosophy() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-28 text-center sm:px-10 sm:py-36">
      <Reveal>
        <p className="eyebrow mb-6 text-xs uppercase text-accent-deep">
          Our Philosophy
        </p>
        <p className="text-balance font-serif text-3xl italic leading-snug text-ink sm:text-4xl md:text-5xl">
          &ldquo;One traveler should be able to reach one real person for everything a trip needs.&rdquo;
        </p>
        <p className="mt-8 text-sm uppercase eyebrow text-ink/60">
          {founder.name}, {founder.title}
        </p>
      </Reveal>
    </section>
  );
}
