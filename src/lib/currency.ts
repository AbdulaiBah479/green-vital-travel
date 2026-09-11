export type CurrencyCode = "USD" | "SLE" | "EUR" | "GBP" | "AUD" | "CAD";

export const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "SLE", label: "Sierra Leonean Leone", symbol: "NLe" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$" },
];

export type Rates = Record<CurrencyCode, number>;

// Used the instant the page loads (before the live feed answers) and again
// any time that feed is unreachable — kept close to real-world rates so the
// fallback is never wildly off, but it will drift over time. See
// /api/rates for the actual live source.
export const FALLBACK_RATES: Rates = {
  USD: 1,
  SLE: 22.5,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
};

export function convert(usd: number, currency: CurrencyCode, rates: Rates = FALLBACK_RATES): number {
  return usd * rates[currency];
}

export function formatPrice(usd: number, currency: CurrencyCode, rates: Rates = FALLBACK_RATES): string {
  const amount = convert(usd, currency, rates);
  const symbol = currencies.find((c) => c.code === currency)?.symbol ?? "$";
  const rounded = amount >= 1000 ? Math.round(amount / 10) * 10 : Math.round(amount);
  return `${symbol}${rounded.toLocaleString("en-US")}`;
}
