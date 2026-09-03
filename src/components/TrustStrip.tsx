import Reveal from "./Reveal";

const items = [
  {
    title: "Registered in Sierra Leone",
    body: "Incorporated and registered with Sierra Leone's National Investment Board.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
    ),
  },
  {
    title: "24/7 In-Trip Support",
    body: "A real person, reachable, for the length of your journey.",
    icon: (
      <path d="M3 12a9 9 0 1 1 9 9M3 12h4m-4 0v4a2 2 0 0 0 2 2h2v-6H3Zm18 0h-4m4 0v4a2 2 0 0 1-2 2h-2v-6h4Z" />
    ),
  },
  {
    title: "No Hidden Fees",
    body: "One transparent fee — no commissions steering your itinerary.",
    icon: (
      <path d="m20.6 12.6-8-8A2 2 0 0 0 11.2 4H5a1 1 0 0 0-1 1v6.2a2 2 0 0 0 .6 1.4l8 8a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8ZM8 8h.01" />
    ),
  },
  {
    title: "Local, Not Outsourced",
    body: "Guides and drivers we've vetted and traveled with ourselves.",
    icon: (
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    ),
  },
  {
    title: "Verified Traveler Reviews",
    body: "Every review is tied to a real, completed booking — never bought or staged.",
    icon: <path d="m12 17.3-6.2 3.3 1.2-6.9L2 8.9l7-1L12 1.5l3 6.4 7 1-5 4.8 1.2 6.9Z" />,
  },
  {
    title: "Flexible, Deposit-Based Booking",
    body: "Reserve with a deposit, not full payment upfront — confirmed by a real person on our team before you're charged.",
    icon: <path d="M3 10h18M7 15h4M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
  },
  {
    title: "Pay by Card or Mobile Money",
    body: "Orange Money, Afrimoney, bank transfer, or card — pay the way that's actually convenient for you.",
    icon: <path d="M2 7h20M6 15h4M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />,
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-paper-dim px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-3 text-center text-xs uppercase text-accent-deep">
            Why Greenvital
          </p>
          <h2 className="mx-auto max-w-xl text-balance text-center font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Booked with confidence, not just hope.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-ink/8 bg-paper p-6 shadow-sm shadow-ink/5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-deep">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-serif text-lg text-ink">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
