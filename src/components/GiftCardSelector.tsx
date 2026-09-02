"use client";

import { useState } from "react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useCurrency } from "@/lib/CurrencyContext";

const denominations = [100, 250, 500, 1000, 2500];

export default function GiftCardSelector() {
  const { formatPrice } = useCurrency();
  const [amount, setAmount] = useState(250);

  return (
    <div className="rounded-3xl border border-ink/10 bg-paper-dim p-7 sm:p-10">
      <p className="eyebrow mb-4 text-xs uppercase text-accent-2-deep">Choose an Amount</p>
      <div className="flex flex-wrap gap-3">
        {denominations.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setAmount(d)}
            className={`rounded-full border px-6 py-3 text-sm transition-colors ${
              amount === d
                ? "border-accent-2 bg-accent-2/15 text-accent-2-deep"
                : "border-ink/15 text-ink/70 hover:border-accent-2"
            }`}
          >
            {formatPrice(d)}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
        <div>
          <p className="text-[10px] eyebrow uppercase text-ink/45">Gift Card Value</p>
          <p className="font-serif text-3xl text-ink">{formatPrice(amount)}</p>
        </div>
        <Magnetic strength={0.2}>
          <Link
            href={`/contact?subject=${encodeURIComponent("Gift card")}&amount=${amount}`}
            className="inline-block rounded-full bg-accent-2 px-7 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:brightness-95"
          >
            Request This Card
          </Link>
        </Magnetic>
      </div>
      <p className="mt-4 text-xs text-ink/45">
        No payment is taken on this page — we&rsquo;ll follow up to confirm delivery details and complete the
        purchase directly.
      </p>
    </div>
  );
}
