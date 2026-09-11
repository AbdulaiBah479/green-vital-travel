import { describe, expect, it } from "vitest";
import {
  bookingSchema,
  contactSchema,
  HONEYPOT_FIELD,
  isSpam,
  newsletterSchema,
  reviewSchema,
} from "./validation";

describe("isSpam", () => {
  it("flags a filled honeypot field", () => {
    expect(isSpam({ [HONEYPOT_FIELD]: "http://spam.example" })).toBe(true);
  });

  it("ignores a whitespace-only honeypot", () => {
    expect(isSpam({ [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("passes real submissions with no honeypot value", () => {
    expect(isSpam({ name: "Real Visitor" })).toBe(false);
  });
});

describe("contactSchema", () => {
  it("accepts a complete, valid submission", () => {
    const result = contactSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Plan a new trip",
      message: "Hello!",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "ada@example.com",
      subject: "Plan a new trip",
      message: "Hello!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "not-an-email",
      subject: "Plan a new trip",
      message: "Hello!",
    });
    expect(result.success).toBe(false);
  });
});

describe("bookingSchema", () => {
  const base = {
    tourSlug: "kyoto-temples-and-tea-culture",
    tourTitle: "Kyoto: Temples & Tea Culture",
    departureDate: "2026-10-12",
    travelers: 2,
    leadName: "Ada Lovelace",
    leadEmail: "ada@example.com",
    total: 8400,
  };

  it("defaults addOns when omitted entirely", () => {
    const result = bookingSchema.safeParse(base);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.addOns).toEqual({ insurance: false, transfer: false, roomUpgrade: false });
    }
  });

  it("coerces a stringified traveler count from form data", () => {
    const result = bookingSchema.safeParse({ ...base, travelers: "3" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.travelers).toBe(3);
  });

  it("rejects a group size above the sanity cap", () => {
    const result = bookingSchema.safeParse({ ...base, travelers: 999 });
    expect(result.success).toBe(false);
  });

  it("rejects a missing departure date", () => {
    const result = bookingSchema.safeParse({ ...base, departureDate: "" });
    expect(result.success).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "traveler@example.com" }).success).toBe(true);
  });

  it("rejects an empty email", () => {
    expect(newsletterSchema.safeParse({ email: "" }).success).toBe(false);
  });
});

describe("reviewSchema", () => {
  it("accepts a valid 1-5 rating", () => {
    const result = reviewSchema.safeParse({
      tourSlug: "kyoto-temples-and-tea-culture",
      rating: 5,
      name: "Ada",
      body: "Wonderful trip.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a rating outside 1-5", () => {
    const result = reviewSchema.safeParse({
      tourSlug: "kyoto-temples-and-tea-culture",
      rating: 6,
      name: "Ada",
      body: "Wonderful trip.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-integer rating", () => {
    const result = reviewSchema.safeParse({
      tourSlug: "kyoto-temples-and-tea-culture",
      rating: 4.5,
      name: "Ada",
      body: "Wonderful trip.",
    });
    expect(result.success).toBe(false);
  });
});
