"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { FALLBACK_RATES, type CurrencyCode, type Rates, formatPrice as formatPriceFor } from "./currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
const STORAGE_KEY = "greenvital-currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);

  useEffect(() => {
    // Reads localStorage after mount rather than in a lazy useState
    // initializer on purpose — the initializer would run during SSR (where
    // localStorage doesn't exist) and produce a client/server markup
    // mismatch on first paint. The one-render cost here is intentional.
    const stored = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCurrencyState(stored);
  }, []);

  useEffect(() => {
    // Live rates are a nice-to-have layered on top of the fallback table,
    // never a requirement — any failure here (offline, upstream down) just
    // leaves FALLBACK_RATES in place, so prices are always at least
    // approximately right and never blocked on this request.
    let cancelled = false;
    fetch("/api/rates")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.rates) setRates(data.rates);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    window.localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const formatPrice = useCallback((usd: number) => formatPriceFor(usd, currency, rates), [currency, rates]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
