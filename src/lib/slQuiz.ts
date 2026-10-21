// Data and scoring for the "Which Sierra Leone trip suits you?" quiz
// (app/visit-sierra-leone/quiz). Kept separate from the React component so the
// scoring can be unit-tested. Facts mirror the visitor guides in journal.ts and
// stick to stable, general statements.

export type QuizOutcome = {
  id: "beach" | "wildlife" | "heritage" | "explorer";
  name: string;
  tagline: string;
  img: string;
  imgAlt: string;
  /** Short, educational points shown with the result. */
  knowing: string[];
  /** Journal guide slugs to read next. */
  guides: { slug: string; label: string }[];
  /** Tour slug to link to, if there is a matching package. */
  tourSlug?: string;
};

// Order matters: it is also the tie-break order (earlier wins).
export const quizOutcomes: QuizOutcome[] = [
  {
    id: "beach",
    name: "The Beach & Island Escape",
    tagline: "Sand, sea and slow days on the Freetown Peninsula and the Banana Islands.",
    img: "/images/unsplash/1611395813517-41f9be5e292d.jpg",
    imgAlt: "A palm-fringed beach on the Freetown Peninsula, Sierra Leone",
    knowing: [
      "The peninsula's beaches, such as River No. 2, Tokeh and Bureh, are within reach of Freetown.",
      "The Banana Islands are a short boat crossing after a road transfer to Kent.",
      "The dry season, roughly November to April, is the easiest time for beach days.",
    ],
    guides: [
      { slug: "beaches-near-freetown-peninsula-guide", label: "Beaches near Freetown" },
      { slug: "how-to-visit-the-banana-islands-from-freetown", label: "How to visit the Banana Islands" },
    ],
    tourSlug: "freetown-peninsula-beach-escape",
  },
  {
    id: "wildlife",
    name: "The Rainforest & Wildlife Journey",
    tagline: "Rainforest walks, river canoes and primates, away from the crowds.",
    img: "/images/unsplash/1602298674761-700e96568f5f.jpg",
    imgAlt: "Rainforest on a river island in Sierra Leone",
    knowing: [
      "Tiwai Island is a river-island sanctuary in southern Sierra Leone, run with local communities.",
      "With Gola Rainforest National Park, Tiwai is part of Sierra Leone's first UNESCO World Heritage Site (inscribed in July 2025).",
      "It is a long way from Freetown, so plan a full day of travel each way.",
      "Early mornings and evenings are the best times to look for wildlife.",
    ],
    guides: [
      { slug: "tiwai-island-wildlife-sanctuary-guide", label: "Tiwai Island: what to expect" },
      { slug: "things-to-do-in-freetown-sierra-leone", label: "Things to do in Freetown" },
    ],
    tourSlug: "tiwai-island-rainforest-safari",
  },
  {
    id: "heritage",
    name: "The History & Heritage Trail",
    tagline: "Meaningful places and stories, best seen with a knowledgeable guide.",
    img: "/images/unsplash/1624832040555-d9f92f7be672.jpg",
    imgAlt: "A coastal view near Freetown, Sierra Leone",
    knowing: [
      "Bunce Island, upriver from Freetown, is the ruin of a fort used in the Atlantic slave trade.",
      "It is reached by boat, usually in under an hour, and a guide makes the visit far richer.",
      "Freetown's National Museum is a good introduction to the country's peoples and past.",
    ],
    guides: [
      { slug: "bunce-island-day-trip-guide", label: "Visiting Bunce Island" },
      { slug: "things-to-do-in-freetown-sierra-leone", label: "Things to do in Freetown" },
    ],
    tourSlug: "banana-islands-snorkel-and-history",
  },
  {
    id: "explorer",
    name: "The First-Time Explorer",
    tagline: "A little of everything, close to Freetown, in about a week.",
    img: "/images/unsplash/1625001071825-0a85373c8972.jpg",
    imgAlt: "Boats and water at the Banana Islands, Sierra Leone",
    knowing: [
      "A first week can mix Freetown, peninsula beaches, the Banana Islands and Bunce Island.",
      "Staying close to Freetown keeps transfers manageable.",
      "The airport is at Lungi, across the estuary, so plan the crossing at each end.",
    ],
    guides: [
      { slug: "seven-days-in-sierra-leone-sample-itinerary", label: "A 7-day sample itinerary" },
      { slug: "sierra-leone-travel-guide-for-first-time-visitors", label: "First-time visitor guide" },
    ],
  },
];

export type QuizOption = { label: string; weight: [number, number, number, number] };
export type QuizQuestion = { prompt: string; options: QuizOption[] };

// Weights are [beach, wildlife, heritage, explorer], matching quizOutcomes order.
export const quizQuestions: QuizQuestion[] = [
  {
    prompt: "What does your perfect first day look like?",
    options: [
      { label: "Toes in the sand with an ocean view", weight: [3, 0, 0, 1] },
      { label: "Walking under a rainforest canopy", weight: [0, 3, 0, 1] },
      { label: "Standing where history happened", weight: [0, 0, 3, 1] },
      { label: "A bit of everything", weight: [1, 1, 1, 3] },
    ],
  },
  {
    prompt: "How adventurous are you feeling?",
    options: [
      { label: "Easy and relaxed, please", weight: [3, 0, 1, 1] },
      { label: "Happy to hike and get muddy", weight: [0, 3, 0, 1] },
      { label: "Curious, guided and thoughtful", weight: [0, 1, 3, 1] },
      { label: "Up for anything", weight: [1, 2, 1, 2] },
    ],
  },
  {
    prompt: "How much time do you have?",
    options: [
      { label: "A long weekend", weight: [2, 0, 2, 1] },
      { label: "About a week", weight: [1, 0, 1, 3] },
      { label: "Ten days or more", weight: [0, 3, 1, 2] },
      { label: "Just a day trip from Freetown", weight: [1, 0, 3, 0] },
    ],
  },
  {
    prompt: "Who is travelling?",
    options: [
      { label: "Just me", weight: [0, 2, 2, 1] },
      { label: "Me and a partner", weight: [3, 1, 1, 1] },
      { label: "The whole family", weight: [2, 0, 1, 3] },
      { label: "A group of friends", weight: [1, 2, 0, 3] },
    ],
  },
];

/**
 * Sums the chosen options' weights and returns the winning outcome. Ties go to
 * the earlier outcome in `quizOutcomes`, so a given set of answers always gives
 * the same result.
 */
export function scoreQuiz(answers: number[]): QuizOutcome {
  const totals = [0, 0, 0, 0];
  answers.forEach((choice, q) => {
    const weight = quizQuestions[q]?.options[choice]?.weight;
    if (!weight) return;
    weight.forEach((w, i) => {
      totals[i] += w;
    });
  });
  const best = totals.indexOf(Math.max(...totals));
  return quizOutcomes[best];
}
