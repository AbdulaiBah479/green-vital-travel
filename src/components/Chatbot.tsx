"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GREETING, type QuickReply } from "@/lib/chatbot";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  quickReplies?: QuickReply[];
};

let nextId = 1;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: GREETING.text, quickReplies: GREETING.quickReplies },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  // A ref, not just the `typing` state: two sends dispatched in the same
  // tick (e.g. Enter-key repeat) both close over the pre-render `typing`
  // value, since React batches the state update. Refs update synchronously,
  // so this is the guard that actually can't race.
  const pendingRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const others = Array.from(document.body.children).filter(
      (el) => el !== panelRef.current?.closest("[data-chatbot-root]")
    );
    if (open) {
      others.forEach((el) => el.setAttribute("inert", ""));
    } else {
      others.forEach((el) => el.removeAttribute("inert"));
    }
    return () => {
      document.body.style.overflow = "";
      others.forEach((el) => el.removeAttribute("inert"));
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = async (text: string) => {
    // Guards against a reply-in-flight: without this, sending a second
    // message before the first request resolves lets that request's
    // completion hide the indicator out from under the second message.
    // Checked against the ref, not the `typing` state — two sends
    // dispatched in the same tick both close over the same pre-render
    // `typing` value, so the state check alone doesn't actually block it.
    if (pendingRef.current) return;
    pendingRef.current = true;

    const trimmed = text.trim();

    // An empty message is the "Ask something else" quick-reply's way of
    // resetting to the greeting — there's nothing to ask the assistant, so
    // skip the network round-trip entirely rather than fail validation.
    if (!trimmed) {
      pendingRef.current = false;
      setMessages((m) => [
        ...m,
        { id: nextId++, from: "bot", text: GREETING.text, quickReplies: GREETING.quickReplies },
      ]);
      return;
    }

    setMessages((m) => [...m, { id: nextId++, from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    // Last few turns only — enough for the model to follow the thread,
    // not so much that one visitor can run up an unbounded token bill.
    const history = messages.slice(-8).map((m) => ({
      role: m.from === "bot" ? ("assistant" as const) : ("user" as const),
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setMessages((m) => [
        ...m,
        { id: nextId++, from: "bot", text: data.text, quickReplies: data.quickReplies },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: nextId++,
          from: "bot",
          text: "Sorry, something went wrong on my end — try again, or reach the team directly.",
          quickReplies: [{ label: "Talk to our team", href: "/#contact" }],
        },
      ]);
    } finally {
      pendingRef.current = false;
      setTyping(false);
    }
  };

  const onQuickReply = (qr: QuickReply) => {
    if (qr.href) {
      setOpen(false);
      return;
    }
    send(qr.message ?? "");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) send(input);
  };

  return (
    <div data-chatbot-root>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat with the Greenvital assistant"}
        aria-expanded={open}
        data-cursor-hover
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-lg shadow-ink/20 transition-transform hover:scale-105"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            />
          </svg>
        )}
      </button>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with the Greenvital assistant"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-x-4 bottom-24 z-40 flex h-[70vh] max-h-[560px] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-2xl shadow-ink/30 transition-all duration-300 sm:inset-x-auto sm:right-6 sm:w-96 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 bg-ink px-6 py-4">
          <div>
            <p className="font-serif text-lg italic text-paper">Greenvital Assistant</p>
            <p className="text-[11px] uppercase tracking-wide text-paper/50">
              Guided answers, not a person
            </p>
          </div>
        </div>

        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
        >
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.from === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-ink text-paper"
                    : "bg-paper-dim text-ink"
                }`}
              >
                {m.text}
              </div>
              {m.quickReplies && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.quickReplies.map((qr) =>
                    qr.href ? (
                      <Link
                        key={qr.label}
                        href={qr.href}
                        onClick={() => onQuickReply(qr)}
                        className="rounded-full border border-accent-deep/40 px-3 py-1.5 text-xs text-accent-deep transition-colors hover:bg-accent/10"
                      >
                        {qr.label}
                      </Link>
                    ) : (
                      <button
                        key={qr.label}
                        type="button"
                        onClick={() => onQuickReply(qr)}
                        disabled={typing}
                        className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-accent-deep hover:text-accent-deep disabled:opacity-40"
                      >
                        {qr.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div
              role="status"
              aria-label="Greenvital assistant is typing"
              className="flex items-center gap-1 rounded-2xl bg-paper-dim px-4 py-3"
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-ink/10 p-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about destinations, visas, flights…"
            aria-label="Message the Greenvital assistant"
            disabled={typing}
            className="w-full rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink/70 outline-none focus:border-accent-deep disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || typing}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-opacity disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
