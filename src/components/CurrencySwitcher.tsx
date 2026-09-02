"use client";

import { useEffect, useRef, useState } from "react";
import { currencies } from "@/lib/currency";
import { useCurrency } from "@/lib/CurrencyContext";

export default function CurrencySwitcher({ dark }: { dark: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change display currency"
        className={`text-xs eyebrow uppercase transition-colors ${
          dark ? "text-ink/70 hover:text-ink" : "text-paper/80 hover:text-paper"
        }`}
      >
        {currency}
      </button>

      <div
        role="listbox"
        className={`absolute right-0 top-full mt-3 w-40 overflow-hidden rounded-2xl border border-ink/10 bg-paper py-2 shadow-xl transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {currencies.map((c) => (
          <button
            key={c.code}
            type="button"
            role="option"
            aria-selected={currency === c.code}
            onClick={() => {
              setCurrency(c.code);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-paper-dim ${
              currency === c.code ? "text-accent-deep" : "text-ink/70"
            }`}
          >
            <span>{c.code}</span>
            <span className="text-ink/40">{c.symbol}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
