import { destinations } from "./planner";
import { faqs } from "./faqs";
import { journalEntries } from "./journal";
import { contact } from "./site";

export type QuickReply = {
  label: string;
  /** Either an in-page/route href, or a literal message to send as if the user typed it. */
  href?: string;
  message?: string;
};

export type BotReply = {
  text: string;
  quickReplies?: QuickReply[];
};

const START_REPLIES: QuickReply[] = [
  { label: "Plan a trip", href: "/planner" },
  { label: "See destinations", message: "Where do you send people?" },
  { label: "How booking works", message: "How does booking work?" },
  { label: "Talk to a human", href: "/#contact" },
];

const GREETING: BotReply = {
  text: "Hello — I'm the Green Vital assistant. I can help with destinations, flights, visas, or point you to a real person on our team. What are you curious about?",
  quickReplies: START_REPLIES,
};

const FALLBACK: BotReply = {
  text: "I don't have a confident answer for that one — rather than guess, let me get you to someone who does.",
  quickReplies: [
    { label: "Talk to our team", href: "/#contact" },
    { label: "Try the Trip Planner", href: "/planner" },
    { label: "Ask something else", message: "" },
  ],
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Word-boundary matching, not plain substring — `text.includes("hi")` would
// match inside "this" or "history" and misfire the greeting rule on
// completely unrelated messages. `\b` anchors each keyword (including
// multi-word phrases) to real word edges instead.
const includesAny = (text: string, words: string[]) =>
  words.some((w) => new RegExp(`\\b${escapeRegex(w)}\\b`).test(text));

type Rule = {
  id: string;
  test: (text: string) => boolean;
  respond: () => BotReply;
};

const destinationKeywordMap: Record<string, string[]> = {
  kyoto: ["kyoto", "japan"],
  amalfi: ["amalfi", "italy", "positano"],
  serengeti: ["serengeti", "tanzania", "safari", "migration"],
  patagonia: ["patagonia", "chile", "torres del paine"],
  santorini: ["santorini", "greece", "oia", "caldera"],
  "freetown-peninsula": ["freetown", "peninsula", "bureh", "tokeh", "lumley", "surf", "sierra leone beach"],
  "tiwai-island": ["tiwai", "rainforest", "hippo", "primate", "moa river"],
  "banana-islands": ["banana islands", "banana island", "dublin island", "snorkel"],
};

const rules: Rule[] = [
  {
    id: "meta-what-are-you",
    test: (t) =>
      includesAny(t, [
        "chatgpt",
        "gpt",
        "what are you",
        "you real",
        "real ai",
        "you ai",
        "you a bot",
        "you a robot",
        "you human",
        "you a human",
        "you a person",
      ]),
    respond: () => ({
      text: "I'm an AI assistant built into this site, not a person. I work from Green Vital's actual destinations, tours, and policies, so I'm reliable on those — pricing is quoted directly by the team, not by me. For anything that needs judgment, I'll hand you to a real person.",
      quickReplies: [
        { label: "Talk to our team", href: "/#contact" },
        { label: "See destinations", message: "Where do you send people?" },
      ],
    }),
  },
  {
    id: "greeting",
    test: (t) => includesAny(t, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"]) && t.length < 30,
    respond: () => GREETING,
  },
  {
    id: "thanks",
    test: (t) =>
      includesAny(t, ["thanks", "thank you", "thankyou", "cheers", "appreciate it"]) && t.length < 40,
    respond: () => ({
      text: "Anytime. If anything else comes up, I'm right here.",
      quickReplies: START_REPLIES,
    }),
  },
  {
    id: "goodbye",
    test: (t) => includesAny(t, ["bye", "goodbye", "see you", "that's all", "thats all"]) && t.length < 30,
    respond: () => ({
      text: "Take care — and if you get partway through the Trip Planner and get stuck, just come back and ask.",
    }),
  },
  {
    id: "planner",
    test: (t) =>
      includesAny(t, ["plan a trip", "trip planner", "itinerary", "build a trip", "sketch"]) ||
      (includesAny(t, ["plan"]) && includesAny(t, ["trip", "itinerary"])),
    respond: () => ({
      text: "The fastest way in is the Trip Planner — four quick questions and you'll get a real day-by-day draft, no email required. It's a starting sketch; our team refines it from there, or books it as-is.",
      quickReplies: [
        { label: "Open the Trip Planner", href: "/planner" },
        { label: "How does booking work?", message: "How does booking work?" },
      ],
    }),
  },
  {
    // Pricing isn't something this bot quotes or estimates — every trip is
    // different, and a guessed number here is worse than no number at all.
    // It always hands off to the team or the reservation flow instead.
    id: "pricing",
    test: (t) => includesAny(t, ["price", "pricing", "cost", "fee", "budget", "expensive", "cheap", "how much"]),
    respond: () => ({
      text: "Pricing depends on your exact trip, so I won't guess at a number here — send us the details and our team will quote it directly. Starting a reservation request also gets you a real quote before anything's charged.",
      quickReplies: [
        { label: "Start a reservation request", href: "/tours" },
        { label: "Talk to our team", href: "/#contact" },
      ],
    }),
  },
  {
    id: "sustainability",
    test: (t) => includesAny(t, ["sustainab", "environment", "carbon", "responsible", "ethical", "overtourism"]),
    respond: () => ({
      text: "We book local guides and small properties directly, route around overtourism where we can, and favor fewer, longer stays over itineraries stitched together with short flights. It's a working set of principles, not a certification — the full page has the detail.",
      quickReplies: [{ label: "Read our Sustainability page", href: "/sustainability" }],
    }),
  },
  {
    id: "journal",
    test: (t) => includesAny(t, ["journal", "blog", "article", "read something", "stories"]),
    respond: () => ({
      text: `Our Journal has notes on how we actually plan trips — including "${journalEntries[0].title}" and "${journalEntries[1].title}."`,
      quickReplies: [{ label: "Read the Journal", href: "/journal" }],
    }),
  },
  {
    id: "about",
    test: (t) => includesAny(t, ["who are you", "about Green Vital", "founded", "your team", "your designers", "how long have you"]),
    respond: () => ({
      text: "Green Vital Travel and Tour Agency is registered and based in Freetown, Sierra Leone — flights, hotels, visas, tours, and corporate travel, run by a small, founder-led team that actually answers the phone.",
      quickReplies: [
        { label: "Meet the team", href: "/about/designers" },
        { label: "Read our story", href: "/about" },
      ],
    }),
  },
  {
    id: "human",
    test: (t) => includesAny(t, ["human", "real person", "real designer", "call", "phone", "email you", "speak to someone", "whatsapp"]),
    respond: () => ({
      text: `Of course — ${contact.email} or ${contact.phones[0]} reaches a real person, or message us on WhatsApp and someone will get back to you directly.`,
      quickReplies: [{ label: "Go to the contact form", href: "/#contact" }],
    }),
  },
  {
    id: "visa-documents",
    test: (t) =>
      includesAny(t, [
        "visa",
        "visas",
        "passport",
        "entry requirement",
        "entry requirements",
        "documentation",
        "what documents",
        "what do i need",
      ]),
    respond: () => ({
      text: "We handle visa assistance and travel documentation as part of the booking — requirements vary by destination and by passport, so we check yours against exactly where you're headed rather than guessing here. The Travel Requirements page has the general picture, and our team confirms the specifics for your trip.",
      quickReplies: [
        { label: "Travel Requirements page", href: "/travel-requirements" },
        { label: "Talk to our team", href: "/#contact" },
      ],
    }),
  },
  {
    id: "services-general",
    test: (t) =>
      includesAny(t, [
        "hotel",
        "hotels",
        "accommodation",
        "villa",
        "villas",
        "car hire",
        "car rental",
        "car rentals",
        "rent a car",
        "airport transfer",
        "airport transfers",
        "airport pickup",
        "private driver",
        "insurance",
        "travel insurance",
        "boat ticket",
        "boat tickets",
        "ferry",
        "water taxi",
        "flight ticket",
        "air ticket",
        "ticketing",
      ]),
    respond: () => ({
      text: "Yes — flights, boat and ferry tickets, hotels and villas, car hire, airport transfers, travel insurance, and visa documentation are all things we arrange directly, as part of one itinerary rather than five separate bookings.",
      quickReplies: [
        { label: "See all services", href: "/services" },
        { label: "Talk to our team", href: "/#contact" },
      ],
    }),
  },
  {
    id: "destinations-general",
    test: (t) =>
      includesAny(t, ["where do you", "destinations", "where can i go", "recommend a place", "where should i go"]),
    respond: () => ({
      text: `We've already built detailed trips to ${destinations.map((d) => d.name.split(",")[0]).join(" · ")} — but that's a starting point, not the limit. We book flights and arrange trips to any destination, globally. Name a place and I'll tell you what we can do, or tell us somewhere else entirely.`,
      quickReplies: destinations.map((d) => ({ label: d.name, message: d.name })),
    }),
  },
];

// One rule per destination, generated from the same data the Trip Planner
// uses — so an answer here can never drift out of sync with what the
// planner actually builds.
for (const dest of destinations) {
  const keywords = destinationKeywordMap[dest.id] ?? [dest.name.toLowerCase()];
  rules.push({
    id: `destination-${dest.id}`,
    test: (t) => includesAny(t, keywords),
    respond: () => {
      const highlight = dest.blocks[0];
      return {
        text: `${dest.name} — ${dest.bestFor}. One thing we'd build in: "${highlight.title}," ${highlight.description.toLowerCase()}`,
        quickReplies: [
          { label: `Plan a trip to ${dest.name}`, href: "/planner" },
          { label: "See another destination", message: "Where do you send people?" },
        ],
      };
    },
  });
}

function matchFaq(text: string): BotReply | null {
  const tokens = new Set(norm(text).split(/\s+/).filter((w) => w.length > 3));
  if (tokens.size === 0) return null;

  // Pricing FAQs are excluded here for the same reason the dedicated
  // "pricing" rule above never quotes a number — this is the fuzzy-match
  // fallback, and a token-overlap match on a fee/budget question would
  // route around that boundary rather than respect it.
  const pricingWords = ["fee", "fees", "budget", "cost", "price", "pricing"];
  const nonPricingFaqs = faqs.filter((f) => !includesAny(norm(f.question), pricingWords));

  let best: { score: number; answer: string } | null = null;
  for (const faq of nonPricingFaqs) {
    const qTokens = norm(faq.question).split(/\s+/).filter((w) => w.length > 3);
    const score = qTokens.filter((w) => tokens.has(w)).length;
    if (score >= 2 && (!best || score > best.score)) {
      best = { score, answer: faq.answer };
    }
  }
  return best
    ? {
        text: best.answer,
        quickReplies: [{ label: "Talk to our team", href: "/#contact" }],
      }
    : null;
}

export function getBotReply(input: string): BotReply {
  const text = norm(input);
  if (!text.trim()) return GREETING;

  for (const rule of rules) {
    if (rule.test(text)) return rule.respond();
  }

  const faqMatch = matchFaq(text);
  if (faqMatch) return faqMatch;

  return FALLBACK;
}

export { START_REPLIES, GREETING };
