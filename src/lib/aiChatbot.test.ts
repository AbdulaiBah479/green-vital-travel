import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "./aiChatbot";
import { destinations } from "./destinations";
import { tours } from "./tours";
import { contact } from "./site";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt();

  it("instructs the model never to discuss money in any form", () => {
    expect(prompt.toLowerCase()).toContain("never discuss money in any form");
  });

  it("instructs the model to still give real travel knowledge for any destination worldwide", () => {
    const lower = prompt.toLowerCase();
    expect(lower).toContain("any destination on earth");
    expect(lower).toContain("genuinely useful travel guidance");
  });

  it("grounds the model in every real destination and tour", () => {
    for (const d of destinations) expect(prompt).toContain(d.name);
    for (const t of tours) expect(prompt).toContain(t.title);
  });

  it("includes real contact details for handoff", () => {
    expect(prompt).toContain(contact.email);
  });

  it("does not contain a literal dollar amount anywhere in the prompt itself", () => {
    expect(prompt).not.toMatch(/\$\d/);
  });

  it("instructs the model to reply in the visitor's own language", () => {
    const lower = prompt.toLowerCase();
    expect(lower).toContain("same language the visitor writes in");
    for (const lang of ["french", "mandarin", "hindi", "arabic", "spanish"]) {
      expect(lower).toContain(lang);
    }
  });

  it("instructs the model to reply in natural Krio, not textbook English", () => {
    const lower = prompt.toLowerCase();
    expect(lower).toContain("krio");
  });
});
