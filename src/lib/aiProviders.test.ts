import { afterEach, describe, expect, it, vi } from "vitest";
import { getConfiguredProviders, stripMarkdown } from "./aiProviders";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getConfiguredProviders", () => {
  it("returns no providers when neither key is set", () => {
    vi.stubEnv("GROQ_API_KEY", "");
    vi.stubEnv("GEMINI_API_KEY", "");
    expect(getConfiguredProviders()).toEqual([]);
  });

  it("puts Groq first and Gemini second when both are configured", () => {
    vi.stubEnv("GROQ_API_KEY", "groq-key");
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    const providers = getConfiguredProviders();
    expect(providers.map((p) => p.name)).toEqual(["groq", "gemini"]);
  });

  it("only includes the provider whose key is actually set", () => {
    vi.stubEnv("GROQ_API_KEY", "");
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    const providers = getConfiguredProviders();
    expect(providers.map((p) => p.name)).toEqual(["gemini"]);
  });

  it("hides Groq's reasoning trace but leaves Gemini's request plain", () => {
    vi.stubEnv("GROQ_API_KEY", "groq-key");
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    const [groq, gemini] = getConfiguredProviders();
    expect(groq.extraBody).toEqual({ reasoning_format: "hidden" });
    expect(gemini.extraBody).toBeUndefined();
  });
});

describe("stripMarkdown", () => {
  it("removes bold, matching a real reply seen from the model", () => {
    expect(stripMarkdown('We have one tour: **"Kyoto: Temples & Tea Culture"** — easy pace.')).toBe(
      'We have one tour: "Kyoto: Temples & Tea Culture" — easy pace.'
    );
  });

  it("removes italic without touching a normal mid-word asterisk-free sentence", () => {
    expect(stripMarkdown("This is *emphasized* text.")).toBe("This is emphasized text.");
    expect(stripMarkdown("A trip that's 5 * fun, guaranteed.")).toBe("A trip that's 5 * fun, guaranteed.");
  });

  it("removes inline code backticks and heading markers", () => {
    expect(stripMarkdown("Use `GROQ_API_KEY` in `.env`.")).toBe("Use GROQ_API_KEY in .env.");
    expect(stripMarkdown("## Destinations\nKyoto is lovely.")).toBe("Destinations\nKyoto is lovely.");
  });

  it("converts markdown bullet lists to a plain bullet character", () => {
    expect(stripMarkdown("- Flights\n- Hotels\n* Visas")).toBe("• Flights\n• Hotels\n• Visas");
  });

  it("leaves already-plain text untouched", () => {
    const plain = "Kyoto has one tour available, starting from a custom quote.";
    expect(stripMarkdown(plain)).toBe(plain);
  });
});
