import { describe, expect, it } from "vitest";
import { featuredGoogleReview, googleReviews } from "./googleReviews";

describe("googleReviews", () => {
  it("lists only reviews that have a name, a valid rating and written text", () => {
    for (const r of googleReviews) {
      expect(r.name.trim()).not.toBe("");
      expect(r.text.trim()).not.toBe("");
      expect(r.rating).toBeGreaterThanOrEqual(1);
      expect(r.rating).toBeLessThanOrEqual(5);
    }
  });

  it("features the most detailed review", () => {
    const longest = Math.max(...googleReviews.map((r) => r.text.length));
    expect(featuredGoogleReview?.text.length).toBe(longest);
  });
});
