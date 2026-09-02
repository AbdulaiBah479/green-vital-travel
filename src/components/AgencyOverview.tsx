import Image from "next/image";

const serviceCards = [
  {
    title: "Air Ticketing",
    description: "Flight bookings and travel planning designed around schedules, budgets, and personal preferences.",
    image: "/images/unsplash/1436491865332-7a61a109cc05.jpg",
    alt: "Airplane wing above the clouds",
  },
  {
    title: "Car Rentals",
    description: "Flexible airport transfers and self-drive options for business trips and private journeys.",
    image: "/images/unsplash/1533473359331-0135ef1b58bf.jpg",
    alt: "Rental SUV parked on a desert road",
  },
  {
    title: "Visa Assistance",
    description: "Clear, guided support through documentation and application steps for key destinations.",
    image: "/images/unsplash/1581553673739-c4906b5d0de8.jpg",
    alt: "Open passport with visa stamps",
  },
  {
    title: "Holiday Packages",
    description: "Curated travel packages that balance timing, comfort, and value for each traveler.",
    image: "/images/unsplash/1625001071825-0a85373c8972.jpg",
    alt: "Banana Islands, Sierra Leone",
  },
  {
    title: "Hotel Bookings",
    description: "Comfortable stays chosen to fit your itinerary, destination, and budget.",
    image: "/images/unsplash/1566073771259-6a8506099945.jpg",
    alt: "Beachfront hotel resort with pool",
  },
  {
    title: "Travel Insurance",
    description: "Practical protection for smoother, more confident travel planning.",
    image: "/images/unsplash/1614451558582-96f3c35d3e5f.jpg",
    alt: "Life ring mounted on a scenic waterside railing",
  },
];

const values = [
  {
    title: "Vision Statement",
    text: "To be Sierra Leone's most dependable travel agency — the first call for anyone planning a trip, near or far.",
  },
  {
    title: "Mission Statement",
    text: "To offer total travel solutions to clients by listening to them and exceeding their expectations.",
  },
  {
    title: "Core Values",
    text: "Customer Satisfaction · Cost Efficiency and Effectiveness · Commitment to Excellence",
  },
];

export default function AgencyOverview() {
  return (
    <section className="bg-paper px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 rounded-3xl border border-ink/10 bg-paper-dim/60 p-8 sm:p-10">
          <p className="eyebrow mb-6 text-xs uppercase tracking-[0.22em] text-accent-deep">Based in Freetown</p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm text-ink/75">
              Sierra Leone
            </span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4 text-xs uppercase tracking-[0.22em] text-accent-deep">About Us</p>
            <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              One traveler, one real person, from the first enquiry to the last day on the ground.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70">
              Green Vital Travel and Tour Agency started in Freetown with a simple idea: booking a trip
              shouldn&rsquo;t mean juggling five different errands with five different people. We&rsquo;ve grown
              through operational discipline, a strong client-first mindset, and a long-term view of what
              dependable travel support should look like.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70">
              From our Freetown office, we support travelers and businesses across Sierra Leone with
              flights, hotels, visas, and tours — handled personally, not routed through a call center.
            </p>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-ink p-8 text-paper shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <p className="eyebrow mb-4 text-xs uppercase tracking-[0.22em] text-accent-soft">An experience that travels with you</p>
            <p className="text-lg leading-relaxed text-paper/75">
              As a travel agency, we have just one important question: how can we help you travel seamlessly and create an experience that travels with you?
            </p>
            <p className="mt-5 text-sm leading-relaxed text-paper/60">
              As a newly registered agency, we&rsquo;re focused on smooth journeys, clear communication, and dependable execution from first inquiry to final arrival.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <p className="eyebrow mb-8 text-xs uppercase tracking-[0.22em] text-accent-deep">Our Services</p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service) => (
              <div
                key={service.title}
                className="overflow-hidden rounded-3xl border border-ink/10 bg-paper-dim/60 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-ink/10 bg-paper-dim/70 p-6">
              <p className="eyebrow mb-4 text-xs uppercase tracking-[0.22em] text-accent-deep">{value.title}</p>
              <p className="text-lg leading-relaxed text-ink/80">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
