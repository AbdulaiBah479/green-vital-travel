import { NextResponse } from "next/server";
import { z } from "zod";
import Groq from "groq-sdk";
import { getBotReply } from "@/lib/chatbot";
import { buildSystemPrompt, AI_MODEL } from "@/lib/aiChatbot";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { firstIssueMessage } from "@/lib/validation";

const chatSchema = z.object({
  message: z.string().trim().min(1, "Message can't be empty.").max(1000, "Please keep messages under 1000 characters."),
  // Short window only — enough for the model to follow the conversation,
  // not enough to let one visitor run up a large token bill per message.
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1000),
      })
    )
    .max(10)
    .optional()
    .default([]),
});

// Built once per warm server instance rather than per request — the data it
// reads from (tours/destinations) only changes on deploy, not per visitor.
let cachedSystemPrompt: string | null = null;
function getSystemPrompt(): string {
  if (!cachedSystemPrompt) cachedSystemPrompt = buildSystemPrompt();
  return cachedSystemPrompt;
}

export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientKey(request)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many messages recently. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: firstIssueMessage(parsed.error, "Please send a valid message.") },
      { status: 400 }
    );
  }

  const { message, history } = parsed.data;

  // No API key configured — fall back to the original rule-based assistant
  // rather than break the chat entirely. Same "degrade, don't break" pattern
  // as the email/database fallbacks in lib/inquiries.ts.
  if (!process.env.GROQ_API_KEY) {
    const reply = getBotReply(message);
    return NextResponse.json({ text: reply.text, quickReplies: reply.quickReplies, source: "rules" });
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.4,
      max_tokens: 350,
      messages: [
        { role: "system", content: getSystemPrompt() },
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: message },
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty completion returned from Groq");

    return NextResponse.json({ text, source: "ai" });
  } catch (error) {
    // A bad/missing key, an exhausted free quota, or a transient outage all
    // land here — the visitor still gets a real answer instead of an error.
    console.error("Groq chat completion failed, falling back to rule-based bot:", error);
    const reply = getBotReply(message);
    // TEMPORARY diagnostic field — remove once the Groq failure is
    // understood. Never ship raw error text to end users permanently.
    const debugError = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ text: reply.text, quickReplies: reply.quickReplies, source: "rules-fallback", debugError, debugModel: AI_MODEL, debugHasKey: Boolean(process.env.GROQ_API_KEY) });
  }
}
