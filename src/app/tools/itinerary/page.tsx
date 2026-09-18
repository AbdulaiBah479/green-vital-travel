"use client";

import { useState, type FormEvent } from "react";

const MONTHS = [
  "Not sure yet",
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

export default function ItineraryToolPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(7);
  const [groupSize, setGroupSize] = useState("");
  const [month, setMonth] = useState(MONTHS[0]);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [climateNote, setClimateNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setClimateNote(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          days,
          groupSize,
          month: month === MONTHS[0] ? undefined : month,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't generate a draft right now.");
        return;
      }
      setResult(data.itinerary);
      setClimateNote(data.climateNote ?? null);
    } catch {
      setError("Couldn't generate a draft right now. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 sm:pb-32 lg:pt-48">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Itinerary Draft Assistant</h1>
      <p className="mt-3 text-sm text-ink/70">
        Internal drafting tool only — nothing here is ever sent to a client automatically, and it never includes
        pricing. Review and personalize every draft before it reaches anyone.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <label className="block">
          <span className="mb-1 block text-xs eyebrow uppercase text-ink/70">Destination</span>
          <input
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Anywhere in the world — e.g. Bali, Kyoto, Zanzibar"
            className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1 block text-xs eyebrow uppercase text-ink/70">Trip length (days)</span>
            <input
              type="number"
              min={1}
              max={60}
              required
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs eyebrow uppercase text-ink/70">Approx. travel month</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs eyebrow uppercase text-ink/70">Who&rsquo;s traveling</span>
          <input
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            placeholder="e.g. 2 adults, kids aged 8 and 11"
            className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs eyebrow uppercase text-ink/70">Interests, pace, anything else</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g. relaxed pace, beach + some culture, avoid long hikes"
            className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-shine w-full rounded-full bg-accent px-7 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:opacity-50"
        >
          {loading ? "Drafting…" : "Draft Itinerary"}
        </button>
      </form>

      {result && (
        <div className="mt-12 rounded-3xl border border-ink/10 bg-paper-dim p-6">
          {climateNote && <p className="mb-4 rounded-xl bg-paper px-4 py-3 text-xs text-ink/70">{climateNote}</p>}
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{result}</pre>
          <button
            type="button"
            onClick={copyResult}
            className="mt-6 rounded-full border border-ink/15 px-6 py-3 text-xs eyebrow uppercase text-ink/70 transition-colors hover:border-accent hover:text-accent-deep"
          >
            {copied ? "Copied!" : "Copy Draft"}
          </button>
        </div>
      )}
    </main>
  );
}
