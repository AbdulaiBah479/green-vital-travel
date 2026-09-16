// All destination content lives in content/destinations/<slug>.json — editable
// from the admin panel. scripts/build-content-index.mjs aggregates those files
// into _index.json before every dev/build, which is what's imported below (a
// plain JSON import, safe to bundle into client components too, unlike
// reading the filesystem directly at runtime).
import destinationData from "../../content/destinations/_index.json";

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

export const destinations: Destination[] = destinationData as Destination[];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export const regions: Region[] = ["Asia", "Europe", "Africa", "Americas", "Oceania", "Middle East"];
