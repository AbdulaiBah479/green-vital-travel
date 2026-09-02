"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import SectionDivider from "./SectionDivider";

const destinations = [
  {
    slug: "freetown-peninsula",
    name: "Freetown Peninsula, Sierra Leone",
    hook: "Golden beaches, twenty minutes from the airport",
    detail: "Best November through April",
    nights: "3–5 nights suggested",
    description:
      "The coastline south of Freetown — Lumley, Tokeh, Bureh, and River No. 2 — palm-backed sand, fresh grilled fish, and some of West Africa's best surf, without the crowds of better-known coasts.",
    highlights: [
      "A surf lesson at Bureh Beach with the local surf club",
      "Grilled barracuda on the sand at River No. 2",
      "A sunrise hike to Leicester Peak, overlooking Freetown",
    ],
    img: "/images/unsplash/1611395813517-41f9be5e292d.jpg",
  },
  {
    slug: "kyoto",
    name: "Kyoto, Japan",
    hook: "Temple gardens and quiet mornings",
    detail: "Best in spring or late autumn",
    nights: "10–14 nights suggested",
    description:
      "A slow unraveling of the old capital — machiya guesthouses, moss gardens before the crowds, and a kaiseki dinner arranged around a chef who rarely takes new guests.",
    highlights: [
      "Private tea ceremony with a third-generation host",
      "Dawn visit to Fushimi Inari, before the gates open to the public",
      "A driver-guide for day trips into the Kitayama mountains",
    ],
    img: "/images/unsplash/1493976040374-85c8e12f0c0e.jpg",
  },
  {
    slug: "amalfi",
    name: "Amalfi Coast, Italy",
    hook: "Cliffside towns, slow dinners",
    detail: "Best May through early October",
    nights: "7–10 nights suggested",
    description:
      "Fewer stops, more time in each — a boat instead of the coastal road, and dinners with the families who have run the same three tables for decades.",
    highlights: [
      "Private boat between Positano, Praiano, and Nerano",
      "A pasta-making morning in a Ravello home kitchen",
      "Rooms with a sea view in towns most itineraries skip",
    ],
    img: "/images/unsplash/1533104816931-20fa691ff6ca.jpg",
  },
  {
    slug: "serengeti",
    name: "Serengeti, Tanzania",
    hook: "The great migration, up close",
    detail: "Best June through September",
    nights: "8–12 nights suggested",
    description:
      "Mobile camps that follow the herds rather than a fixed lodge, run by naturalists we've traveled with ourselves — built for the days the migration actually moves.",
    highlights: [
      "Mobile tented camp positioned by that week's migration",
      "Private vehicle and guide for the full stay",
      "A balloon dawn over the plains, weather permitting",
    ],
    img: "/images/unsplash/1516426122078-c23e76319801.jpg",
  },
  {
    slug: "patagonia",
    name: "Patagonia, Chile",
    hook: "Glaciers, granite, and silence",
    detail: "Best November through March",
    nights: "9–12 nights suggested",
    description:
      "Torres del Paine without the crowds at the viewpoints — timed hikes, a private refugio, and enough slack in the schedule for the weather to cooperate.",
    highlights: [
      "Small-group trekking with a certified mountain guide",
      "A refugio held privately for two nights mid-trek",
      "Extra weather-buffer days built into the itinerary",
    ],
    img: "/images/unsplash/1544735716-392fe2489ffa.jpg",
  },
  {
    slug: "santorini",
    name: "Santorini, Greece",
    hook: "Whitewashed cliffs, endless blue",
    detail: "Best April, May, or September",
    nights: "5–7 nights suggested",
    description:
      "The caldera without the cruise-ship hours — a base in a quieter village, a sunset sail instead of the crowded viewpoint, and a table that doesn't need a reservation six months out.",
    highlights: [
      "Private catamaran along the caldera at sunset",
      "A cliffside suite in Oia's quieter northern edge",
      "Wine tasting at a family-run vineyard off the tourist route",
    ],
    img: "/images/unsplash/1570077188670-e3a8d69ac5ff.jpg",
  },
];

function DestinationModal({
  index,
  visible,
  onClose,
}: {
  index: number;
  visible: boolean;
  onClose: () => void;
}) {
  const d = destinations[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={d.name}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 sm:p-8 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className={`relative grid max-h-[88vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-3xl bg-paper transition-all duration-300 sm:grid-cols-2 sm:overflow-hidden ${
          visible ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-ink"
        >
          ✕
        </button>

        <div className="relative h-64 sm:h-full">
          <Image
            src={d.img}
            alt={d.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-8 sm:p-10">
          <p className="eyebrow mb-3 text-xs uppercase text-accent-deep">
            {d.nights}
          </p>
          <h3 className="font-serif text-3xl leading-tight text-ink">
            {d.name}
          </h3>
          <p className="mt-1 text-sm text-ink/70">{d.detail}</p>

          <p className="mt-5 text-sm leading-relaxed text-ink/70">
            {d.description}
          </p>

          <ul className="mt-6 space-y-3">
            {d.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-sm leading-relaxed text-ink/70"
              >
                <span className="mt-1 text-accent-deep">✦</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic strength={0.2}>
              <Link
                href={`/destinations/${d.slug}`}
                onClick={onClose}
                className="inline-block rounded-full border border-ink/20 px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Read the Full Guide
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/#contact"
                onClick={onClose}
                className="inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
              >
                Plan This Journey
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const start = useRef({ x: 0, scroll: 0 });
  const dragDistance = useRef(0);

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    // Deliberately no setPointerCapture here: capturing the pointer on the
    // track redirects the resulting click to the track itself instead of
    // the card button beneath it, silently breaking every card click.
    setIsDown(true);
    dragDistance.current = 0;
    start.current = { x: e.clientX, scroll: trackRef.current.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown || !trackRef.current) return;
    const dx = e.clientX - start.current.x;
    dragDistance.current = Math.max(dragDistance.current, Math.abs(dx));
    trackRef.current.scrollLeft = start.current.scroll - dx;
  };

  const onPointerUp = () => setIsDown(false);

  const openModal = (i: number) => {
    if (dragDistance.current > 6) return;
    setSelected(i);
    requestAnimationFrame(() => setModalVisible(true));
  };

  const closeModal = () => {
    setModalVisible(false);
    window.setTimeout(() => setSelected(null), 300);
  };

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="destinations" className="relative scroll-mt-36 lg:scroll-mt-52 bg-paper-dim py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">
                Featured Destinations
              </p>
              <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
                Six places worth rearranging your year for.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/destinations"
                data-cursor-hover
                className="shrink-0 text-xs eyebrow uppercase text-ink/70 transition-colors hover:text-accent-deep"
              >
                See All 18 →
              </Link>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollByCard(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:bg-accent/10"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollByCard(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:bg-accent/10"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className={`flex gap-5 overflow-x-auto px-6 pb-4 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDown ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ scrollSnapType: "x proximity" }}
      >
        {destinations.map((d, i) => (
          <button
            key={d.name}
            type="button"
            onClick={() => openModal(i)}
            data-cursor-hover
            style={{ scrollSnapAlign: "start" }}
            className="group relative block w-[78vw] shrink-0 overflow-hidden rounded-2xl text-left sm:w-[380px]"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={d.img}
                alt={d.name}
                fill
                sizes="(min-width: 640px) 380px, 78vw"
                draggable={false}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <span className="absolute right-5 top-5 font-serif text-sm italic text-paper/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-serif text-2xl text-paper">{d.name}</h3>
              <p className="mt-1 text-sm text-paper/75">{d.hook}</p>
              <p className="mt-3 text-xs eyebrow uppercase text-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {d.detail} — view details
              </p>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <DestinationModal
          index={selected}
          visible={modalVisible}
          onClose={closeModal}
        />
      )}

      <SectionDivider fill="var(--ink)" flip />
    </section>
  );
}
