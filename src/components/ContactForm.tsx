"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";

type Status = "idle" | "submitting" | "success";

const subjects = [
  "Plan a new trip",
  "Group or corporate travel",
  "Gift card",
  "An existing booking",
  "Partnerships",
  "Something else",
];

export default function ContactForm({
  initialSubject,
  initialMessage,
}: {
  initialSubject?: string;
  initialMessage?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(
    subjects.find((s) => s.toLowerCase().includes(initialSubject?.toLowerCase() ?? "___")) ?? subjects[0]
  );
  const [message, setMessage] = useState(initialMessage ?? "");
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "We couldn’t send your message right now.");
      }

      setStatus("success");
    } catch (submissionError) {
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn’t send your message right now. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-paper-dim px-6 py-6 text-sm text-ink">
        <p className="font-serif text-lg italic text-ink">Thank you, {name || "there"}.</p>
        <p className="mt-1 text-ink/65">A team member will reach out to {email} within one business day.</p>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
        />
      </div>
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
      >
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us a bit about what you're looking for"
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
      />
      <Magnetic strength={0.2}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </Magnetic>
    </form>
  );
}
