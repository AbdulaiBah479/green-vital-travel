import Image from "next/image";
import Reveal from "./Reveal";
import CtaForm from "./CtaForm";

export default function Cta() {
  return (
    <section id="contact" className="relative scroll-mt-36 lg:scroll-mt-52 overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80"
        alt="Coastal cliffs at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />

      <Reveal className="relative mx-auto max-w-2xl text-center text-paper">
        <p className="eyebrow mb-6 text-xs uppercase text-accent-soft">
          Start Planning
        </p>
        <h2 className="text-balance font-serif text-4xl leading-tight sm:text-5xl">
          Your next journey begins with a single, honest conversation.
        </h2>
        <p className="mt-6 text-balance text-paper/75">
          No pressure, no obligation — just a real person on our team, and
          twenty minutes to understand what you&rsquo;re actually looking for.
        </p>

        <CtaForm />
      </Reveal>
    </section>
  );
}
