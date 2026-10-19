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

describe("chatbot fallback answers real, common questions", () => {
  it("answers a visa question instead of giving up", () => {
    const reply = getBotReply("what do I need for a visa to Dubai");
    expect(reply.text.toLowerCase()).toContain("visa");
    expect(reply.text).not.toContain("I don't have a confident answer");
  });

  it("confirms hotel bookings are a real service", () => {
    const reply = getBotReply("do you help with hotel bookings");
    expect(reply.text.toLowerCase()).toContain("hotel");
    expect(reply.text).not.toContain("I don't have a confident answer");
  });

  it("confirms car hire is a real service", () => {
    const reply = getBotReply("can I rent a car through you");
    expect(reply.text).not.toContain("I don't have a confident answer");
  });

  it("confirms travel insurance is a real service", () => {
    const reply = getBotReply("what about travel insurance");
    expect(reply.text).not.toContain("I don't have a confident answer");
  });
});

describe("chatbot identity phrasing", () => {
  it.each(["are you a real person", "Are you real?", "are you a real human", "r u a bot", "are you actually a person"])(
    "admits it is an AI for %j",
    (question) => {
      const reply = getBotReply(question).text.toLowerCase();
      // Must be the disclosure itself, not an incidental word like "email" containing "ai".
      expect(reply).toContain("i'm an ai assistant");
    }
  );

  it("still routes 'I want to talk to a real person' to the contact answer", () => {
    expect(getBotReply("I want to talk to a real person").text).toContain("reaches a real person");
  });
});
