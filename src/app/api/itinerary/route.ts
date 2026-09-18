import { NextResponse } from "next/server";
import { z } from "zod";
import { getConfiguredProviders, callProvider } from "@/lib/aiProviders";
import { destinations } from "@/lib/destinations";
import { toursForDestination } from "@/lib/tours";
import { getClimateSummary } from "@/lib/weather";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { TOOLS_COOKIE_NAME, isValidSession } from "@/lib/toolsAuth";
import { siteFullName } from "@/lib/site";

const MONTH_INDEX: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const schema = z.object({
  destination: z.string().trim().min(1, "Enter a destination.").max(200),
  days: z.coerce.number().int().min(1).max(60),
  groupSize: z.string().trim().max(200).optional().default(""),
  month: z.string().trim().optional(),
  notes: z.string().trim().max(1000).optional().default(""),
});

function findMatchingDestination(query: string) {
  const q = query.toLowerCase();
  return destinations.find(
    (d) => q.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(q) || q.includes(d.country.toLowerCase())
  );
}

function getSessionCookie(request: Request): string | undefined {
  const header = request.headers.get("cookie") ?? "";
  return header
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${TOOLS_COOKIE_NAME}=`))
    ?.split("=")[1];
}

export async function POST(request: Request) {
  if (!(await isValidSession(getSessionCookie(request)))) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  // A generous but real ceiling — this is a staff-only tool, not a public
  // one, but each request still calls a free AI provider and shouldn't run
  // unbounded.
  if (!rateLimit(`itinerary:${clientKey(request)}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many drafts requested recently. Wait a bit and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input." }, { status: 400 });
  }

  const { destination, days, groupSize, month, notes } = parsed.data;
  const providers = getConfiguredProviders();
  if (providers.length === 0) {
    return NextResponse.json({ error: "No AI provider is configured yet." }, { status: 503 });
  }

  const matchedDestination = findMatchingDestination(destination);
  const matchedTours = matchedDestination ? toursForDestination(matchedDestination.slug) : [];

  let climateNote: string | null = null;
  let climateBlock = "";
  const monthNumber = month ? MONTH_INDEX[month] : undefined;
  if (monthNumber) {
    const climate = await getClimateSummary(destination, monthNumber);
    if (climate) {
      climateNote =
        `Real historical weather for ${climate.place}${climate.country ? `, ${climate.country}` : ""} in ` +
        `${climate.month} (based on ${climate.dataYear} data): average high ${climate.avgHighC}°C, ` +
        `average low ${climate.avgLowC}°C, rain on roughly ${climate.rainyDays} of ${climate.totalDays} days.`;
      climateBlock = `\n\nReal historical climate data for this destination in ${climate.month} (from ${climate.dataYear}, the most recent complete occurrence of that month): average daily high ${climate.avgHighC}°C, average daily low ${climate.avgLowC}°C, precipitation on about ${climate.rainyDays} of ${climate.totalDays} days. Use this real data to inform packing and pacing advice instead of guessing.`;
    }
  }

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  let greenVitalBlock: string;
  if (matchedDestination) {
    greenVitalBlock = `\n\n${siteFullName} already has a real, existing package for this destination: "${matchedDestination.name}, ${matchedDestination.country}" — ${matchedDestination.hook}. Best time to visit per our own listing: ${matchedDestination.bestTime}. Top experiences: ${matchedDestination.topExperiences.join(", ")}.`;
    if (matchedTours.length > 0) {
      greenVitalBlock += `\nExisting tour package(s) for this destination: ${matchedTours
        .map((t) => `"${t.title}" (${t.nights} nights, ${t.category}, ${t.difficulty} pace)`)
        .join("; ")}. Base the draft on the real structure of the closest matching package where it fits the brief, adapting it rather than ignoring it.`;
    }
  } else {
    greenVitalBlock = `\n\n${siteFullName} doesn't have an existing pre-built package for this destination — this would be a fully custom itinerary. Say so plainly in the draft rather than implying it's an existing package.`;
  }

  const prompt = `You are an internal trip-planning assistant for staff at ${siteFullName}, a real travel agency. You are drafting a first-pass itinerary for a staff member to review, edit, and personalize before it ever reaches a client — not a final document, and not something sent automatically to anyone.

Today's real date is ${today}.

Trip brief:
- Destination: ${destination}
- Length: ${days} days
- Travelers: ${groupSize || "not specified"}
- Approximate travel month: ${month || "not specified"}
- Notes: ${notes || "none"}
${greenVitalBlock}${climateBlock}

Rules:
1. NEVER mention prices, costs, fees, currency amounts, or budgets in any form. This is a hard rule with no exceptions — pricing is handled separately by staff.
2. Write a clear day-by-day structure (Day 1, Day 2, etc., grouping multi-day stretches where that makes sense for a ${days}-day trip).
3. Be specific and genuinely useful — real neighborhoods, real activities, realistic pacing for the stated travelers — not vague filler.
4. Plain text only, no markdown formatting (no #, *, or **), since this will be copied directly into a message.
5. If real historical climate data was provided above, actually use it to inform packing notes and pacing (e.g. avoid over-scheduling outdoor days if rain is frequent).`;

  const messages = [{ role: "user" as const, content: prompt }];
  // Scales with trip length so a 30-day itinerary isn't cut off at the same
  // budget as a long weekend, capped so one request can't run away.
  const maxTokens = Math.min(2000, 400 + days * 40);

  for (const provider of providers) {
    try {
      const text = await callProvider(provider, messages, maxTokens);
      return NextResponse.json({ itinerary: text, climateNote, provider: provider.name });
    } catch (error) {
      console.error(`${provider.name} itinerary draft failed, trying next provider:`, error);
    }
  }

  return NextResponse.json({ error: "Every AI provider failed to respond. Try again shortly." }, { status: 502 });
}
