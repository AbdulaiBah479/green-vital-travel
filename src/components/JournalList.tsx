"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { JournalEntry } from "@/lib/journal";
import Reveal from "./Reveal";

export default function JournalList({ entries }: { entries: JournalEntry[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -60%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={() => setHovered(null)}>
      <div className="flex flex-col divide-y divide-ink/10">
        {entries.map((entry, i) => (
          <Reveal key={entry.slug} delay={i * 80}>
            <Link
              href={`/journal/${entry.slug}`}
              data-cursor-hover
              onMouseEnter={() => setHovered(entry.slug)}
              className="group block py-10"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:hidden">
                <Image
                  src={entry.img}
                  alt={entry.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 sm:mt-0 sm:max-w-2xl">
                <p className="eyebrow mb-3 text-xs uppercase text-accent-deep">
                  {entry.category} · {entry.readTime}
                </p>
                <h2 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent-deep sm:text-3xl">
                  {entry.title}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/80">
                  {entry.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs eyebrow uppercase text-ink/80">
                  {entry.date}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div
        ref={previewRef}
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden h-52 w-72 overflow-hidden rounded-2xl shadow-2xl shadow-ink/30 transition-opacity duration-300 sm:block ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {entries.map((entry) => (
          <Image
            key={entry.slug}
            src={entry.img}
            alt=""
            fill
            sizes="288px"
            className={`object-cover transition-opacity duration-300 ${
              hovered === entry.slug ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
