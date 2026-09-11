import { describe, expect, it } from "vitest";
import { activeDeal } from "./tours";
import type { Tour } from "./tours";

function makeTour(overrides: Partial<Tour> = {}): Tour {
  return {
    slug: "test-tour",
    title: "Test Tour",
    destinationSlug: "test-destination",
    category: "Cultural",
    nights: 5,
    priceFrom: 1000,
    rating: 5,
    reviewCount: 0,
    groupSizeMax: 8,
    difficulty: "Easy",
    summary: "",
    heroImg: "",
    gallery: [],
    highlights: [],
    itinerary: [],
    included: [],
    excluded: [],
    departureDates: [],
    ...overrides,
  };
}

describe("activeDeal", () => {
  it("returns undefined when a tour has no deal", () => {
    expect(activeDeal(makeTour())).toBeUndefined();
  });

  it("returns the deal when its end date is in the future", () => {
    const deal = { percentOff: 10, label: "Test Sale", endsIso: "2099-01-01" };
    expect(activeDeal(makeTour({ deal }))).toEqual(deal);
  });

  it("returns undefined once the end date has passed", () => {
    const deal = { percentOff: 10, label: "Expired Sale", endsIso: "2000-01-01" };
    expect(activeDeal(makeTour({ deal }))).toBeUndefined();
  });
});
