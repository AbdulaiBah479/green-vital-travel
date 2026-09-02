import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const description =
  "Flights, hotels, cruises, car hire, transfers, and insurance — arranged as part of your trip by our team, not booked blind through a search engine.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services — Green Vital", description, url: "/services", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Services — Green Vital",
    description: description,
  },
};

const services = [
  {
    title: "Flights",
    body: "We advise on routing, timing, and cabin choice, and can ticket on your behalf — factoring in the rest of your itinerary, not just the cheapest fare.",
    img: "https://images.unsplash.com/photo-1527605158555-853f200063e9?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "View of an airplane wing through the cabin window at sunset",
    icon: (
      <path d="M10 21v-6l8-5-1-3-9 3-4-3H2l2 5-2 1 1 2 4-1 4 6h1Z" />
    ),
  },
  {
    title: "Hotels & Villas",
    body: "Vetted directly, not pulled from a ranked listing page — the property has to earn a place in an itinerary, not just have availability.",
    img: "https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "An infinity pool overlooking a blue bay from a villa terrace",
    icon: <path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />,
  },
  {
    title: "Cruises & Small-Ship Sailing",
    body: "From a 24-guest expedition ship to a classic ocean liner — cabin category, itinerary, and shore excursions matched to how you actually want to travel.",
    img: "https://images.unsplash.com/photo-1636730740168-c94f3ab802e6?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "A small sailboat on calm open water, seen from above",
    icon: <path d="M3 18c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0M5 14l1-8h12l1 8M9 6V3h4v3" />,
  },
  {
    title: "Car Hire & Private Drivers",
    body: "Self-drive for open-road trips, or a private driver-guide where local roads, language, or logistics make that the better call.",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "A rental SUV parked on a desert road",
    icon: <path d="M5 17h-2v-6l2-5h12l2 5v6h-2M5 17a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0M5 17h10" />,
  },
  {
    title: "Airport & Private Transfers",
    body: "Booked as part of the itinerary, timed against real flight schedules — not a generic pickup window and a driver holding a sign.",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "A driver's hand on the steering wheel at dusk, city lights ahead",
    icon: <path d="M12 2 4 8v13h16V8l-8-6Zm0 6v7" />,
  },
  {
    title: "Travel Insurance",
    body: "A default line item on every itinerary, not an upsell — see our full explainer on what's actually worth covering.",
    img: "https://images.unsplash.com/photo-1614451558582-96f3c35d3e5f?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "A life ring mounted on a scenic waterside railing",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />,
  },
  {
    title: "Visa & Travel Documentation",
    body: "Requirements checked against your specific passport before you book, not after — with the paperwork prepared alongside the itinerary.",
    img: "https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?auto=format&fit=crop&w=1200&q=80",
    imgAlt: "An open passport showing pages of visa entry stamps",
    icon: <path d="M4 4h16v16H4z M8 9h8M8 13h5M8 17h3" />,
  },
];

export default function ServicesPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=2000&q=80"
          alt="Travel planning essentials — camera, compass, and journal laid out on a wooden table"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">Services</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Everything around the trip, handled too.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-xl text-balance text-center text-sm leading-relaxed text-ink/60">
            {description}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} variant="scale">
              <div
                id={s.title.toLowerCase().replace(/[^a-z]+/g, "-")}
                className="card-lift scroll-mt-36 overflow-hidden rounded-3xl border border-ink/10 lg:scroll-mt-52"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={s.img}
                    alt={s.imgAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-accent-deep shadow-md">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </svg>
                  </span>
                </div>
                <div className="p-7">
                  <h2 className="font-serif text-xl text-ink">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Bundled, Not Bolted On</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            These get arranged inside your itinerary, not sold separately.
          </h2>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              Talk to Our Team
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
