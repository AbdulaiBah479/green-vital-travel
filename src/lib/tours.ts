// All tour content lives in content/tours/<slug>.json — editable from the
// admin panel. scripts/build-content-index.mjs aggregates those files into
// _index.json before every dev/build, which is what's imported below (a
// plain JSON import, safe to bundle into client components too, unlike
// reading the filesystem directly at runtime).
import tourData from "../../content/tours/_index.json";

export type TourCategory =
  | "Cultural"
  | "Adventure"
  | "Safari & Wildlife"
  | "Beach & Island"
  | "Family"
  | "Honeymoon"
  | "Small-Group"
  | "Luxury Private"
  | "City & Food"
  | "Pilgrimage";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type ItineraryStop = {
  day: string;
  title: string;
  description: string;
};

export type Tour = {
  slug: string;
  title: string;
  destinationSlug: string;
  category: TourCategory;
  nights: number;
  priceFrom: number;
  rating: number;
  reviewCount: number;
  groupSizeMax: number;
  difficulty: Difficulty;
  summary: string;
  heroImg: string;
  gallery: string[];
  highlights: string[];
  itinerary: ItineraryStop[];
  included: string[];
  excluded: string[];
  departureDates: string[];
};

export const tours: Tour[] = tourData as Tour[];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function toursForDestination(destinationSlug: string) {
  return tours.filter((t) => t.destinationSlug === destinationSlug);
}

// departureDates is plain admin-entered content with no expiry logic of its
// own — left unfiltered, a booking form would keep offering a date that
// already passed the moment "today" catches up to it. Every UI that lists
// departure dates should read through this instead of tour.departureDates
// directly.
export function upcomingDepartureDates(tour: Tour): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return tour.departureDates.filter((d) => new Date(d) >= today);
}

export const categories: TourCategory[] = [
  "Cultural",
  "Adventure",
  "Safari & Wildlife",
  "Beach & Island",
  "Family",
  "Honeymoon",
  "Small-Group",
  "Luxury Private",
  "City & Food",
  "Pilgrimage",
];
