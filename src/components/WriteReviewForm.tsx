"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";
import { REVIEW_SERVICES } from "@/lib/siteReviews-services";

type Status = "idle" | "submitting" | "success";

export default function WriteReviewForm() {
  const [service, setService] = useState<string>(REVIEW_SERVICES[0]);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, rating, name, body, companyWebsite }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't submit your review right now.");
      setStatus("success");
    } catch (submissionError) {
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn't submit your review right now. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-paper-dim px-6 py-6 text-sm text-ink">
        <p className="font-serif text-lg italic text-ink">Thank you, {name || "traveler"}.</p>
        <p className="mt-1 text-ink/70">
          We read every review. Yours will appear on this page once we have approved it, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-paper-dim p-6">
      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}
      <input
        type="text"
        name="companyWebsite"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          aria-label="What did you use Green Vital for?"
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        >
          {REVIEW_SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
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
              className={`text-xl ${n <= rating ? "text-accent-2" : "text-ink/70"}`}
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
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/70 focus:border-accent"
      />
      <textarea
        required
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="How was your experience with us?"
        maxLength={1200}
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/70 focus:border-accent"
      />
      <p className="text-xs text-ink/60">By submitting, you agree that we may show your name and review on this website.</p>
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
