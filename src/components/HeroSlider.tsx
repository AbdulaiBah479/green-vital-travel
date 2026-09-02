"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/unsplash/1611395813517-41f9be5e292d.jpg",
    alt: "Freetown Peninsula coastline, Sierra Leone",
  },
  {
    src: "/images/unsplash/1436491865332-7a61a109cc05.jpg",
    alt: "Airplane wing above the clouds at sunset",
  },
  {
    src: "/images/unsplash/1602298674761-700e96568f5f.jpg",
    alt: "Tiwai Island rainforest, Sierra Leone",
  },
  {
    src: "/images/unsplash/1569154941061-e231b4725ef1.jpg",
    alt: "Airplane on the tarmac at an airport terminal",
  },
  {
    src: "/images/unsplash/1625001071825-0a85373c8972.jpg",
    alt: "Banana Islands, Sierra Leone",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  // Only the first two slides are mounted up front — the first for immediate
  // paint, the second so the first crossfade has something to fade into.
  // Later slides mount one step ahead of when they're needed instead of all
  // at once, so the initial load only ever pays for one or two images
  // instead of the whole set.
  const [mounted, setMounted] = useState(() => new Set([0, 1]));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % slides.length;
        const upcoming = (next + 1) % slides.length;
        setMounted((prev) => (prev.has(upcoming) ? prev : new Set(prev).add(upcoming)));
        return next;
      });
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full">
      {slides.map(
        (slide, i) =>
          mounted.has(i) && (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          )
      )}
    </div>
  );
}
