import { NextResponse } from "next/server";
import { FALLBACK_RATES, type CurrencyCode, type Rates } from "@/lib/currency";

// Free, open-source, no-API-key exchange-rate feed, updated daily —
// https://github.com/fawazahmed0/currency-api. Two independent hosts mirror
// the same data so one being down doesn't take live rates down with it.
const SOURCES = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
  "https://latest.currency-api.pages.dev/v1/currencies/usd.json",
];

const CURRENCY_KEYS: [CurrencyCode, string][] = [
  ["SLE", "sle"],
  ["EUR", "eur"],
  ["GBP", "gbp"],
  ["AUD", "aud"],
  ["CAD", "cad"],
];

export async function GET() {
  for (const url of SOURCES) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) continue;
      const data = await res.json();
      const usd = data?.usd;
      if (!usd) continue;

      const rates: Rates = { ...FALLBACK_RATES };
      for (const [code, key] of CURRENCY_KEYS) {
        const value = Number(usd[key]);
        if (Number.isFinite(value) && value > 0) rates[code] = value;
      }

      return NextResponse.json(
        { rates, updatedAt: data.date ?? null },
        // Vercel's edge cache serves this for 12h and quietly refreshes in
        // the background after that — visitors never wait on the upstream
        // fetch, and the upstream API sees a trickle of traffic, not one
        // request per page load.
        { headers: { "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400" } }
      );
    } catch {
      // Try the next source.
    }
  }

  return NextResponse.json({ rates: FALLBACK_RATES, updatedAt: null, fallback: true });
}
