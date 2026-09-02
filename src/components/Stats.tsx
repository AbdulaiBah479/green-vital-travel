"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const stats = [
  {
    value: 24,
    suffix: "/7",
    label: "In-trip support",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />,
  },
  {
    value: 18,
    suffix: "",
    label: "Destinations curated",
    icon: <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" />,
  },
  {
    value: 20,
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
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-paper px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
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
                <p className="mt-1.5 text-xs leading-snug uppercase eyebrow text-ink/55">
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
