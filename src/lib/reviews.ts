import { tours } from "./tours";

export type Review = {
  id: string;
  tourSlug: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  name: string;
  location: string;
  date: string;
  isoDate: string;
  verified: boolean;
};

// Empty until real, verifiable traveler reviews come in — never seed this with
// placeholder names or quotes; a fabricated testimonial is a real liability, not
// a cosmetic shortcut.
export const reviews: Review[] = [];

export function reviewsForTour(slug: string) {
  return reviews.filter((r) => r.tourSlug === slug);
}

export function averageRating(list: Review[] = reviews) {
  if (list.length === 0) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}

export function ratingBreakdown(list: Review[] = reviews) {
  const counts: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  list.forEach((r) => {
    counts[r.rating] += 1;
  });
  return counts;
}

export function tourTitle(slug: string) {
  return tours.find((t) => t.slug === slug)?.title ?? "";
}
