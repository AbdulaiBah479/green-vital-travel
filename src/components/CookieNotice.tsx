"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "krishna-travels-storage-notice-dismissed";

// useSyncExternalStore (rather than an effect + setState) so the server
// render and the client's first render agree on nothing — localStorage
// genuinely doesn't exist on the server, so getServerSnapshot says
// "treat as dismissed" and React reconciles the real value right after
// hydration without a mismatch warning or a manual effect.
const subscribe = () => () => {};

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return true;
}

export default function CookieNotice() {
  const dismissedInStorage = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [justDismissed, setJustDismissed] = useState(false);

  const dismiss = () => {
    setJustDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (dismissedInStorage || justDismissed) return null;

  return (
    <div
      role="region"
      aria-label="Website storage notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper/95 px-6 py-5 backdrop-blur-md sm:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="max-w-2xl text-xs leading-relaxed text-ink/70">
          This site doesn&rsquo;t use tracking or advertising cookies. We
          store one thing in your browser — what you typed into the search
          field — so it&rsquo;s there if you come back to it. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-accent-deep">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-full bg-ink px-6 py-2.5 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
