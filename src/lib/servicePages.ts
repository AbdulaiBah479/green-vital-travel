// Search-intent landing pages for each core service, rendered by
// app/services/[slug]/page.tsx. Copy sticks to what the agency actually
// does (see content/services) and deliberately avoids prices, visa rules,
// routes or schedules, which change and are quoted by a consultant.

export type ServiceFaq = { question: string; answer: string };

export type ServicePage = {
  slug: string;
  /** Short name used in breadcrumbs and cross-links. */
  name: string;
  /** <title> (the layout template appends " — Green Vital"). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroImg: string;
  heroAlt: string;
  intro: string[];
  points: { title: string; body: string }[];
  faqs: ServiceFaq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "air-tickets-freetown",
    name: "Air Tickets",
    metaTitle: "Air Tickets & Flights in Freetown, Sierra Leone",
    metaDescription:
      "Book flights from Sierra Leone with a Freetown travel agency. Tickets on almost any airline, routing advice and visa checks before you pay.",
    h1: "Air tickets and flight booking in Freetown",
    eyebrow: "Air Ticketing · Sierra Leone",
    heroImg: "/images/unsplash/1527605158555-853f200063e9.jpg",
    heroAlt: "View of an airplane wing through the cabin window at sunset",
    intro: [
      "Green Vital is a travel agency in Freetown that books air tickets for travelers leaving Sierra Leone, whether it is a single return ticket to visit family, a business trip or a multi-stop journey across several countries.",
      "We work with major carriers, including Brussels Airlines, Air France, KLM, Turkish Airlines, British Airways, Kenya Airways, Ethiopian Airlines, Royal Air Maroc, ASKY, Air Côte d'Ivoire, Qatar Airways and Emirates, and can ticket almost any airline that serves your route.",
      "The cheapest fare is not always the best one. We look at connection times, baggage allowance, change and refund rules and whether your passport and visa situation actually works for the route before you pay.",
    ],
    points: [
      {
        title: "Routing and timing advice",
        body: "We explain the real trade-offs between a shorter journey, a cheaper fare and a safer connection, so you choose with the full picture.",
      },
      {
        title: "Visa and entry checks first",
        body: "Many transit and destination countries have requirements that depend on your passport. We flag these before you buy a ticket, not at the airport.",
      },
      {
        title: "One team for the whole trip",
        body: "Add your hotel, airport transfer, Lungi crossing and travel insurance to the same booking, with one person to call if plans change.",
      },
      {
        title: "Changes and cancellations",
        body: "Fare rules differ widely. We tell you plainly what is refundable or changeable before you commit.",
      },
    ],
    faqs: [
      {
        question: "How do I book a flight from Sierra Leone with Green Vital?",
        answer:
          "Tell us your dates, destination and the passport you travel on by phone, WhatsApp or through our contact form. A consultant will come back with options and explain the rules of each fare before you decide.",
      },
      {
        question: "Can you book airlines that are not on your partner list?",
        answer:
          "Yes. The airlines we show are the ones we ticket most often, but as a full-service agency we can ticket almost any airline serving your route.",
      },
      {
        question: "Can you help with a ticket and a visa together?",
        answer:
          "Yes. We check entry requirements for your passport before you buy, and can support the documentation and application steps for key destinations.",
      },
      {
        question: "Can I add a hotel and an airport transfer to my flight?",
        answer:
          "Yes. Hotels, transfers, the Lungi airport crossing and travel insurance can be arranged as part of the same itinerary.",
      },
    ],
  },
  {
    slug: "lungi-ferry-and-boat-tickets",
    name: "Lungi Ferry & Boat Tickets",
    metaTitle: "Lungi Airport Ferry & Boat Tickets in Freetown",
    metaDescription:
      "Boat, water taxi and ferry tickets in Sierra Leone, including the Freetown to Lungi airport crossing, timed to your flight. Book with Green Vital in Freetown.",
    h1: "Boat, ferry and Lungi airport crossing tickets",
    eyebrow: "Boat Ticketing · Sierra Leone",
    heroImg: "/images/services/boat-ticketing.jpg",
    heroAlt: "A small passenger water taxi crossing the harbor",
    intro: [
      "Freetown International Airport is at Lungi, on the other side of the estuary from Freetown, so most travelers need a water crossing as well as a flight. Planned badly, that crossing is where a trip gets stressful.",
      "Green Vital books water taxi and ferry tickets across the peninsula and out to the islands, including the Lungi airport crossing, and times it against your actual flight instead of leaving it to chance at the jetty.",
      "If you are arriving or departing, tell us your flight details and we will plan the crossing, and the ride to or from the terminal, as part of one booking.",
    ],
    points: [
      {
        title: "Timed against your flight",
        body: "We plan the crossing backwards from your departure or forwards from your landing, with buffer for the transfer and check-in.",
      },
      {
        title: "Islands and peninsula routes",
        body: "Boat tickets for trips beyond the airport crossing, such as island and coastal journeys connected to our tour packages.",
      },
      {
        title: "Combine with a transfer",
        body: "Add a pickup in Freetown or a driver on the Lungi side, so the whole journey between your door and the airport is arranged.",
      },
    ],
    faqs: [
      {
        question: "How do I get from Freetown to the airport at Lungi?",
        answer:
          "The airport is across the estuary from the city. The usual choice for visitors is a water taxi, which takes roughly half an hour; the public ferry is cheaper but slower, and driving around via Port Loko takes about three to four hours. Green Vital can arrange the crossing and the road transfers together and time them to your flight.",
      },
      {
        question: "Can you book the Lungi crossing before I land?",
        answer:
          "Yes. Send us your flight details and we will arrange the crossing and a transfer in advance.",
      },
      {
        question: "Do you sell boat tickets for the islands?",
        answer:
          "Yes. We arrange water taxi and ferry tickets across the peninsula and out to the islands. Ask us for the trip you have in mind.",
      },
      {
        question: "How long does the crossing take?",
        answer:
          "By water taxi it is roughly 30 minutes, plus time for the road transfers and boarding at each end. The public ferry is slower and can be delayed, which is why we plan the whole journey backwards from your flight.",
      },
      {
        question: "Are schedules and fares fixed?",
        answer:
          "Operators and conditions can change, so we confirm the current options and cost with you at the time of booking.",
      },
    ],
  },
  {
    slug: "visa-assistance-sierra-leone",
    name: "Visa Assistance",
    metaTitle: "Visa Assistance in Sierra Leone",
    metaDescription:
      "Visa and travel documents support from a Freetown travel agency. We check entry requirements for your passport before you book.",
    h1: "Visa assistance and travel documentation in Sierra Leone",
    eyebrow: "Visa Assistance · Sierra Leone",
    heroImg: "/images/unsplash/1581553673739-c4906b5d0de8.jpg",
    heroAlt: "An open passport showing pages of visa entry stamps",
    intro: [
      "Visa and entry rules depend on the passport you travel on, the country you are going to and sometimes the countries you pass through. They also change, sometimes with little notice.",
      "Green Vital provides clear, guided support through the documentation and application steps for key destinations. We check requirements against your specific passport before you book, so you do not find out at the airport.",
      "We are a travel agency, not a government office. The final decision on any visa always rests with the destination country, and we will tell you plainly what we know and what you should confirm with the embassy or consulate.",
    ],
    points: [
      {
        title: "Requirements checked before you book",
        body: "We look at passport validity, whether a visa is needed in advance and any transit rules before you commit to a ticket.",
      },
      {
        title: "Guided application steps",
        body: "We explain which documents are usually needed and help you prepare them alongside your itinerary.",
      },
      {
        title: "Honest about limits",
        body: "We cannot guarantee approval. We will say when something needs to be confirmed directly with the embassy or consulate.",
      },
    ],
    faqs: [
      {
        question: "Can Green Vital get me a visa?",
        answer:
          "We guide you through the documents and application steps for key destinations. Approval is always decided by the destination country's authorities, so we cannot guarantee it.",
      },
      {
        question: "What do I need to start?",
        answer:
          "Your destination, planned travel dates and the passport you will travel on. Tell us about any earlier refusals too, since they can matter.",
      },
      {
        question: "Should I buy my ticket before the visa is approved?",
        answer:
          "It depends on the destination and the fare rules. Speak to us before you pay so we can advise on the safest order of steps.",
      },
      {
        question: "Where do I confirm the official requirements?",
        answer:
          "Always with the destination country's embassy or consulate, or its official government website. We flag what we know, but that is the authoritative source.",
      },
    ],
  },
  {
    slug: "hotel-booking-sierra-leone",
    name: "Hotel Bookings",
    metaTitle: "Hotel Bookings in Sierra Leone and Worldwide",
    metaDescription:
      "Hotel and villa bookings in Freetown, across Sierra Leone and abroad. Stays chosen to fit your itinerary and budget by a Freetown travel agency. Ask Green Vital.",
    h1: "Hotel and villa bookings in Sierra Leone and abroad",
    eyebrow: "Hotel Bookings · Sierra Leone",
    heroImg: "/images/unsplash/1543489822-c49534f3271f.jpg",
    heroAlt: "An infinity pool overlooking a blue bay from a villa terrace",
    intro: [
      "Whether you need a base in Freetown for a business trip, a beach stay on the peninsula or a hotel at the other end of a long flight, Green Vital books comfortable stays chosen to fit your itinerary, destination and budget.",
      "We pick properties on how well they work for your trip, not only on who has availability. That includes location, the journey from the airport and what is realistically close by.",
    ],
    points: [
      {
        title: "Matched to the itinerary",
        body: "Location, transfer time and the trip's pace all affect which hotel is right, so we decide with the whole plan in view.",
      },
      {
        title: "Local and international",
        body: "Stays in Freetown and around Sierra Leone, and on the destinations in our tour packages and custom itineraries.",
      },
      {
        title: "Booked with the rest",
        body: "Add flights, transfers, the Lungi crossing and insurance to the same booking and one point of contact.",
      },
    ],
    faqs: [
      {
        question: "Can you book a hotel in Freetown for me?",
        answer:
          "Yes. Tell us your dates, budget and what matters most, such as location, beach access or business facilities, and we will suggest options.",
      },
      {
        question: "Do you book hotels outside Sierra Leone?",
        answer:
          "Yes. We book hotels and villas for destinations worldwide, either on their own or as part of a tour or custom itinerary.",
      },
      {
        question: "Can you arrange a pickup from the airport to the hotel?",
        answer:
          "Yes. Airport transfers and the Lungi crossing can be arranged with the hotel booking.",
      },
      {
        question: "How do I get a price?",
        answer:
          "Prices depend on dates and availability, so a consultant quotes them directly once your details are known.",
      },
    ],
  },
  {
    slug: "car-rental-freetown",
    name: "Car Rentals",
    metaTitle: "Car Rental & Private Drivers in Freetown",
    metaDescription:
      "Self-drive car rental and private drivers in Freetown and across Sierra Leone for business and private trips. Arrange it with Green Vital, a Freetown travel agency.",
    h1: "Car rental and private drivers in Freetown",
    eyebrow: "Car Rentals · Sierra Leone",
    heroImg: "/images/unsplash/1533473359331-0135ef1b58bf.jpg",
    heroAlt: "A rental SUV parked on a desert road",
    intro: [
      "Green Vital arranges car rentals for business trips and private journeys, in Freetown and beyond. You can choose self-drive for open-road trips, or a private driver where local roads, language or logistics make that the better call.",
      "A vehicle is easiest to arrange as part of the wider plan. We can match it to your flight arrival, hotel and any day trips, so you are not working it out on the ground.",
    ],
    points: [
      {
        title: "Self-drive or driver",
        body: "Pick the option that suits the roads, distances and how comfortable you are driving in unfamiliar conditions.",
      },
      {
        title: "Business and private use",
        body: "Meetings in the city, a family visit upcountry or a weekend on the coast: tell us the plan and we will suggest what works.",
      },
      {
        title: "Linked to your itinerary",
        body: "Pickup times follow your actual arrival and departure, with transfers and hotels arranged alongside.",
      },
    ],
    faqs: [
      {
        question: "Can I rent a car in Freetown through Green Vital?",
        answer:
          "Yes. We arrange self-drive and private-driver options for business and private trips. Contact us with your dates and plans.",
      },
      {
        question: "Is it better to hire a driver or drive myself?",
        answer:
          "It depends on your route, experience with local roads and how much time you want to spend navigating. We will give you a straight recommendation for your trip.",
      },
      {
        question: "Can the car meet me at the airport?",
        answer:
          "We can arrange a pickup timed to your flight, together with the Lungi crossing if you need it.",
      },
      {
        question: "What will it cost?",
        answer:
          "Cost depends on the vehicle, duration and whether you want a driver. A consultant quotes it directly once the details are known.",
      },
    ],
  },
  {
    slug: "airport-transfers-freetown",
    name: "Airport Transfers",
    metaTitle: "Airport Transfers in Freetown & Lungi",
    metaDescription:
      "Airport transfers in Freetown and Lungi booked around your real flight times, with the ferry crossing arranged too. Reliable pickups from Green Vital, Freetown.",
    h1: "Airport transfers in Freetown and Lungi",
    eyebrow: "Airport Transfers · Sierra Leone",
    heroImg: "/images/services/airport-transfers.jpg",
    heroAlt: "The passenger drop-off zone outside an airport terminal, with cars at the curb",
    intro: [
      "An airport transfer should be timed against your flight, not a generic pickup window with a driver holding a sign. Green Vital books transfers as part of the itinerary and plans them around your real arrival and departure times.",
      "Because the airport at Lungi is across the estuary from Freetown, we can arrange the water crossing and the road transfers at each end as a single connected plan.",
    ],
    points: [
      {
        title: "Planned around your flight",
        body: "Send your flight number and times. We allow for the crossing, check-in and possible delays.",
      },
      {
        title: "Crossing included in the plan",
        body: "Road transfer, boat crossing and the ride to your hotel or home, arranged together.",
      },
      {
        title: "Groups and families",
        body: "Tell us how many people and how much luggage, and we will arrange a vehicle that fits.",
      },
    ],
    faqs: [
      {
        question: "Can you pick me up when I arrive in Sierra Leone?",
        answer:
          "Yes. Share your flight details and where you are going, and we will arrange the pickup and the crossing in advance.",
      },
      {
        question: "What if my flight is delayed?",
        answer:
          "Let us know as soon as you can and we will work with the driver to adjust the pickup. Planning around the real flight time is the point of booking with us.",
      },
      {
        question: "Can you arrange a transfer for a group?",
        answer:
          "Yes. Tell us the group size and luggage so we can arrange suitable vehicles.",
      },
      {
        question: "Can a transfer be added to a tour or hotel booking?",
        answer:
          "Yes. Transfers are normally booked as part of your itinerary alongside flights, hotels and the Lungi crossing.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}
