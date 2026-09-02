export type Region = "Asia" | "Europe" | "Africa" | "Americas" | "Oceania" | "Middle East";

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  heroImg: string;
  gallery: string[];
  hook: string;
  description: string;
  bestTime: string;
  quickFacts: {
    currency: string;
    language: string;
    flightNote: string;
    climate: string;
  };
  topExperiences: string[];
  relatedTourSlugs: string[];
};

// A handful of neutral, scenic images cycled through gallery strips as
// filler alongside each destination's own hero — keeps every destination
// page visually rich without sourcing a fully unique shoot per place.
const filler = [
  "/images/unsplash/1540202404-a2f29016b523.jpg",
  "/images/unsplash/1512100356356-de1b84283e18.jpg",
  "/images/unsplash/1502602898657-3e91760cbb34.jpg",
  "/images/unsplash/1571902943202-507ec2618e8f.jpg",
  "/images/unsplash/1466442929976-97f336a657be.jpg",
  "/images/unsplash/1506461883276-594a12b11cf3.jpg",
  "/images/unsplash/1587595431973-160d0d94add1.jpg",
  "/images/unsplash/1469521669194-babb45599def.jpg",
  "/images/unsplash/1544644181-1484b3fdfc62.jpg",
];

export const destinations: Destination[] = [
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    heroImg:
      "/images/unsplash/1493976040374-85c8e12f0c0e.jpg",
    gallery: [filler[0], filler[1]],
    hook: "Temple gardens and quiet mornings",
    description:
      "The old imperial capital, unhurried — machiya guesthouses, moss gardens before the crowds, and kaiseki dinners built around the season rather than the calendar.",
    bestTime: "March–May and October–November",
    quickFacts: {
      currency: "Japanese Yen (¥)",
      language: "Japanese",
      flightNote: "~11hr direct from the US West Coast",
      climate: "Temperate, with four distinct seasons",
    },
    topExperiences: [
      "Dawn walk through the Fushimi Inari gates",
      "A tea ceremony with a third-generation host",
      "Arashiyama's bamboo grove by river boat",
      "Nishiki Market, stall by stall, with a guide",
    ],
    relatedTourSlugs: ["kyoto-temples-and-tea-culture"],
  },
  {
    slug: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    heroImg:
      "/images/unsplash/1533104816931-20fa691ff6ca.jpg",
    gallery: [filler[2], filler[3]],
    hook: "Cliffside towns, slow dinners",
    description:
      "Fewer stops and more time in each — a private boat instead of the coastal road, and dinners with families who've run the same three tables for decades.",
    bestTime: "May through early October",
    quickFacts: {
      currency: "Euro (€)",
      language: "Italian",
      flightNote: "~9–10hr direct from the US East Coast to Naples/Rome",
      climate: "Mediterranean — hot, dry summers",
    },
    topExperiences: [
      "Private boat from Positano to Nerano",
      "Pasta-making in a Ravello home kitchen",
      "The Path of the Gods hike, timed early",
      "Capri by boat, around the Blue Grotto's tide",
    ],
    relatedTourSlugs: ["amalfi-coast-sail-and-supper", "amalfi-aegean-small-ship-sail"],
  },
  {
    slug: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    region: "Africa",
    heroImg:
      "/images/unsplash/1516426122078-c23e76319801.jpg",
    gallery: [filler[4], filler[5]],
    hook: "The great migration, up close",
    description:
      "Mobile camps that follow the herds rather than a fixed lodge, run by naturalists we've traveled with ourselves — built for the days the migration actually moves.",
    bestTime: "June through September",
    quickFacts: {
      currency: "Tanzanian Shilling",
      language: "Swahili & English",
      flightNote: "~16hr via one connection from the US or Europe",
      climate: "Tropical savanna — dry season June–October",
    },
    topExperiences: [
      "Dawn and sundowner game drives",
      "A hot-air balloon safari over the plains",
      "A guided bush walk with a Maasai tracker",
      "A full day following that week's migration",
    ],
    relatedTourSlugs: ["serengeti-great-migration-safari", "serengeti-family-safari-in-comfort"],
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    country: "Chile",
    region: "Americas",
    heroImg:
      "/images/unsplash/1544735716-392fe2489ffa.jpg",
    gallery: [filler[6], filler[7]],
    hook: "Glaciers, granite, and silence",
    description:
      "Torres del Paine without the crowds at the viewpoints — timed hikes, a private refugio, and enough slack in the schedule for the weather to cooperate.",
    bestTime: "November through March",
    quickFacts: {
      currency: "Chilean Peso",
      language: "Spanish",
      flightNote: "~13hr direct to Santiago, then a domestic flight south",
      climate: "Sub-polar — famously all four seasons in a day",
    },
    topExperiences: [
      "The Torres del Paine base trek",
      "Grey Glacier by boat",
      "An estancia horseback ride",
      "A condor lookout at sunrise",
    ],
    relatedTourSlugs: ["patagonia-towers-trekking-expedition"],
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    heroImg:
      "/images/unsplash/1570077188670-e3a8d69ac5ff.jpg",
    gallery: [filler[8], filler[0]],
    hook: "Whitewashed cliffs, endless blue",
    description:
      "The caldera without the cruise-ship hours — a base in a quieter village, a sunset sail instead of the crowded viewpoint, and a table that doesn't need six months' notice.",
    bestTime: "April, May, or September",
    quickFacts: {
      currency: "Euro (€)",
      language: "Greek",
      flightNote: "~10hr direct from the US East Coast to Athens, then a short hop",
      climate: "Mediterranean — hot, dry summers",
    },
    topExperiences: [
      "A sunset catamaran along the caldera",
      "Assyrtiko wine tasting on volcanic soil",
      "Akrotiri's Bronze Age ruins and the red beach",
      "The Fira-to-Oia caldera hike, started early",
    ],
    relatedTourSlugs: ["santorini-caldera-honeymoon-escape"],
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    heroImg:
      "/images/unsplash/1537996194471-e657df975ab4.jpg",
    gallery: [filler[1], filler[2]],
    hook: "Rice terraces, temples, and tide pools",
    description:
      "Beyond the beach clubs — a stay built around Ubud's terraced hills, a sunrise volcano climb, and a coastline that still has quiet corners if you know where to look.",
    bestTime: "April through October (dry season)",
    quickFacts: {
      currency: "Indonesian Rupiah",
      language: "Indonesian & Balinese",
      flightNote: "~20hr via one connection from the US",
      climate: "Tropical — dry season April–October",
    },
    topExperiences: [
      "Sunrise trek up Mount Batur",
      "Tegalalang's rice terraces at first light",
      "A traditional Balinese cooking class",
      "Uluwatu's cliffside temple at sunset",
    ],
    relatedTourSlugs: ["bali-temples-and-terraces"],
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    heroImg:
      "/images/unsplash/1489493887464-892be6d1daae.jpg",
    gallery: [filler[3], filler[4]],
    hook: "Souks by day, dunes by night",
    description:
      "The medina's maze of souks and riads, then out past the Atlas Mountains to a private camp in the Sahara — camel silhouettes, and a sky with no ambient light for a hundred miles.",
    bestTime: "March–May and September–November",
    quickFacts: {
      currency: "Moroccan Dirham",
      language: "Arabic & French",
      flightNote: "~7hr seasonal direct from the US East Coast, or via Europe",
      climate: "Arid — hot summers, mild winters",
    },
    topExperiences: [
      "A private guide through the medina's souks",
      "Jardin Majorelle's cobalt-blue gardens",
      "Crossing the High Atlas by 4x4",
      "A night in a private Sahara camp",
    ],
    relatedTourSlugs: ["marrakech-souks-and-sahara-dunes"],
  },
  {
    slug: "iceland",
    name: "Iceland",
    country: "Iceland",
    region: "Europe",
    heroImg:
      "/images/unsplash/1531168556467-80aace0d0144.jpg",
    gallery: [filler[5], filler[6]],
    hook: "Waterfalls, ice caves, and the aurora",
    description:
      "The Ring Road at a pace that leaves room for the weather to change your plans — glacier lagoons, black-sand coastlines, and nights left open for the lights.",
    bestTime: "June–August for the Ring Road, September–March for the aurora",
    quickFacts: {
      currency: "Icelandic Króna",
      language: "Icelandic",
      flightNote: "~5–6hr direct from the US East Coast",
      climate: "Subarctic — mild summers, cold, dark winters",
    },
    topExperiences: [
      "A self-driven stretch of the Ring Road",
      "Glacier hiking on Vatnajökull",
      "The Jökulsárlón glacier lagoon by boat",
      "A night chasing the aurora, away from town light",
    ],
    relatedTourSlugs: ["iceland-ring-road-fire-and-ice"],
  },
  {
    slug: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    heroImg:
      "/images/unsplash/1518837695005-2083093ee35b.jpg",
    gallery: [filler[7], filler[8]],
    hook: "Alps, fjords, and a taste for adrenaline",
    description:
      "New Zealand's adventure capital, used properly — the Southern Alps on foot, Milford Sound by boat at dawn before the day-trip crowds arrive, and a Central Otago vineyard to slow back down.",
    bestTime: "December–February (summer) or June–August (ski season)",
    quickFacts: {
      currency: "New Zealand Dollar",
      language: "English",
      flightNote: "~13hr from the US West Coast, plus a domestic connection",
      climate: "Temperate alpine, four distinct seasons",
    },
    topExperiences: [
      "Milford Sound by boat at first light",
      "A guided hike in the Remarkables",
      "Central Otago vineyard tastings",
      "Jet-boating the Shotover River",
    ],
    relatedTourSlugs: ["queenstown-southern-alps-adrenaline"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Asia",
    heroImg:
      "/images/unsplash/1573843981267-be1999ff37cd.jpg",
    gallery: [filler[0], filler[3]],
    hook: "Overwater villas, endless turquoise",
    description:
      "A single-island stay built for doing very little, very well — a private overwater villa, a house reef worth snorkeling before breakfast, and dinners served on the sand.",
    bestTime: "November through April (dry season)",
    quickFacts: {
      currency: "Maldivian Rufiyaa (USD widely accepted)",
      language: "Dhivehi",
      flightNote: "~16hr via one connection, usually Dubai, Doha, or Colombo",
      climate: "Tropical — warm and humid year-round",
    },
    topExperiences: [
      "Snorkeling the house reef at sunrise",
      "A private sandbank picnic",
      "Dolphin cruise at dusk",
      "An overwater spa treatment",
    ],
    relatedTourSlugs: ["maldives-overwater-luxury-retreat"],
  },
  {
    slug: "peru",
    name: "Peru",
    country: "Peru",
    region: "Americas",
    heroImg:
      "/images/unsplash/1526392060635-9d6019884377.jpg",
    gallery: [filler[4], filler[7]],
    hook: "Machu Picchu, earned on foot",
    description:
      "The Sacred Valley and the Inca Trail, timed and paced by a guide who knows the altitude better than the map does — ending, on the fourth morning, at the Sun Gate.",
    bestTime: "May through September (dry season)",
    quickFacts: {
      currency: "Peruvian Sol",
      language: "Spanish & Quechua",
      flightNote: "~8hr direct from the US, then a domestic flight to Cusco",
      climate: "Varies hugely by altitude — warm coast, cold highlands",
    },
    topExperiences: [
      "The four-day Inca Trail trek",
      "Sunrise at Machu Picchu's Sun Gate",
      "The Sacred Valley's weaving villages",
      "Cusco's San Pedro Market with a local guide",
    ],
    relatedTourSlugs: ["peru-machu-picchu-inca-trail"],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    region: "Asia",
    heroImg:
      "/images/unsplash/1528127269322-539801943592.jpg",
    gallery: [filler[5], filler[8]],
    hook: "Limestone bays and a coastline that keeps unfolding",
    description:
      "North to south in one trip — Hanoi's old quarter, a night on a Ha Long Bay boat, and the Mekong Delta by smaller and smaller boats the further you go.",
    bestTime: "February–April and August–October",
    quickFacts: {
      currency: "Vietnamese Đồng",
      language: "Vietnamese",
      flightNote: "~16hr via one connection from the US",
      climate: "Tropical, with real variation north to south",
    },
    topExperiences: [
      "A night aboard a Ha Long Bay junk boat",
      "Hanoi's old quarter by street-food crawl",
      "Hoi An's lantern-lit ancient town",
      "The Mekong Delta by small boat",
    ],
    relatedTourSlugs: ["vietnam-north-to-south-explorer"],
  },
  {
    slug: "costa-rica",
    name: "Costa Rica",
    country: "Costa Rica",
    region: "Americas",
    heroImg:
      "/images/unsplash/1518259102261-b40117eabbc9.jpg",
    gallery: [filler[6], filler[1]],
    hook: "Rainforest canopy to volcanic coastline",
    description:
      "Built for families and first-time adventurers alike — cloud forest zip-lines, a wildlife-dense national park, and a beach stretch quiet enough to actually notice the sloths.",
    bestTime: "December through April (dry season)",
    quickFacts: {
      currency: "Costa Rican Colón (USD widely accepted)",
      language: "Spanish",
      flightNote: "~5hr direct from the US",
      climate: "Tropical, with distinct wet and dry seasons",
    },
    topExperiences: [
      "A canopy zip-line through cloud forest",
      "Wildlife spotting in Manuel Antonio",
      "Arenal Volcano hot springs",
      "A guided night walk for nocturnal wildlife",
    ],
    relatedTourSlugs: ["costa-rica-family-rainforest-adventure"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    heroImg:
      "/images/unsplash/1512453979798-5ea266f8880c.jpg",
    gallery: [filler[2], filler[0]],
    hook: "Skyline by night, dunes by day",
    description:
      "A short, dense trip built to contrast — rooftop dinners above the skyline, a private desert safari at golden hour, and a souk crawl for anyone who still wants to haggle.",
    bestTime: "November through March",
    quickFacts: {
      currency: "UAE Dirham",
      language: "Arabic & English",
      flightNote: "~13–14hr direct from the US East Coast",
      climate: "Desert — extremely hot summers, mild winters",
    },
    topExperiences: [
      "A private desert safari at golden hour",
      "Dinner at a rooftop table over the skyline",
      "The Gold and Spice Souks",
      "A dhow cruise along Dubai Creek",
    ],
    relatedTourSlugs: ["dubai-luxury-city-and-desert-escape"],
  },
  {
    slug: "freetown-peninsula",
    name: "Freetown Peninsula",
    country: "Sierra Leone",
    region: "Africa",
    heroImg:
      "/images/unsplash/1611395813517-41f9be5e292d.jpg",
    gallery: [
      "/images/unsplash/1624832040555-d9f92f7be672.jpg",
      filler[0],
    ],
    hook: "Golden beaches, twenty minutes from the airport",
    description:
      "The coastline south of Freetown — Lumley, Tokeh, Bureh, and River No. 2 — palm-backed sand, fresh grilled fish, and some of West Africa's best surf, without the crowds of better-known coasts.",
    bestTime: "November through April (dry season)",
    quickFacts: {
      currency: "Sierra Leonean Leone (NLe)",
      language: "Krio & English",
      flightNote: "Direct international flights into Freetown (FNA), then a short ferry or water-taxi across the estuary",
      climate: "Tropical — hot and humid, with a May–October rainy season",
    },
    topExperiences: [
      "Surfing at Bureh Beach with the local surf club",
      "Grilled barracuda on the sand at River No. 2",
      "Sunset drinks at Lumley Beach",
      "A hike up to Leicester Peak for a view over Freetown",
    ],
    relatedTourSlugs: ["freetown-peninsula-beach-escape"],
  },
  {
    slug: "tiwai-island",
    name: "Tiwai Island",
    country: "Sierra Leone",
    region: "Africa",
    heroImg:
      "/images/unsplash/1602298674761-700e96568f5f.jpg",
    gallery: [
      "/images/unsplash/1544519954-6aeb4816f0ab.jpg",
      filler[4],
    ],
    hook: "Rainforest island, eleven primate species",
    description:
      "A protected wildlife sanctuary on the Moa River in the Gola rainforest belt — pygmy hippos, eleven primate species including the rare Diana monkey, and forest walks led by guides from the communities who co-manage the reserve.",
    bestTime: "November through April (dry season, easier trails)",
    quickFacts: {
      currency: "Sierra Leonean Leone (NLe)",
      language: "Mende & English",
      flightNote: "Domestic transfer to Bo or Kenema, then a road and canoe crossing to the island",
      climate: "Tropical rainforest — humid year-round, heaviest rain June–September",
    },
    topExperiences: [
      "A dawn primate walk with a community guide",
      "Canoeing the Moa River at dusk for hippo sign",
      "A guided night walk for nocturnal wildlife",
      "Visiting the Mende villages that co-manage the reserve",
    ],
    relatedTourSlugs: ["tiwai-island-rainforest-safari"],
  },
  {
    slug: "banana-islands",
    name: "Banana Islands",
    country: "Sierra Leone",
    region: "Africa",
    heroImg:
      "/images/unsplash/1625001071825-0a85373c8972.jpg",
    gallery: [
      "/images/unsplash/1600550132115-64a9ee300763.jpg",
      filler[8],
    ],
    hook: "Three islands, no cars, no crowds",
    description:
      "A short boat ride from the peninsula to Dublin, Ricketts, and Mes-Meheux — reef snorkeling, a slave-trade-era history that's still visible on the shoreline, and an off-grid pace that's part of the draw.",
    bestTime: "November through April (dry season, calmest seas)",
    quickFacts: {
      currency: "Sierra Leonean Leone (NLe)",
      language: "Krio & English",
      flightNote: "Road transfer to Kent, then a roughly 20-minute boat crossing",
      climate: "Tropical — hot and humid, calmest seas in dry season",
    },
    topExperiences: [
      "Snorkeling the reef off Dublin island",
      "A walk to the old British gun emplacements",
      "Fishing with local boat crews",
      "A slow crossing back to the peninsula at sunset",
    ],
    relatedTourSlugs: ["banana-islands-snorkel-and-history"],
  },
  {
    slug: "mecca-medina",
    name: "Mecca & Medina",
    country: "Saudi Arabia",
    region: "Middle East",
    heroImg:
      "/images/unsplash/1579305796538-03268c05b65c.jpg",
    gallery: [
      "/images/unsplash/1568009167523-043c39300e67.jpg",
      filler[2],
    ],
    hook: "Hajj and Umrah, planned end to end",
    description:
      "Pilgrimage travel handled the way it should be — flights, Saudi entry permits, and vetted accommodation near the Haramain, arranged by a team that treats the paperwork as seriously as the journey itself.",
    bestTime: "Hajj falls on the Islamic lunar calendar; Umrah can be made most of the year",
    quickFacts: {
      currency: "Saudi Riyal (SAR)",
      language: "Arabic",
      flightNote: "Direct and connecting flights into Jeddah (JED) or Madinah (MED)",
      climate: "Arid desert — extremely hot April–October, mild November–March",
    },
    topExperiences: [
      "Tawaf at the Kaaba in Mecca's Masjid al-Haram",
      "Prayers at the Prophet's Mosque in Medina",
      "A guided orientation on the rites of Hajj/Umrah before you travel",
      "Group departures organized around the Hajj season",
    ],
    relatedTourSlugs: ["umrah-guided-pilgrimage"],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export const regions: Region[] = ["Asia", "Europe", "Africa", "Americas", "Oceania", "Middle East"];
