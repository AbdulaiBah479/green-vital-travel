"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "top", label: "Welcome" },
  { id: "destinations", label: "Destinations" },
  { id: "journey", label: "The Journey" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [activeId, setActiveId] = useState("top");
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
      <div className="rounded-full border border-ink/10 bg-paper/80 px-2.5 py-5 shadow-lg shadow-ink/5 backdrop-blur-md">
        <div className="relative flex flex-col items-center gap-5">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/10" />
          <div
            ref={barRef}
            className="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-accent transition-all duration-300"
            style={{ height: `${progress * 100}%` }}
          />
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Scroll to ${s.label}`}
              data-cursor-hover
              onClick={() => scrollTo(s.id)}
              className="group relative z-10 flex h-3 w-3 items-center justify-center"
            >
              <span
                className={`progress-dot h-1.5 w-1.5 rounded-full ${
                  activeId === s.id ? "is-active" : "bg-ink/25"
                }`}
              />
              <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[10px] eyebrow uppercase text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
