// Real, live climate data for any destination worldwide — geocoded and
// fetched from Open-Meteo (open-meteo.com), a free, keyless public weather
// API covering the whole globe back to 1940. Used only to ground the
// itinerary assistant's packing/pacing advice in actual historical
// conditions for the requested place and month, rather than the AI's fuzzy
// training-data impression of "it's probably hot there." Best-effort only —
// every failure mode returns null rather than throwing, since a missing
// weather API should never break the itinerary draft itself.
const FETCH_TIMEOUT_MS = 5000;

export type ClimateSummary = {
  place: string;
  country: string;
  month: string;
  avgHighC: number;
  avgLowC: number;
  rainyDays: number;
  totalDays: number;
  dataYear: number;
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function geocode(query: string): Promise<{ lat: number; lon: number; name: string; country: string } | null> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const results: Array<{
    latitude: number;
    longitude: number;
    name: string;
    country?: string;
    population?: number;
  }> = data?.results ?? [];
  if (results.length === 0) return null;

  // The API's default relevance ranking is name-similarity first, which can
  // put an obscure same-named village ahead of the actual well-known
  // destination (confirmed live: searching "Bali" ranked a small town in
  // India above the Indonesian island with 4M+ people). For travel
  // planning, the most populous match for a given name is overwhelmingly
  // more likely to be the intended place.
  const best = results.reduce((a, b) => ((b.population ?? 0) > (a.population ?? 0) ? b : a));
  return { lat: best.latitude, lon: best.longitude, name: best.name, country: best.country ?? "" };
}

// Historical data only exists for the past, so the freshest real data for a
// given calendar month is always its most recent COMPLETE occurrence — this
// year's if that month has already fully finished, last year's otherwise
// (which also covers "this is the current month, still in progress").
function mostRecentCompleteYear(month: number, now: Date): number {
  const currentMonth = now.getUTCMonth() + 1;
  const currentYear = now.getUTCFullYear();
  return month >= currentMonth ? currentYear - 1 : currentYear;
}

export async function getClimateSummary(destination: string, month: number): Promise<ClimateSummary | null> {
  try {
    const place = await geocode(destination);
    if (!place) return null;

    const year = mostRecentCompleteYear(month, new Date());
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${place.lat}&longitude=${place.lon}` +
        `&start_date=${startDate}&end_date=${endDate}` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
      { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const highs: number[] = data?.daily?.temperature_2m_max ?? [];
    const lows: number[] = data?.daily?.temperature_2m_min ?? [];
    const precip: number[] = data?.daily?.precipitation_sum ?? [];
    if (highs.length === 0 || lows.length === 0) return null;

    const avg = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length;

    return {
      place: place.name,
      country: place.country,
      month: MONTH_NAMES[month - 1],
      avgHighC: Math.round(avg(highs)),
      avgLowC: Math.round(avg(lows)),
      rainyDays: precip.filter((p) => p > 1).length,
      totalDays: precip.length,
      dataYear: year,
    };
  } catch {
    return null;
  }
}
