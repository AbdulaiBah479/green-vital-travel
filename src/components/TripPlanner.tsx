"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  destinations,
  interestOptions,
  paceOptions,
  nightOptions,
  generateItinerary,
  type Interest,
  type Pace,
} from "@/lib/planner";
import Magnetic from "./Magnetic";

const steps = ["Destination", "Length", "Pace", "Interests", "Your Sketch"];

export default function TripPlanner() {
  const [step, setStep] = useState(0);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [nights, setNights] = useState<number | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);

  const destination = destinations.find((d) => d.id === destinationId) ?? null;

  const toggleInterest = (id: Interest) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canAdvance = [
    !!destinationId,
    !!nights,
    !!pace,
    interests.length > 0,
  ];

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const reset = () => {
    setStep(0);
    setDestinationId(null);
    setNights(null);
    setPace(null);
    setInterests([]);
  };

  const itinerary =
    step === 4 && destinationId && nights && pace
      ? generateItinerary({ destinationId, nights, pace, interests })
      : null;

  return (
    <div className="rounded-3xl border border-ink/10 bg-paper-dim p-6 sm:p-10">
      <div className="mb-10 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-1 rounded-full transition-colors ${
                i < step ? "bg-accent" : i === step ? "bg-accent/50" : "bg-ink/10"
              }`}
            />
            <span className="text-center text-[8px] leading-tight eyebrow uppercase text-ink/60 sm:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl text-ink sm:text-3xl">
            Where&rsquo;s pulling at you?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setDestinationId(d.id);
                }}
                data-cursor-hover
                className={`group relative overflow-hidden rounded-2xl text-left ring-2 transition-all ${
                  destinationId === d.id ? "ring-accent" : "ring-transparent"
                }`}
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-serif text-lg text-paper">{d.name}</p>
                  <p className="text-xs text-paper/70">{d.bestFor}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl text-ink sm:text-3xl">
            How many nights?
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {nightOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNights(n)}
                className={`rounded-2xl border px-6 py-8 text-center transition-colors ${
                  nights === n
                    ? "border-accent bg-accent/10"
                    : "border-ink/15 hover:border-accent"
                }`}
              >
                <span className="font-serif text-3xl text-ink">{n}</span>
                <span className="mt-1 block text-xs eyebrow uppercase text-ink/60">
                  nights
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl text-ink sm:text-3xl">
            What pace feels right?
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {paceOptions.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPace(p.id)}
                className={`rounded-2xl border p-6 text-left transition-colors ${
                  pace === p.id
                    ? "border-accent bg-accent/10"
                    : "border-ink/15 hover:border-accent"
                }`}
              >
                <span className="font-serif text-xl text-ink">{p.label}</span>
                <span className="mt-2 block text-sm text-ink/60">{p.hint}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-2 font-serif text-2xl text-ink sm:text-3xl">
            What matters most?
          </h2>
          <p className="mb-6 text-sm text-ink/60">Choose as many as apply.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {interestOptions.map((opt) => {
              const active = interests.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleInterest(opt.id)}
                  aria-pressed={active}
                  className={`rounded-2xl border px-6 py-5 text-left transition-colors ${
                    active
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-ink/15 text-ink/70 hover:border-accent"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 4 && itinerary && destination && (
        <div>
          <p className="eyebrow mb-3 text-xs uppercase text-accent-deep">
            A First Sketch
          </p>
          <h2 className="mb-2 font-serif text-2xl text-ink sm:text-3xl">
            {nights} nights in {destination.name}
          </h2>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-ink/60">
            This is a starting draft, assembled from the pieces we use most in{" "}
            {destination.name} — not a finished itinerary. Our team will
            reshape it around you from here.
          </p>

          <ol className="space-y-6 border-l border-ink/15 pl-6">
            {itinerary.map((day) => (
              <li key={day.day} className="relative">
                <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-ink">
                  {day.day}
                </span>
                <p className="text-xs eyebrow uppercase text-ink/60">
                  Day {day.day}
                </p>
                <div className="mt-1 space-y-3">
                  {day.blocks.map((block) => (
                    <div key={block.title}>
                      <p className="font-serif text-lg text-ink">{block.title}</p>
                      <p className="text-sm leading-relaxed text-ink/60">
                        {block.description}
                      </p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
            <Magnetic>
              <Link
                href="/#contact"
                className="inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
              >
                Refine This With Our Team
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={reset}
              className="text-xs eyebrow uppercase text-ink/60 hover:text-ink"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="text-xs eyebrow uppercase text-ink/60 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-0"
          >
            ← Back
          </button>
          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance[step]}
              className="rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 3 ? "See the Sketch" : "Continue"}
            </button>
          </Magnetic>
        </div>
      )}
    </div>
  );
}
