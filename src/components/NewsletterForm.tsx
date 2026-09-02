"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 600);
  };

  if (status === "success") {
    return <p className="text-sm text-accent-soft">You&rsquo;re on the list — welcome aboard.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        placeholder="you@email.com"
        disabled={status === "submitting"}
        className="w-full rounded-full border border-paper/25 bg-paper/5 px-4 py-2.5 text-sm text-paper placeholder:text-paper/45 outline-none focus:border-accent disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
