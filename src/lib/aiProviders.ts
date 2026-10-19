// A small chain of free AI providers, tried in order, so the chatbot keeps
// giving real AI answers even if one provider is rate-limited or briefly
// down — only the rule-based bot (a separate, final fallback) is used if
// every provider in this list fails. All of these expose an OpenAI-compatible
// chat completions endpoint, so one plain-fetch caller works for all of them
// — no need for a separate SDK per provider. Four independent free tiers
// means all of them running dry on the same day is very unlikely.
export type AiProvider = {
  name: string;
  apiKey: string;
  baseURL: string;
  model: string;
  /** Provider-specific request fields beyond the standard OpenAI shape. */
  extraBody?: Record<string, unknown>;
  /** Provider-specific headers beyond Content-Type/Authorization. */
  extraHeaders?: Record<string, string>;
};

export function getConfiguredProviders(): AiProvider[] {
  const providers: (AiProvider | null)[] = [
    process.env.GROQ_API_KEY
      ? {
          name: "groq",
          apiKey: process.env.GROQ_API_KEY,
          baseURL: "https://api.groq.com/openai/v1",
          model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
          // gpt-oss (and other reasoning-capable) models otherwise mix a
          // visible chain-of-thought preamble into the response text.
          extraBody: { reasoning_format: "hidden" },
        }
      : null,
    process.env.GEMINI_API_KEY
      ? {
          name: "gemini",
          apiKey: process.env.GEMINI_API_KEY,
          baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
          model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
        }
      : null,
    process.env.CEREBRAS_API_KEY
      ? {
          name: "cerebras",
          apiKey: process.env.CEREBRAS_API_KEY,
          baseURL: "https://api.cerebras.ai/v1",
          model: process.env.CEREBRAS_MODEL || "llama-3.3-70b",
        }
      : null,
    process.env.OPENROUTER_API_KEY
      ? {
          name: "openrouter",
          apiKey: process.env.OPENROUTER_API_KEY,
          baseURL: "https://openrouter.ai/api/v1",
          model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free",
          // OpenRouter asks free-tier callers to identify the calling site —
          // it's optional, but omitting it makes usage harder for them to
          // attribute and can affect free-tier rate limits.
          extraHeaders: { "HTTP-Referer": "https://gtravelsandtours.com", "X-Title": "Green Vital" },
        }
      : null,
  ];
  return providers.filter((p): p is AiProvider => p !== null);
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callProvider(
  provider: AiProvider,
  messages: ChatMessage[],
  // High enough for a genuine "what do I need to know before visiting X"
  // travel briefing, not just a one-line answer — the system prompt asks
  // the model to match length to the question, so this is a ceiling for the
  // thorough case, not a target for every reply. Callers with a
  // legitimately longer output (e.g. a multi-day itinerary draft) can raise
  // this rather than get silently truncated at chatbot-reply length.
  maxTokens = 800
): Promise<string> {
  const response = await fetch(`${provider.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
      ...provider.extraHeaders,
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.4,
      max_tokens: maxTokens,
      messages,
      ...provider.extraBody,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`${provider.name} responded ${response.status}: ${errorText.slice(0, 300)}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error(`${provider.name} returned an empty completion`);
  return stripMarkdown(text);
}

// The system prompt tells every model not to use markdown, since replies
// render as plain text in a chat bubble — but models don't reliably follow
// that, so strip the common cases defensively rather than show visitors
// literal "**", "#", or "`" characters.
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, "$1")
    .replace(/(?<!\w)_(?!\s)(.+?)(?<!\s)_(?!\w)/g, "$1")
    .replace(/`{1,3}(.+?)`{1,3}/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "• ");
}
