export type Interest = "culture" | "food" | "adventure" | "nature" | "relaxation";
export type Pace = "relaxed" | "balanced" | "immersive";

export type ItineraryBlock = {
  title: string;
  description: string;
  tags: Interest[];
  length: "half" | "full";
};

export type PlannerDestination = {
  id: string;
  name: string;
  img: string;
  arrival: ItineraryBlock;
  departure: ItineraryBlock;
  blocks: ItineraryBlock[];
  bestFor: string;
};

export const interestOptions: { id: Interest; label: string }[] = [
  { id: "culture", label: "Culture & History" },
  { id: "food", label: "Food & Wine" },
  { id: "adventure", label: "Adventure & Nature" },
  { id: "relaxation", label: "Slow & Restorative" },
];

export const paceOptions: { id: Pace; label: string; hint: string }[] = [
  { id: "relaxed", label: "Relaxed", hint: "One thing a day, free time built in" },
  { id: "balanced", label: "Balanced", hint: "A full day, most days" },
  { id: "immersive", label: "Immersive", hint: "We make the most of every day" },
];

export const nightOptions = [5, 7, 10, 14];

export const destinations: PlannerDestination[] = [
  {
    id: "kyoto",
    name: "Kyoto, Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
    bestFor: "Culture, quiet mornings, food",
    arrival: {
      title: "Arrive, settle in",
      description:
        "Private transfer into the city and a slow first evening at your machiya guesthouse — no plans, just the neighborhood.",
      tags: ["relaxation"],
      length: "half",
    },
    departure: {
      title: "Depart Kyoto",
      description: "A final quiet morning before your private transfer to the airport.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Fushimi Inari at dawn",
        description: "A guided walk through the gates before the gates belong to anyone else.",
        tags: ["culture", "nature"],
        length: "half",
      },
      {
        title: "Private tea ceremony",
        description: "An afternoon with a third-generation host, not a tourist demonstration.",
        tags: ["culture"],
        length: "half",
      },
      {
        title: "Gion at dusk, kaiseki dinner",
        description: "A quiet walk through the old geisha district into a seasonal multi-course dinner.",
        tags: ["culture", "food"],
        length: "half",
      },
      {
        title: "Arashiyama bamboo grove & river",
        description: "The famous grove early, then a slow boat down the Hozugawa.",
        tags: ["nature"],
        length: "half",
      },
      {
        title: "Nishiki Market food crawl",
        description: "A guide walks you stall to stall — the ones locals actually queue for.",
        tags: ["food"],
        length: "half",
      },
      {
        title: "Kitayama mountains & ryokan onsen",
        description: "A day trip north into the hills, ending in a private hot-spring bath.",
        tags: ["nature", "relaxation"],
        length: "full",
      },
      {
        title: "Kiyomizu-dera & the pottery quarter",
        description: "The wooden temple stage, then an afternoon browsing working potters' studios.",
        tags: ["culture"],
        length: "half",
      },
      {
        title: "A day with nothing planned",
        description: "Deliberately empty — most travelers tell us this is the day they remember best.",
        tags: ["relaxation"],
        length: "full",
      },
    ],
  },
  {
    id: "amalfi",
    name: "Amalfi Coast, Italy",
    img: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80",
    bestFor: "Food, slow days, the sea",
    arrival: {
      title: "Arrive, settle in",
      description: "A private transfer along the coast road into a quiet town most itineraries skip.",
      tags: ["relaxation"],
      length: "half",
    },
    departure: {
      title: "Depart the coast",
      description: "One last coffee with a sea view before your transfer to Naples.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Private boat, Positano to Nerano",
        description: "Your own boat and driver, swimming stops chosen as you go.",
        tags: ["relaxation", "adventure"],
        length: "full",
      },
      {
        title: "Pasta-making in a Ravello kitchen",
        description: "A morning in a family's actual kitchen, not a cooking-class stage set.",
        tags: ["food"],
        length: "half",
      },
      {
        title: "Path of the Gods hike",
        description: "The coast's best trail, timed to avoid both the heat and the crowds.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "Family vineyard wine tasting",
        description: "A small producer's terrace above the water, poured by the family that makes it.",
        tags: ["food"],
        length: "half",
      },
      {
        title: "A morning with no agenda",
        description: "A quiet beach club, a book, nowhere to be.",
        tags: ["relaxation"],
        length: "half",
      },
      {
        title: "Ravello's gardens & a cliffside lunch",
        description: "Villa Cimbrone's gardens, then lunch on a terrace that inspired half its postcards.",
        tags: ["culture", "relaxation"],
        length: "half",
      },
      {
        title: "Capri by private boat",
        description: "A full day away from the mainland, timed around the Blue Grotto's tide.",
        tags: ["adventure", "relaxation"],
        length: "full",
      },
    ],
  },
  {
    id: "serengeti",
    name: "Serengeti, Tanzania",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    bestFor: "Wildlife, wide horizons",
    arrival: {
      title: "Fly into the bush",
      description: "A light aircraft to the airstrip nearest that week's migration, then straight to camp.",
      tags: ["adventure"],
      length: "half",
    },
    departure: {
      title: "Depart camp",
      description: "One last dawn drive on the way to the airstrip, weather and wildlife permitting.",
      tags: ["adventure"],
      length: "half",
    },
    blocks: [
      {
        title: "Dawn game drive",
        description: "Out before the light, with a guide who reads the plains like a page.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "Sundowner game drive",
        description: "The golden hour, ending with a drink watching the plains go dark.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "Balloon safari at first light",
        description: "The migration from above, then a bush breakfast where you land.",
        tags: ["adventure"],
        length: "half",
      },
      {
        title: "Guided bush walk",
        description: "On foot with a Maasai tracker — a completely different way of reading the same land.",
        tags: ["culture", "nature"],
        length: "half",
      },
      {
        title: "Full day following the migration",
        description: "Wherever the herds are that week, with a packed lunch and no fixed return time.",
        tags: ["adventure", "nature"],
        length: "full",
      },
      {
        title: "Visit a local community project",
        description: "A school or conservancy we've worked with directly, not a staged stop.",
        tags: ["culture"],
        length: "half",
      },
      {
        title: "A day at camp",
        description: "A treatment at the camp spa and a nap in the heat of the day — the migration will keep.",
        tags: ["relaxation"],
        length: "half",
      },
    ],
  },
  {
    id: "patagonia",
    name: "Patagonia, Chile",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    bestFor: "Big landscapes, real hiking",
    arrival: {
      title: "Arrive in Puerto Natales",
      description: "A transfer into the park with your first real look at the towers.",
      tags: ["adventure"],
      length: "half",
    },
    departure: {
      title: "Depart the park",
      description: "A final morning view of the towers before the drive back to Puerto Natales.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Torres del Paine base trek",
        description: "The park's signature hike, timed with a certified guide to miss the worst crowds.",
        tags: ["adventure", "nature"],
        length: "full",
      },
      {
        title: "French Valley hike",
        description: "Hanging glaciers and avalanche thunder from a trail most day-trippers never reach.",
        tags: ["adventure", "nature"],
        length: "full",
      },
      {
        title: "Glacier boat excursion",
        description: "Grey Glacier by boat, close enough to hear the ice moving.",
        tags: ["nature"],
        length: "half",
      },
      {
        title: "Estancia horseback ride",
        description: "A working sheep ranch, ridden the way the gauchos actually ride it.",
        tags: ["adventure", "culture"],
        length: "half",
      },
      {
        title: "A weather-buffer day",
        description: "Built in on purpose — Patagonia sets the schedule, not the itinerary.",
        tags: ["relaxation"],
        length: "full",
      },
      {
        title: "Condor lookout at sunrise",
        description: "A short, steep climb for one of the best views in the park, before the day tours arrive.",
        tags: ["nature", "adventure"],
        length: "half",
      },
      {
        title: "Asado dinner with your guide",
        description: "Patagonian lamb, slow-cooked, with the person who's been walking you through the park.",
        tags: ["food", "culture"],
        length: "half",
      },
    ],
  },
  {
    id: "santorini",
    name: "Santorini, Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
    bestFor: "The caldera, slow dinners",
    arrival: {
      title: "Arrive, settle in",
      description: "A transfer to a cliffside suite in Oia's quieter northern edge.",
      tags: ["relaxation"],
      length: "half",
    },
    departure: {
      title: "Depart Santorini",
      description: "A last caldera sunrise before your transfer to the ferry or airport.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Sunset catamaran along the caldera",
        description: "The classic view, without the forty-person tour boat.",
        tags: ["relaxation"],
        length: "half",
      },
      {
        title: "Family vineyard wine tasting",
        description: "Assyrtiko tasted where it's grown, on volcanic soil older than most wine regions.",
        tags: ["food"],
        length: "half",
      },
      {
        title: "Akrotiri & the red beach",
        description: "A Bronze Age site preserved in ash, then an afternoon on one of the island's strangest beaches.",
        tags: ["culture", "nature"],
        length: "half",
      },
      {
        title: "Traditional cooking class",
        description: "Santorini dishes you won't find on a hotel menu, taught in someone's actual kitchen.",
        tags: ["food"],
        length: "half",
      },
      {
        title: "A day with nowhere to be",
        description: "The pool, the village lanes, whatever the day turns into.",
        tags: ["relaxation"],
        length: "full",
      },
      {
        title: "Fira to Oia caldera hike",
        description: "The island's best walk, started early enough to have most of it to yourself.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "Private dinner over the caldera",
        description: "A table held just for you, timed to the sunset.",
        tags: ["food", "relaxation"],
        length: "half",
      },
    ],
  },
  {
    id: "freetown-peninsula",
    name: "Freetown Peninsula, Sierra Leone",
    img: "https://images.unsplash.com/photo-1611395813517-41f9be5e292d?auto=format&fit=crop&w=1400&q=80",
    bestFor: "Beaches, surf, easy days",
    arrival: {
      title: "Arrive, settle in",
      description: "Airport transfer and a water-taxi across the estuary, ending with a first sunset at Lumley Beach.",
      tags: ["relaxation"],
      length: "half",
    },
    departure: {
      title: "Depart the peninsula",
      description: "A final open morning on the sand before your transfer back for departure.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Surf lesson at Bureh Beach",
        description: "A morning with the local surf club, on some of West Africa's best-known break.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "River No. 2 grilled fish afternoon",
        description: "Fresh barracuda straight off the grill, feet in the sand, a quiet stretch of beach behind it.",
        tags: ["food", "relaxation"],
        length: "half",
      },
      {
        title: "Leicester Peak at sunrise",
        description: "A short, steep drive and walk for a view over the whole of Freetown before the day heats up.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "Freetown's Cotton Tree & old town",
        description: "A guided walk through the historic center, with a local who knows the city's actual history, not the tourist-board version.",
        tags: ["culture"],
        length: "half",
      },
      {
        title: "A fishing village morning near Tokeh",
        description: "Watching the boats come in, coffee with the families who've fished this stretch for generations.",
        tags: ["culture", "food"],
        length: "half",
      },
      {
        title: "A day with nothing planned",
        description: "Lumley or Tokeh, a book, no schedule — most travelers tell us this is the day they didn't know they needed.",
        tags: ["relaxation"],
        length: "full",
      },
    ],
  },
  {
    id: "tiwai-island",
    name: "Tiwai Island, Sierra Leone",
    img: "https://images.unsplash.com/photo-1602298674761-700e96568f5f?auto=format&fit=crop&w=1400&q=80",
    bestFor: "Rainforest, wildlife, quiet",
    arrival: {
      title: "Cross onto the island",
      description: "A road transfer from Bo, then a canoe crossing onto Tiwai and a briefing on the reserve.",
      tags: ["adventure"],
      length: "half",
    },
    departure: {
      title: "Depart Tiwai",
      description: "A final canoe crossing back to the mainland for your onward transfer.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Dawn primate walk",
        description: "A community guide leads the way — eleven primate species call this island home, including the rare Diana monkey.",
        tags: ["nature", "adventure"],
        length: "half",
      },
      {
        title: "Canoe trip for hippo sign",
        description: "A slow paddle down the Moa River at dusk, watching the banks for pygmy hippos.",
        tags: ["nature", "adventure"],
        length: "half",
      },
      {
        title: "Guided night walk",
        description: "Nocturnal wildlife the island doesn't show anyone during the day — bring a good torch.",
        tags: ["nature", "adventure"],
        length: "half",
      },
      {
        title: "A Mende village visit",
        description: "The communities that co-manage the reserve, and a look at how conservation actually works here on the ground.",
        tags: ["culture"],
        length: "half",
      },
      {
        title: "A quiet day at camp",
        description: "Reading in a hammock over the river — the island rewards slowing down as much as walking further.",
        tags: ["relaxation"],
        length: "full",
      },
    ],
  },
  {
    id: "banana-islands",
    name: "Banana Islands, Sierra Leone",
    img: "https://images.unsplash.com/photo-1625001071825-0a85373c8972?auto=format&fit=crop&w=1400&q=80",
    bestFor: "Snorkeling, history, no cars",
    arrival: {
      title: "Cross to the islands",
      description: "A road transfer to Kent, then a short boat crossing to Dublin — no cars, no roads, no rush from here.",
      tags: ["relaxation"],
      length: "half",
    },
    departure: {
      title: "Depart for the mainland",
      description: "A slow sunset crossing back to Kent for your onward transfer.",
      tags: ["relaxation"],
      length: "half",
    },
    blocks: [
      {
        title: "Snorkeling the reef off Dublin",
        description: "Clear water and an easy reef, gear provided — no experience needed.",
        tags: ["adventure", "nature"],
        length: "half",
      },
      {
        title: "The old British gun emplacements",
        description: "A short walk to the coastal defenses, with the history of the islands' freed-slave settlers along the way.",
        tags: ["culture"],
        length: "half",
      },
      {
        title: "Fishing with a local crew",
        description: "Out in a wooden boat with fishermen who've worked these waters their whole lives.",
        tags: ["food", "adventure"],
        length: "half",
      },
      {
        title: "A day on the sand",
        description: "No electricity, no agenda — the off-grid pace is most of the point.",
        tags: ["relaxation"],
        length: "full",
      },
    ],
  },
];

export type ItineraryDay = {
  day: number;
  blocks: ItineraryBlock[];
};

export function generateItinerary({
  destinationId,
  nights,
  pace,
  interests,
}: {
  destinationId: string;
  nights: number;
  pace: Pace;
  interests: Interest[];
}): ItineraryDay[] | null {
  const destination = destinations.find((d) => d.id === destinationId);
  if (!destination) return null;

  const score = (block: ItineraryBlock) =>
    interests.length === 0
      ? 0
      : block.tags.filter((t) => interests.includes(t)).length;

  const pool = [...destination.blocks].sort((a, b) => score(b) - score(a));

  const middleCount = Math.max(nights - 2, 0);
  const days: ItineraryDay[] = [{ day: 1, blocks: [destination.arrival] }];

  const relaxedEvery = pace === "relaxed" ? 3 : Infinity;
  const usedTitles = new Set<string>();
  let poolIndex = 0;
  const nextBlock = (): ItineraryBlock | null => {
    while (poolIndex < pool.length) {
      const candidate = pool[poolIndex++];
      if (!usedTitles.has(candidate.title)) {
        usedTitles.add(candidate.title);
        return candidate;
      }
    }
    return null;
  };
  // Cycled rather than reused: a pool this size runs out well before a
  // 14-night immersive itinerary does, and four identical "A free day"
  // blocks in a row reads as broken even though it's technically honest.
  const restBlocks: ItineraryBlock[] = [
    {
      title: "A free day",
      description: "Nothing scheduled — a chance to slow down, or ask your travel consultant to fill it.",
      tags: ["relaxation"],
      length: "full",
    },
    {
      title: "An extra day here",
      description: `Worth staying longer in ${destination.name} rather than moving on — ask your travel consultant what a second pass would add.`,
      tags: ["relaxation"],
      length: "full",
    },
    {
      title: "Open, on purpose",
      description: "Past this point it's genuinely your call — a good sign to bring in a travel consultant for the rest.",
      tags: ["relaxation"],
      length: "full",
    },
  ];
  let restIndex = 0;
  const nextRestBlock = () => restBlocks[restIndex++ % restBlocks.length];

  for (let i = 0; i < middleCount; i++) {
    const dayNumber = i + 2;

    if ((i + 1) % relaxedEvery === 0) {
      days.push({ day: dayNumber, blocks: [nextRestBlock()] });
      continue;
    }

    if (pace === "immersive") {
      const first = nextBlock();
      const second = first?.length === "half" ? nextBlock() : null;
      const blocks = [first, second].filter((b): b is ItineraryBlock => !!b);
      days.push({ day: dayNumber, blocks: blocks.length ? blocks : [nextRestBlock()] });
    } else {
      const block = nextBlock();
      days.push({ day: dayNumber, blocks: block ? [block] : [nextRestBlock()] });
    }
  }

  if (nights >= 2) {
    days.push({ day: nights, blocks: [destination.departure] });
  }

  return days;
}
