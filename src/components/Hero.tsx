import SectionDivider from "./SectionDivider";
import HeroSearchForm from "./HeroSearchForm";
import HeroSlider from "./HeroSlider";

const headline = "Travel with confidence.";

const trustChips = [
  "Freetown, Sierra Leone",
  "Flights · Hotels · Visas · Tours",
  "Real support on WhatsApp",
];

export default function Hero() {
  const words = headline.split(" ");

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[880px] w-full items-center bg-ink sm:min-h-[750px]">
      <div className="absolute inset-0 overflow-hidden">
        <HeroSlider />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/62 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 sm:px-10 sm:pb-28">
        <div className="mb-5 flex flex-wrap gap-2 animate-[fadeIn_1s_ease_0.05s_both]">
          {trustChips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-paper/25 bg-paper/10 px-3.5 py-1.5 text-[11px] eyebrow uppercase text-paper/85 backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </div>

        <h1 className="max-w-2xl text-balance font-serif text-5xl font-medium leading-[1.05] text-paper sm:text-6xl md:text-7xl">
          {words.map((word, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
                <span
                  className="inline-block animate-word-in"
                  style={{ animationDelay: `${0.25 + i * 0.07}s` }}
                >
                  {word}
                </span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-paper/80 sm:text-lg animate-[fadeIn_1s_ease_0.7s_both]">
          We help clients travel seamlessly with a practical, people-first approach to
          air ticketing, visas, hotel bookings, and tailored holiday experiences.
        </p>
      </div>

      <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/50 sm:flex">
        <span className="text-[10px] eyebrow uppercase">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-paper/40" />
      </div>

      <SectionDivider fill="var(--paper)" />

      <div className="absolute inset-x-0 bottom-6 z-20 flex translate-y-1/4 justify-center px-6 sm:bottom-10 sm:px-10">
        <HeroSearchForm />
      </div>
    </section>
  );
}
