"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "./Magnetic";
import SectionDivider from "./SectionDivider";

const questions = [
  {
    prompt: "What pulls you back to a place, months later?",
    options: [
      { label: "The scale of the landscape", weight: [3, 0, 1, 0, 0] },
      { label: "A meal you still think about", weight: [0, 3, 0, 1, 1] },
      { label: "The quiet", weight: [1, 0, 3, 0, 1] },
      { label: "A story you now tell often", weight: [0, 1, 0, 3, 0] },
      { label: "The water, and nowhere to be", weight: [0, 1, 0, 0, 3] },
    ],
  },
  {
    prompt: "How do you like to move through a day?",
    options: [
      { label: "Slow starts, no fixed plan", weight: [0, 2, 3, 0, 2] },
      { label: "On the move, covering ground", weight: [3, 0, 0, 1, 0] },
      { label: "Structured, but with room to wander", weight: [0, 2, 1, 2, 1] },
      { label: "Barefoot, beach to beach", weight: [0, 1, 0, 0, 3] },
    ],
  },
  {
    prompt: "Pick the traveling companion you're planning around.",
    options: [
      { label: "Just me", weight: [2, 1, 3, 0, 1] },
      { label: "A partner", weight: [1, 3, 2, 1, 2] },
      { label: "The whole family", weight: [0, 1, 1, 3, 2] },
    ],
  },
];

const outcomes = [
  {
    slug: "patagonia",
    name: "Patagonia, Chile",
    tagline: "For travelers chasing scale over comfort.",
    img: "/images/unsplash/1544735716-392fe2489ffa.jpg",
  },
  {
    slug: "amalfi",
    name: "Amalfi Coast, Italy",
    tagline: "For travelers who plan a day around dinner.",
    img: "/images/unsplash/1533104816931-20fa691ff6ca.jpg",
  },
  {
    slug: "kyoto",
    name: "Kyoto, Japan",
    tagline: "For travelers who need the quiet more than the itinerary.",
    img: "/images/unsplash/1493976040374-85c8e12f0c0e.jpg",
  },
  {
    slug: "serengeti",
    name: "Serengeti, Tanzania",
    tagline: "For travelers building a story to hand down.",
    img: "/images/unsplash/1516426122078-c23e76319801.jpg",
  },
  {
    slug: "freetown-peninsula",
    name: "Freetown Peninsula, Sierra Leone",
    tagline: "For travelers who just want the water, easy days, and nowhere to be.",
    img: "/images/unsplash/1611395813517-41f9be5e292d.jpg",
  },
];

export default function TripMatcher() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  const answer = (weight: number[]) => {
    const next = scores.map((s, i) => s + weight[i]);
    setScores(next);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setScores([0, 0, 0, 0, 0]);
  };

  const isResult = step >= questions.length;
  const resultIndex = isResult
    ? scores.indexOf(Math.max(...scores))
    : 0;
  const result = outcomes[resultIndex];

  return (
    <section className="relative bg-ink-soft px-6 py-24 text-paper sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
          The Trip Matcher
        </p>
        <h2 className="mb-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
          Not sure where to start? Answer three questions.
        </h2>
        <p className="mb-14 max-w-lg text-sm text-paper/60">
          A rough first read on where your next journey might begin — no
          email required. Our team will refine it from here.
        </p>

        <div className="rounded-3xl border border-paper/12 bg-ink p-8 sm:p-12">
          {!isResult && (
            <>
              <div className="mb-8 flex items-center gap-2">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < step
                        ? "bg-accent"
                        : i === step
                          ? "bg-accent/50"
                          : "bg-paper/10"
                    }`}
                  />
                ))}
              </div>

              <p className="mb-8 font-serif text-2xl italic sm:text-3xl">
                {questions[step].prompt}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => answer(opt.weight)}
                    className="rounded-2xl border border-paper/15 px-6 py-5 text-left text-sm text-paper/85 transition-colors hover:border-accent hover:bg-accent/10"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {isResult && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={result.img}
                  alt={result.name}
                  fill
                  sizes="(min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="eyebrow mb-3 text-xs uppercase text-accent-soft">
                  Your Starting Point
                </p>
                <h3 className="font-serif text-3xl">{result.name}</h3>
                <p className="mt-3 text-sm text-paper/65">{result.tagline}</p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link
                      href={`/destinations/${result.slug}`}
                      className="inline-block rounded-full border border-paper/30 px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                    >
                      Learn More
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      href="/#contact"
                      className="inline-block rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
                    >
                      Plan This Journey
                    </Link>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs eyebrow uppercase text-paper/50 hover:text-paper"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SectionDivider fill="var(--paper)" />
    </section>
  );
}
