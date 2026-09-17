import { describe, expect, it } from "vitest";
import { contact } from "./site";

describe("contact.whatsapp", () => {
  it("is normalized to bare digits, regardless of how it's stored", () => {
    // wa.me links 404 on anything but digits — no "+", no spaces. The
    // admin panel doesn't enforce that format (a real broken WhatsApp
    // link on the live site, caught by an automated check, is what
    // this test exists to prevent from recurring silently).
    expect(contact.whatsapp).toMatch(/^\d+$/);
  });
});
