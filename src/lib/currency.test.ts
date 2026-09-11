import { describe, expect, it } from "vitest";
import { convert, FALLBACK_RATES, formatPrice } from "./currency";

describe("convert", () => {
  it("returns the same amount for USD", () => {
    expect(convert(100, "USD")).toBe(100);
  });

  it("applies the given rate for a non-USD currency", () => {
    expect(convert(100, "EUR", { ...FALLBACK_RATES, EUR: 0.9 })).toBeCloseTo(90);
  });
});

describe("formatPrice", () => {
  it("uses the currency's symbol", () => {
    expect(formatPrice(100, "GBP", { ...FALLBACK_RATES, GBP: 0.8 })).toBe("£80");
  });

  it("rounds small amounts to the nearest whole unit", () => {
    expect(formatPrice(99.6, "USD")).toBe("$100");
  });

  it("rounds amounts of 1000+ to the nearest 10", () => {
    // 4200 * 22.5 = 94500, exercising the >=1000 rounding branch.
    expect(formatPrice(4200, "SLE", FALLBACK_RATES)).toBe("NLe94,500");
  });

  it("falls back to $ for an unrecognized currency code", () => {
    // @ts-expect-error deliberately passing an invalid code to exercise the fallback
    expect(formatPrice(50, "XYZ")).toBe("$50");
  });
});
