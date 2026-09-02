"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { type CurrencyCode, formatPrice as formatPriceFor } from "./currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
const STORAGE_KEY = "krishna-travels-currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    // Reads localStorage after mount rather than in a lazy useState
    // initializer on purpose — the initializer would run during SSR (where
    // localStorage doesn't exist) and produce a client/server markup
    // mismatch on first paint. The one-render cost here is intentional.
    const stored = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCurrencyState(stored);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    window.localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const formatPrice = useCallback((usd: number) => formatPriceFor(usd, currency), [currency]);

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
