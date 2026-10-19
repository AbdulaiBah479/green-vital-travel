import { afterEach, describe, expect, it, vi } from "vitest";
import { getConfiguredProviders, stripMarkdown } from "./aiProviders";

const ALL_PROVIDER_KEYS = ["GROQ_API_KEY", "GEMINI_API_KEY", "CEREBRAS_API_KEY", "OPENROUTER_API_KEY"];

function stubNoProviders() {
  for (const key of ALL_PROVIDER_KEYS) vi.stubEnv(key, "");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getConfiguredProviders", () => {
  it("returns no providers when no key is set", () => {
    stubNoProviders();
    expect(getConfiguredProviders()).toEqual([]);
  });

  it("orders providers Groq, Gemini, Cerebras, OpenRouter when all four are configured", () => {
    stubNoProviders();
    vi.stubEnv("GROQ_API_KEY", "groq-key");
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    vi.stubEnv("CEREBRAS_API_KEY", "cerebras-key");
    vi.stubEnv("OPENROUTER_API_KEY", "openrouter-key");
    const providers = getConfiguredProviders();
    expect(providers.map((p) => p.name)).toEqual(["groq", "gemini", "cerebras", "openrouter"]);
  });

  it("only includes the providers whose keys are actually set", () => {
    stubNoProviders();
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    vi.stubEnv("OPENROUTER_API_KEY", "openrouter-key");
    const providers = getConfiguredProviders();
    expect(providers.map((p) => p.name)).toEqual(["gemini", "openrouter"]);
  });

  it("hides Groq's reasoning trace but leaves Gemini's and Cerebras's requests plain", () => {
    stubNoProviders();
    vi.stubEnv("GROQ_API_KEY", "groq-key");
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    vi.stubEnv("CEREBRAS_API_KEY", "cerebras-key");
    const [groq, gemini, cerebras] = getConfiguredProviders();
    expect(groq.extraBody).toEqual({ reasoning_format: "hidden" });
    expect(gemini.extraBody).toBeUndefined();
    expect(cerebras.extraBody).toBeUndefined();
  });

  it("sends OpenRouter's required site-attribution headers", () => {
    stubNoProviders();
    vi.stubEnv("OPENROUTER_API_KEY", "openrouter-key");
    const [openrouter] = getConfiguredProviders();
    expect(openrouter.extraHeaders).toEqual({
      "HTTP-Referer": "https://greenvitaltravelandtour.com",
      "X-Title": "Green Vital",
    });
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
