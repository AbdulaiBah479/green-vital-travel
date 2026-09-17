"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { tours } from "@/lib/tours";

// Counts are computed from the real catalogs, not hand-typed, so this
// stops drifting stale every time a destination or tour is added — it
// already had once (stuck at 18/20 after the count moved on).
const stats = [
  {
    value: 24,
    suffix: "/7",
    label: "In-trip support",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />,
  },
  {
    value: tours.length,
    suffix: "",
    label: "Tour packages",
    icon: <path d="M4 4h16v16H4z M8 9h8M8 13h5M8 17h3" />,
  },
  {
    value: 1,
    suffix: "",
    label: "Travel partner for every step",
    icon: <path d="M3 12a9 9 0 1 1 9 9M3 12h4m-4 0v4a2 2 0 0 0 2 2h2v-6H3Zm18 0h-4m4 0v4a2 2 0 0 1-2 2h-2v-6h4Z" />,
  },
  {
    value: "∞",
    suffix: "",
    label: "Unlimited destinations, worldwide",
    icon: (
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.578 0-4.578 8 0 8 5.606 0 7.644-8 12.74-8z" />
    ),
  },
];

function Counter({ value, suffix }: { value: number | string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  // Non-numeric stats (the "∞" for "we book anywhere") have nothing to
  // count up to — render them as-is and skip the animation entirely.
  const isNumeric = typeof value === "number";

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, isNumeric]);

  return (
    <span ref={ref}>
      {isNumeric ? display : value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-paper px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} variant="scale">
            <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-ink/8 bg-paper-dim/60 p-5 sm:p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-deep">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </span>
              <div>
                <p className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-xs leading-snug uppercase eyebrow text-ink/70">
                  {s.label}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
