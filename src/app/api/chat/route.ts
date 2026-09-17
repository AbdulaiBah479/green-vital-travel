import { NextResponse } from "next/server";
import { z } from "zod";
import { getBotReply } from "@/lib/chatbot";
import { buildSystemPrompt } from "@/lib/aiChatbot";
import { getConfiguredProviders, callProvider } from "@/lib/aiProviders";
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
  const providers = getConfiguredProviders();

  // No AI provider configured at all — fall back to the rule-based
  // assistant rather than break the chat entirely. Same "degrade, don't
  // break" pattern as the email/database fallbacks in lib/inquiries.ts.
  if (providers.length === 0) {
    const reply = getBotReply(message);
    return NextResponse.json({ text: reply.text, quickReplies: reply.quickReplies, source: "rules" });
  }

  const messages = [
    { role: "system" as const, content: getSystemPrompt() },
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user" as const, content: message },
  ];

  // TEMPORARY: lets a specific provider be tested directly (bypassing the
  // ones ahead of it in the chain) — e.g. ?debugProvider=gemini — since
  // otherwise Groq succeeding first would mask whether Gemini itself works.
  // Remove once both layers are confirmed working independently.
  const debugProviderName = new URL(request.url).searchParams.get("debugProvider");
  const orderedProviders = debugProviderName
    ? providers.filter((p) => p.name === debugProviderName)
    : providers;
  if (debugProviderName && orderedProviders.length === 0) {
    return NextResponse.json({ error: `No configured provider named "${debugProviderName}"` }, { status: 400 });
  }

  // Try each configured provider in order — a rate limit, quota exhaustion,
  // or outage on one just moves to the next, rather than dropping straight
  // to the rule-based bot the way a single-provider setup would.
  for (const provider of orderedProviders) {
    try {
      const text = await callProvider(provider, messages);
      return NextResponse.json({ text, source: "ai", provider: provider.name });
    } catch (error) {
      console.error(`${provider.name} chat completion failed, trying next provider:`, error);
      if (debugProviderName) {
        const debugError = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "debug provider failed", debugError }, { status: 502 });
      }
    }
  }

  // Every provider failed — the visitor still gets a real answer instead of
  // an error.
  const reply = getBotReply(message);
  return NextResponse.json({ text: reply.text, quickReplies: reply.quickReplies, source: "rules-fallback" });
}
