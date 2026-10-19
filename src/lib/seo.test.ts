import { describe, expect, it } from "vitest";
import { metaDescription } from "./seo";

describe("metaDescription", () => {
  it("leaves short text unchanged", () => {
    expect(metaDescription("Short and sweet.")).toBe("Short and sweet.");
  });

  it("ends on a full sentence when one fits comfortably", () => {
    const text = `${"A".repeat(100)} word. ${"B".repeat(200)}`;
    expect(metaDescription(text)).toBe(`${"A".repeat(100)} word.`);
  });

  it("falls back to a word boundary with an ellipsis, within the limit", () => {
    const text = "word ".repeat(100);
    const out = metaDescription(text);
    expect(out.length).toBeLessThanOrEqual(155);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/\s…$/);
  });
});
