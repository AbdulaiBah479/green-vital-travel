export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  isoDate: string;
  img: string;
  content: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "why-we-stopped-recommending-top-ten-lists",
    title: "Why We Stopped Recommending “Top 10” Lists",
    excerpt:
      "The best itinerary for a place is rarely the one everyone else is holding at the same viewpoint, at the same hour.",
    category: "Philosophy",
    readTime: "6 min read",
    date: "March 2026",
    isoDate: "2026-03-04",
    img: "/images/unsplash/1488646953014-85cb44e25828.jpg",
    content: [
      "Every guidebook eventually converges on the same ten photographs. That convergence isn't an accident — it's the product of an algorithm, not a traveler. Somewhere along the way, the internet decided which sunset counted, and a hundred million itineraries followed it there at the same hour, on the same day, for the same forty-five minutes of light.",
      "We stopped handing clients that list a few years ago, quietly, without announcing it. What replaced it wasn't a secret list of better places — it was a conversation. What are you actually looking for when you say you want to see Santorini? Is it the caldera, specifically? Or is it the feeling of standing somewhere improbably beautiful with nowhere else to be?",
      "Usually it's the second one. And the second one is almost never on the list.",
      "So our itineraries now start from the feeling, not the landmark. We ask where you want to be handed a glass of wine and no schedule. We ask what you're willing to give up — the postcard shot, the famous restaurant with the eight-month waitlist — in exchange for a version of the same place that still belongs, a little, to the people who live there.",
      "It makes the research harder. It makes the trip better.",
    ],
  },
  {
    slug: "a-packing-list-that-actually-holds-up",
    title: "A Packing List That Actually Holds Up",
    excerpt:
      "Not a generic checklist — the handful of rules that hold regardless of destination, plus where we tell clients to deliberately break them.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "July 2026",
    isoDate: "2026-07-02",
    img: "/images/unsplash/1526857240824-92be52581d9b.jpg",
    content: [
      "Most packing lists are written for the trip in general, which means they're not really written for your trip at all. A ten-night cultural itinerary in Kyoto and a nine-night trek in Patagonia share almost nothing except a passport and a phone charger.",
      "The rules that do hold up: pack for laundry, not for the length of the trip — five days of clothing covers most three-week itineraries if you're willing to use a hotel laundry service once. Bring one layer warmer than the forecast suggests you'll need; weather forecasts get less reliable the further out they are, and the cost of being wrong runs one direction only.",
      "Where we tell people to break their own rules: on gear for a single big-ticket activity. A base-trek in Patagonia or four days on the Inca Trail is worth renting or buying real boots for, even if it means checking a bag you'd otherwise avoid. The itinerary earns the exception.",
      "The thing nobody puts on a checklist: pack the return trip differently than the outbound one. You will own more on day fourteen than you did on day one, usually without meaning to.",
    ],
  },
  {
    slug: "visa-and-entry-requirements-what-to-actually-check",
    title: "Visa & Entry Requirements: What to Actually Check Before You Book",
    excerpt:
      "Requirements change more often than people expect, and the consequences of getting them wrong land at the gate, not before it.",
    category: "Travel Guides",
    readTime: "6 min read",
    date: "June 2026",
    isoDate: "2026-06-14",
    img: "/images/unsplash/1655722725332-9925c96dd627.jpg",
    content: [
      "Every itinerary we build includes a note on entry requirements for the traveler's specific passport — because the answer genuinely depends on it. A US passport and a UK passport can face completely different rules for the same country, same dates, same airline.",
      "Three things worth checking yourself, even when a consultant is handling the rest: passport validity (many countries require six months remaining beyond your travel dates, not just beyond your return flight), whether a visa needs to be arranged in advance versus on arrival, and any recent policy changes — these shift more often than travelers assume, sometimes with only weeks of notice.",
      "The official source is always the destination country's embassy or consular website, not a travel blog, and not us — we'll flag what we know, but we're not a substitute for confirming directly, and we say so plainly rather than imply an accuracy we can't guarantee.",
      "The failure mode worth avoiding: discovering a requirement at check-in. Airlines are legally required to verify entry documents before boarding, and they will deny boarding rather than risk a fine — which means the problem surfaces at the worst possible moment, with the least room to fix it.",
    ],
  },
  {
    slug: "travel-insurance-without-the-fine-print",
    title: "Travel Insurance, Explained Without the Fine Print",
    excerpt:
      "What it actually covers, what it doesn't, and why we treat it as a default line item rather than an upsell.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "May 2026",
    isoDate: "2026-05-20",
    img: "/images/unsplash/1614451558582-96f3c35d3e5f.jpg",
    content: [
      "Travel insurance earns a bad reputation because most people only think about it after something's gone wrong — which is exactly backwards. The best outcome for any policy is that you never need to make a claim.",
      "The coverage that actually matters, in rough order of how often it gets used: trip cancellation and interruption (the deposit and non-refundable bookings you'd otherwise lose outright), emergency medical coverage abroad (your domestic health insurance very often does not travel with you), and medical evacuation, which sounds dramatic until you need it in a place a normal ambulance can't reach.",
      "What it typically doesn't cover: anything you knew about before buying the policy, and — depending on the provider — some \"adventure\" activities unless specifically added. Read the activity list against your actual itinerary, not just the headline coverage amount.",
      "We build a policy recommendation into every itinerary as a default, not an add-on you have to ask about. It's the cheapest insurance against the most expensive kind of surprise.",
    ],
  },
  {
    slug: "money-on-the-road-cards-cash-and-currency",
    title: "Money on the Road: Cards, Cash, and Currency",
    excerpt:
      "A short, practical guide to not overpaying in fees, not running out of cash, and not carrying more of it than you need to.",
    category: "Travel Guides",
    readTime: "4 min read",
    date: "April 2026",
    isoDate: "2026-04-09",
    img: "/images/unsplash/1580519542036-c47de6196ba5.jpg",
    content: [
      "The single biggest unforced error we see: paying a foreign-transaction fee on every card swipe for two weeks straight because nobody checked before leaving. Most decent travel cards waive it; most everyday cards don't. It's a five-minute check that's worth doing before, not after.",
      "On cash: carry enough for the first 24 hours (a taxi, a meal, a tip) in the local currency, withdrawn from an ATM rather than exchanged at the airport — airport exchange counters are reliably the worst rate you'll find. After that, let the trip tell you how much cash it actually needs; some destinations run almost entirely on card, others still expect cash for the small, best things — a market stall, a family-run trattoria.",
      "On \"dynamic currency conversion\" — when a card terminal or ATM abroad offers to charge you in your home currency instead of the local one — always decline it. It sounds like a convenience; it's a worse exchange rate, every time.",
      "None of this requires much planning, just a little of it in advance, which is generally true of travel and money both.",
    ],
  },
  {
    slug: "how-we-actually-decide-best-time-to-visit",
    title: "How We Actually Decide \"Best Time to Visit\"",
    excerpt:
      "It's rarely just weather — the honest version accounts for crowds, prices, and what's actually happening on the ground that month.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "March 2026",
    isoDate: "2026-03-25",
    img: "/images/unsplash/1547471080-7cc2caa01a7e.jpg",
    content: [
      "\"Best time to visit\" gets treated as a weather question, and weather is maybe a third of the actual answer. The other two-thirds are crowds and what's actually happening on the ground — a destination's shoulder season is often better than its peak, not despite the smaller crowds but because of what that absence makes room for.",
      "Take the Serengeti: peak migration season draws the most travelers, understandably. But a shoulder month with a smaller but still substantial resident wildlife population, at a fraction of the camp cost and with guides who have more time for you, is a real trade worth considering — not a compromise.",
      "Price follows demand almost exactly, which means the 'best' window by weather alone is usually also the most expensive and most crowded one. We'll always tell a client the honest trade-off rather than default to the postcard month, because the postcard month is postcard-crowded for a reason.",
      "The actual question we ask before recommending timing: what do you want more of — certainty, or room to have the place partly to yourself? Most people, once it's framed that way, are surprised which one they pick.",
    ],
  },
  {
    slug: "two-weeks-in-kyoto-wed-actually-book",
    title: "The Two Weeks in Kyoto We'd Actually Book",
    excerpt:
      "Not the itinerary we send to first-time clients — the one we'd take ourselves, temple fatigue and all.",
    category: "Field Notes",
    readTime: "8 min read",
    date: "January 2026",
    isoDate: "2026-01-12",
    img: "/images/unsplash/1493976040374-85c8e12f0c0e.jpg",
    content: [
      "There's a version of Kyoto that exists for people with four days and a list. Kinkaku-ji in the morning, Fushimi Inari at golden hour, a kaiseki dinner squeezed in before the last train. It's a perfectly good four days. It is also, we'd argue, not really Kyoto.",
      "Given two weeks — which is what we'd actually book, given the choice — the city opens differently. The first three days go to nothing in particular: a neighborhood, a bicycle, a coffee shop you return to twice because the owner remembered your order. Temple fatigue is real, and the cure for it isn't seeing fewer temples. It's seeing them slower, with gaps in between wide enough to actually notice something.",
      "Week two is when we'd send you north, into the Kitayama mountains, for two nights at a ryokan with a rotenburo and no wifi worth mentioning. You come back to the city with a different relationship to its noise.",
      "The famous gates are still worth it. Go at 6am, alone, before the tour buses. But build the trip around the mornings you don't plan at all — that's usually where the actual memory ends up living.",
    ],
  },
  {
    slug: "what-bespoke-should-actually-mean",
    title: "What “Bespoke” Should Actually Mean",
    excerpt:
      "The word gets printed on a lot of brochures. Most of what's behind it is still a template with your name typed in.",
    category: "Philosophy",
    readTime: "5 min read",
    date: "November 2025",
    isoDate: "2025-11-18",
    img: "/images/unsplash/1633655442168-c6ef0ed2f984.jpg",
    content: [
      "“Bespoke” is one of those words that travel agencies reach for the way restaurants reach for “artisanal.” It sounds like care. It doesn't always come with any.",
      "Here's a rough test: if the itinerary could be sold twice, unmodified, to two different clients with different reasons for traveling, it wasn't bespoke. It was a package with better font choices.",
      "Real tailoring shows up in the small refusals, not the big gestures. It's telling a client that the hotel they asked for isn't actually right for the trip they described, even though it would have been the easier sale. It's building in a free afternoon because the itinerary was starting to read like a job, not a vacation. It's knowing which two nights in a fourteen-night trip are the ones worth spending real money on, and being honest about the other twelve.",
      "We'd rather under-promise the word and over-deliver the substance. So we've mostly stopped saying it. You can decide for yourself whether the trip earns it.",
    ],
  },
  {
    slug: "flying-out-of-lungi-what-to-actually-know",
    title: "Flying Out of Lungi: What to Actually Know Before You Go",
    excerpt:
      "Freetown's airport isn't in Freetown. That single fact changes more about your travel day than anything on your packing list.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "August 2026",
    isoDate: "2026-08-06",
    img: "/images/unsplash/1436491865332-7a61a109cc05.jpg",
    content: [
      "First-time flyers out of Freetown are almost always caught off guard by the same fact: Lungi International Airport sits across the estuary from the city, not in it. Getting to your gate is a two-part trip — the road or river crossing first, then the airport itself — and treating it as one continuous journey is where travel days start to go sideways.",
      "There are a few ways to make that crossing: a fast boat across the water, or the longer road route around the bay. Which option is actually running, at what price, and on what schedule shifts more often than any timetable printed online suggests — so we confirm the crossing itself as its own step, separately from confirming the flight, every time.",
      "The buffer that matters here isn't the usual two-hours-before-departure advice you'd apply anywhere else. It's the buffer before that — enough slack in the estuary crossing that a delay there doesn't cascade into a missed check-in. We build that padding into every itinerary that starts or ends in Freetown, because it's the single most common reason a trip's first day goes wrong.",
      "If you're arranging this yourself: confirm the crossing the day before, not the week before, and build in more slack than feels reasonable. If we're booking it, this is one of the things we're already handling quietly in the background — it's a large part of what a ticket booked through an actual agency buys you here, versus a fare booked online with no one thinking about the water in between.",
    ],
  },
  {
    slug: "sierra-leone-passport-visa-free-how-to-actually-check",
    title: "Sierra Leonean Passport Holders: How to Actually Check Where You Can Go Visa-Free",
    excerpt:
      "The forwarded WhatsApp list is almost always out of date. Here's the honest, slower way to actually get the answer right.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "August 2026",
    isoDate: "2026-08-21",
    img: "/images/unsplash/1504609773096-104ff2c73ba4.jpg",
    content: [
      "This is the single most common question we get, and the honest answer is less satisfying than the one circulating on WhatsApp: there isn't one fixed list. Visa-free access depends on bilateral and regional agreements that shift over time, sometimes with little public notice, and a screenshot from two years ago is not a reliable source today.",
      "What is stable: as an ECOWAS member state, Sierra Leone is part of the regional free movement arrangement, which is the one piece of this that genuinely doesn't require the same country-by-country checking as travel further afield. Everything outside the region needs to be verified individually, for the specific dates you're actually traveling.",
      "The reliable way to check: the destination country's own embassy or consular website, not a travel blog, not a forwarded message, and — we'll say this plainly, the same way we do for every itinerary we build — not us either, without confirming it first. We'll tell you what we know, and we'll flag anything that looks like it's changed recently, but we treat our own knowledge as a starting point for verification, not a substitute for it.",
      "This is exactly the check we run before we ticket anything, precisely because getting it wrong doesn't surface until you're standing at a check-in counter with no good options left. If you're booking it yourself, budget the same twenty minutes we would — it's cheap insurance against an expensive mistake.",
    ],
  },
  {
    slug: "booking-through-an-agency-vs-yourself-what-you-actually-get",
    title: "What You Actually Get Booking Through an Agency vs. Doing It Yourself",
    excerpt:
      "Sometimes going direct really is the right call. Here's the honest version of when it is, and when it isn't.",
    category: "Philosophy",
    readTime: "5 min read",
    date: "September 2026",
    isoDate: "2026-09-10",
    img: "/images/unsplash/1449965408869-eaa3f722e40d.jpg",
    content: [
      "The assumption we hear most often is that booking direct is automatically cheaper, and an agency's value is mostly upselling. Sometimes the first half of that is true. A single, simple point-to-point ticket, no visa complexity, no connections worth worrying about — book that yourself. We'll say so if you ask us.",
      "What changes the calculation is everything a fare comparison site doesn't show you: whether your passport actually clears for that itinerary, whether a tight connection is realistic or a paper one, whether the \"refundable\" fare is refundable in the way you assume. None of that shows up next to the price, and all of it is exactly where a booking quietly goes wrong.",
      "What an agency is actually buying you isn't a secret discount — it's a person to call when a flight changes at 11pm the night before, who already knows your itinerary instead of starting from zero. That has a real value, but it isn't free, and we'd rather price it honestly as a planning fee on complex trips than hide it inside an inflated fare on simple ones.",
      "So the honest advice, even though it costs us the occasional booking: if your trip is simple, book it yourself and keep the difference. If it has more than one moving part — connections, visas, a group, a special occasion you don't want to gamble on — that's where we actually earn the fee. Ask us which one your trip is; it costs nothing to find out.",
    ],
  },
  {
    slug: "traveling-with-family-how-to-plan-for-everyone",
    title: "Traveling With Family: How to Plan for Everyone, Not Just the Planner",
    excerpt:
      "A good family trip isn't the one with the most in it. It's the one where nobody, at any age, spends a day waiting for it to be over.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "October 2026",
    isoDate: "2026-10-05",
    img: "/images/unsplash/1504609773096-104ff2c73ba4.jpg",
    content: [
      "Most family itineraries are written by one person, for an imagined version of the whole group. The result is usually a schedule that suits the planner and quietly wears everyone else down by the fourth day.",
      "The fix is less glamorous than it sounds: ask each person, including the youngest who can answer, for one thing they want from the trip, and build those in first. Then fill the gaps. A grandparent's one slow morning at a market and a teenager's one active afternoon are both easier to protect when they're on the schedule from the start, not squeezed in afterwards.",
      "Build in a day with nothing on it in the middle of the trip. Not as a luxury; as a buffer. Jet lag, a bad night's sleep or one under-the-weather child will take a day from you whether you plan for it or not, and it's far kinder to have chosen which day.",
      "Where we steer families away from the default: long transfers on arrival day, and back-to-back changes of hotel. Fewer bases, longer stays and shorter drives beat a packed route almost every time.",
      "If you tell us who's coming, their ages and what each of them dreads about travel, we'll build around that rather than around a template.",
    ],
  },
  {
    slug: "honeymoons-and-anniversaries-planning-it-without-the-pressure",
    title: "Honeymoons & Anniversaries: Planning It Without the Pressure",
    excerpt:
      "A milestone trip carries expectations a normal holiday never has to meet. Here's how we plan so it can simply be good.",
    category: "Travel Guides",
    readTime: "5 min read",
    date: "October 2026",
    isoDate: "2026-10-12",
    img: "/images/unsplash/1544644181-1484b3fdfc62.jpg",
    content: [
      "A honeymoon or an anniversary trip arrives with an unspoken brief: it has to be perfect. That pressure is the thing most likely to spoil it, and it usually shows up as an itinerary with too much in it.",
      "Our advice is to choose one or two moments worth protecting, such as a dinner, a sunrise or a quiet afternoon, and let everything else be easy. Moments are easier to deliver when the days around them aren't racing to fit in a second and third attraction.",
      "Tell us what you'd like to mark, not just where you'd like to go. If it's a long-awaited first trip together, that's a different plan from a tenth anniversary where you'd like some time away from the everyday.",
      "Practical things that make the difference: travel on dates that suit you both and not just the cheapest fare, keep a night or two at the end for the return rather than flying straight home, and let us know in advance about any occasion so the hotel can be told. We pass on the detail; we don't promise upgrades or surprises we can't control.",
      "The best compliment we hear isn't that the trip was flawless. It's that nobody felt rushed.",
    ],
  },
  {
    slug: "your-first-trip-abroad-a-calm-checklist",
    title: "Your First Trip Abroad: A Calm Checklist",
    excerpt:
      "Nobody tells you which parts of a first international trip are actually hard. Here's the short, honest list.",
    category: "Travel Guides",
    readTime: "4 min read",
    date: "October 2026",
    isoDate: "2026-10-18",
    img: "/images/unsplash/1436491865332-7a61a109cc05.jpg",
    content: [
      "If you've never traveled internationally, the logistics can feel bigger than the trip itself. In practice, a handful of things matter most, and most of them can be done weeks ahead.",
      "Start with your passport: check that it's valid and that its expiry date meets the destination's rules. Then confirm entry requirements for your nationality directly with the destination's official government source. Requirements differ by passport and change from time to time, so please don't rely on a friend's experience from a different passport.",
      "Next, think about money and phones before you leave. Tell your bank you're traveling if they ask for it, carry more than one way to pay, and check what your phone plan charges abroad. Offline maps downloaded in advance are a small step that removes a lot of stress.",
      "On the day, arrive at the airport earlier than you think you need to. Keep passports, tickets and key documents in one place you can reach, and photograph them as a backup.",
      "Finally, consider travel insurance before you pay non-refundable deposits, not after. And ask questions. Every consultant here has answered the \"silly\" question before, and we would much rather you ask it than worry about it.",
    ],
  },
];

export function getJournalEntry(slug: string) {
  return journalEntries.find((e) => e.slug === slug);
}
