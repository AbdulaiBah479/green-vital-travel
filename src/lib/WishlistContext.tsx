"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type WishlistContextValue = {
  saved: Set<string>;
  toggle: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "greenvital-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Same hydration-after-mount tradeoff as CurrencyContext — see there.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setSaved(new Set(JSON.parse(stored) as string[]));
    } catch {
      // Malformed storage — start from an empty wishlist rather than throw.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(saved)));
  }, [saved, hydrated]);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const isSaved = useCallback((slug: string) => saved.has(slug), [saved]);

  return (
    <WishlistContext.Provider value={{ saved, toggle, isSaved, count: saved.size }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
