import { describe, expect, it } from "vitest";
import { createReviewToken, readReviewToken, reviewId, type SiteReview } from "./siteReviews";

const secret = "test-secret";
const now = Date.parse("2026-11-01T10:00:00Z");
const review: SiteReview = {
  id: reviewId("Aminata", "Great service", "2026-11-01T09:00:00Z"),
  name: "Aminata",
  rating: 5,
  body: "Great service",
  service: "Air ticket",
  isoDate: "2026-11-01T09:00:00Z",
};

describe("review publish links", () => {
  it("accepts a token it signed", () => {
    expect(readReviewToken(createReviewToken(review, secret), secret, now)).toEqual(review);
  });

  it("rejects a token signed with another secret", () => {
    expect(readReviewToken(createReviewToken(review, "other"), secret, now)).toBeNull();
  });

  it("rejects a token whose review text was changed", () => {
    const [, signature] = createReviewToken(review, secret).split(".");
    const forged = Buffer.from(JSON.stringify({ ...review, body: "Different" })).toString("base64url");
    expect(readReviewToken(`${forged}.${signature}`, secret, now)).toBeNull();
  });

  it("rejects an expired link", () => {
    const later = now + 31 * 24 * 60 * 60 * 1000;
    expect(readReviewToken(createReviewToken(review, secret), secret, later)).toBeNull();
  });

  it("rejects garbage", () => {
    expect(readReviewToken("nonsense", secret, now)).toBeNull();
    expect(readReviewToken("", secret, now)).toBeNull();
  });

  it("gives the same id for the same submission", () => {
    expect(reviewId("A", "B", "C")).toBe(reviewId("A", "B", "C"));
    expect(reviewId("A", "B", "C")).not.toBe(reviewId("A", "B", "D"));
  });
});
