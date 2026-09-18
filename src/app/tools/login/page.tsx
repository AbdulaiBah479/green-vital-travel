"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ToolsLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/tools/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }
      router.push("/tools/itinerary");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 pb-24 pt-40 lg:pt-48">
      <h1 className="mb-6 font-serif text-2xl text-ink">Staff Tools</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:opacity-50"
        >
          {submitting ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
