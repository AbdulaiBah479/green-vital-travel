import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Tell us your story",
    body: "A conversation, not a questionnaire. We learn how you actually like to travel — pace, comfort, curiosity, budget.",
  },
  {
    number: "02",
    title: "We compose the route",
    body: "Our team drafts a private itinerary, working with a small network of guides, hotels, and drivers we trust.",
  },
  {
    number: "03",
    title: "You simply arrive",
    body: "Every reservation, transfer, and quiet recommendation is handled before you land. We stay reachable throughout.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-36 lg:scroll-mt-52 bg-ink px-6 py-24 text-paper sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            How It Works
          </p>
          <h2 className="mb-16 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            Three steps between here and somewhere better.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 150} variant="scale">
              <div className="border-t border-paper/15 pt-8">
                <span className="font-serif text-sm italic text-accent-soft">
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
