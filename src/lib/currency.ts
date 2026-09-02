export type CurrencyCode = "USD" | "SLE" | "EUR" | "GBP" | "AUD" | "CAD";

export const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "SLE", label: "Sierra Leonean Leone", symbol: "NLe" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$" },
];

// Indicative rates off USD — fixed rather than fetched live, since this
// site has no backend/API budget. Good enough for "what would this
// roughly cost in my currency," not for anything transactional.
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  SLE: 22.5,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
};

export function convert(usd: number, currency: CurrencyCode): number {
  return usd * RATES[currency];
}

export function formatPrice(usd: number, currency: CurrencyCode): string {
  const amount = convert(usd, currency);
  const symbol = currencies.find((c) => c.code === currency)?.symbol ?? "$";
  const rounded = amount >= 1000 ? Math.round(amount / 10) * 10 : Math.round(amount);
  return `${symbol}${rounded.toLocaleString("en-US")}`;
}
