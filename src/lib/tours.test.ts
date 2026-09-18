import { afterEach, describe, expect, it, vi } from "vitest";
import { upcomingDepartureDates, type Tour } from "./tours";

const baseTour: Tour = {
  slug: "test-tour",
  title: "Test Tour",
  destinationSlug: "test",
  category: "Cultural",
  nights: 5,
  priceFrom: 1000,
  rating: 4.5,
  reviewCount: 10,
  groupSizeMax: 10,
  difficulty: "Easy",
  summary: "",
  heroImg: "",
  gallery: [],
  highlights: [],
  itinerary: [],
  included: [],
  excluded: [],
  departureDates: ["2026-01-01", "2026-06-15", "2026-12-25"],
};

describe("upcomingDepartureDates", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("filters out dates that have already passed", () => {
    // A real bug this exists to prevent: booking dropdowns rendering
    // tour.departureDates directly would keep offering a departure that
    // already happened the moment "today" caught up to it.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18"));
    expect(upcomingDepartureDates(baseTour)).toEqual(["2026-12-25"]);
  });

  it("keeps every date when none have passed yet", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-01"));
    expect(upcomingDepartureDates(baseTour)).toEqual(["2026-01-01", "2026-06-15", "2026-12-25"]);
  });

  it("returns an empty array once every listed date has passed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-01-01"));
    expect(upcomingDepartureDates(baseTour)).toEqual([]);
  });
});
