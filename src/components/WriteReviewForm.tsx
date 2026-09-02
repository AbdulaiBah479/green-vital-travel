"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";
import { tours } from "@/lib/tours";

type Status = "idle" | "submitting" | "success";

export default function WriteReviewForm() {
  const [tourSlug, setTourSlug] = useState(tours[0]?.slug ?? "");
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 700);
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-paper-dim px-6 py-6 text-sm text-ink">
        <p className="font-serif text-lg italic text-ink">Thank you, {name || "traveler"}.</p>
        <p className="mt-1 text-ink/65">
          Reviews are checked against real bookings before they&rsquo;re published — yours will appear once
          that&rsquo;s confirmed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-paper-dim p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          value={tourSlug}
          onChange={(e) => setTourSlug(e.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        >
          {tours.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1 rounded-xl border border-ink/15 bg-paper px-4 py-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              onClick={() => setRating(n)}
              className={`text-xl ${n <= rating ? "text-accent-2" : "text-ink/20"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
      />
      <textarea
        required
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="How was the trip?"
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
      />
      <Magnetic strength={0.2}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Submit Review"}
        </button>
      </Magnetic>
    </form>
  );
}
