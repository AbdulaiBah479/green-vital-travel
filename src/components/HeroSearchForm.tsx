"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Magnetic from "./Magnetic";
import { regions } from "@/lib/destinations";
import { categories } from "@/lib/tours";

type Tab = "tours" | "destinations";

export default function HeroSearchForm() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("tours");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set("region", region);

    if (tab === "tours") {
      if (category) params.set("category", category);
      router.push(`/tours${params.toString() ? `?${params}` : ""}`);
    } else {
      router.push(`/destinations${params.toString() ? `?${params}` : ""}`);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-paper p-2.5 shadow-2xl shadow-ink/30 animate-[fadeIn_1s_ease_0.85s_both] sm:p-3">
      <div className="mb-1 flex gap-1 px-1.5 pt-1">
        {(["tours", "destinations"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-xs eyebrow uppercase transition-colors ${
              tab === t ? "bg-ink text-paper" : "text-ink/50 hover:text-ink"
            }`}
          >
            {t === "tours" ? "Tours" : "Destinations"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label className="flex flex-1 flex-col gap-0.5 rounded-2xl px-4 py-2 transition-colors hover:bg-paper-dim sm:border-r sm:border-ink/10">
          <span className="text-[10px] eyebrow uppercase text-ink/45">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            aria-label="Region"
            className="w-full bg-transparent text-sm text-ink outline-none"
          >
            <option value="">Anywhere</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        {tab === "tours" && (
          <label className="flex flex-1 flex-col gap-0.5 rounded-2xl px-4 py-2 transition-colors hover:bg-paper-dim sm:border-r sm:border-ink/10">
            <span className="text-[10px] eyebrow uppercase text-ink/45">Tour style</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Tour style"
              className="w-full bg-transparent text-sm text-ink outline-none"
            >
              <option value="">Any style</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}

        <Magnetic strength={0.2}>
          <button
            type="submit"
            className="btn-shine flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-accent px-7 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            Search
          </button>
        </Magnetic>
      </form>
    </div>
  );
}
