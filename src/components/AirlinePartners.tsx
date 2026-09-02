import Image from "next/image";
import Reveal from "./Reveal";

// Real logos stored locally under public/airlines/. Ten were sourced from
// Wikimedia Commons (public-domain or trademark-tagged files meant for
// identification reuse); ASKY's was supplied directly by the site owner.
const airlines = [
  { name: "Brussels Airlines", logo: "/airlines/brussels.svg" },
  { name: "Air France", logo: "/airlines/air-france.svg" },
  { name: "KLM", logo: "/airlines/klm.svg" },
  { name: "Turkish Airlines", logo: "/airlines/turkish.svg" },
  { name: "British Airways", logo: "/airlines/british-airways.svg" },
  { name: "Kenya Airways", logo: "/airlines/kenya-airways.svg" },
  { name: "Ethiopian Airlines", logo: "/airlines/ethiopian.svg" },
  { name: "Royal Air Maroc", logo: "/airlines/royal-air-maroc.svg" },
  { name: "ASKY Airlines", logo: "/airlines/asky.png", wide: true },
  { name: "Air Côte d'Ivoire", logo: "/airlines/air-cote-divoire.png" },
  { name: "Qatar Airways", logo: "/airlines/qatar-airways.svg" },
  { name: "Emirates", logo: "/airlines/emirates.svg" },
];

export default function AirlinePartners() {
  return (
    <section className="bg-paper px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-2 text-center text-xs uppercase tracking-[0.22em] text-accent-deep">
            Airline Ticketing
          </p>
          <h2 className="text-balance text-center font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Partner Airlines
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/60">
            We&rsquo;re not limited to these carriers — as a full-service agency, we can ticket
            almost any airline serving your route.
          </p>
        </Reveal>

        <Reveal className="mt-12" variant="scale">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {airlines.map(({ name, logo, wide }) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center gap-3 text-center transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex h-28 w-full items-center justify-center rounded-xl bg-paper-dim/40 p-2">
                  <div className={`relative h-full w-full ${wide ? "scale-x-125" : ""}`}>
                    <Image src={logo} alt={name} fill className="object-contain" />
                  </div>
                </div>
                <span className="text-xs leading-snug text-ink/60">{name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
