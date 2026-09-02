"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";

type Status = "idle" | "submitting" | "success";

export default function CtaForm() {
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
    window.setTimeout(() => setStatus("success"), 700);
  };

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-paper/20 bg-paper/5 px-6 py-5 text-sm text-paper backdrop-blur-sm">
        <p className="font-serif text-lg italic text-paper">Thank you.</p>
        <p className="mt-1 text-paper/70">
          A member of our team will reach out to {email} within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setEmail("");
            setStatus("idle");
          }}
          className="mt-4 text-xs eyebrow uppercase text-accent-soft hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        placeholder="you@email.com"
        disabled={status === "submitting"}
        className="w-full rounded-full border border-paper/25 bg-paper/5 px-6 py-4 text-sm text-paper placeholder:text-paper/50 backdrop-blur-sm outline-none focus:border-accent disabled:opacity-60"
      />
      <Magnetic strength={0.25}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-shine w-full shrink-0 rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Get in Touch"}
        </button>
      </Magnetic>
    </form>
  );
}
