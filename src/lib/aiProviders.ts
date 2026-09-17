// A small chain of free AI providers, tried in order, so the chatbot keeps
// giving real AI answers even if one provider is rate-limited or briefly
// down — only the rule-based bot (a separate, final fallback) is used if
// every provider in this list fails. All of these expose an OpenAI-compatible
// chat completions endpoint, so one plain-fetch caller works for all of them
// — no need for a separate SDK per provider.
export type AiProvider = {
  name: string;
  apiKey: string;
  baseURL: string;
  model: string;
  /** Provider-specific request fields beyond the standard OpenAI shape. */
  extraBody?: Record<string, unknown>;
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
          model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
        }
      : null,
  ];
  return providers.filter((p): p is AiProvider => p !== null);
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callProvider(provider: AiProvider, messages: ChatMessage[]): Promise<string> {
  const response = await fetch(`${provider.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.4,
      max_tokens: 350,
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
  return text;
}
