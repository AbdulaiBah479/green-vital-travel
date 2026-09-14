import { describe, expect, it } from "vitest";
import { getBotReply, GREETING, START_REPLIES } from "./chatbot";

describe("chatbot pricing boundary", () => {
  it("never quotes a fee or dollar figure when asked about cost", () => {
    const reply = getBotReply("how much does this cost");
    expect(reply.text).not.toMatch(/\$\d/);
    expect(reply.text.toLowerCase()).toContain("team");
  });

  it("redirects budget questions the same way", () => {
    const reply = getBotReply("is there a minimum budget");
    expect(reply.text).not.toMatch(/\$\d/);
  });

  it("keeps pricing out of the greeting", () => {
    expect(GREETING.text.toLowerCase()).not.toContain("pricing");
  });

  it("keeps pricing out of the starter quick replies", () => {
    const labels = START_REPLIES.map((r) => r.label.toLowerCase());
    expect(labels.some((l) => l.includes("pricing") || l.includes("fee"))).toBe(false);
  });
});

describe("chatbot identity", () => {
  it("discloses it's an AI, not a human, when asked directly", () => {
    const reply = getBotReply("are you a real person");
    expect(reply.text.toLowerCase()).toContain("ai");
  });
});
