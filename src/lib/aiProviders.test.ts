import { afterEach, describe, expect, it, vi } from "vitest";
import { getConfiguredProviders } from "./aiProviders";

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
