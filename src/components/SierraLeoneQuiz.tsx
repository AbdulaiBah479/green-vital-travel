"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { quizQuestions, scoreQuiz } from "@/lib/slQuiz";
import { getJournalEntry } from "@/lib/journal";
import { contact, siteUrl } from "@/lib/site";

const quizUrl = `${siteUrl}/visit-sierra-leone/quiz`;

export default function SierraLeoneQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step >= quizQuestions.length;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new question or the result so keyboard and screen-reader
  // users land on what changed, without stealing focus on the first page load.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const choose = (index: number) => setAnswers((a) => [...a, index]);
  const back = () => setAnswers((a) => a.slice(0, -1));
  const reset = () => setAnswers([]);

  if (!done) {
    const q = quizQuestions[step];
    return (
      <div className="rounded-3xl border border-paper/12 bg-ink p-8 text-paper sm:p-12">
        <div className="mb-3 flex items-center justify-between text-xs eyebrow uppercase text-paper/60">
          <span>
            Question {step + 1} of {quizQuestions.length}
          </span>
          {step > 0 && (
            <button type="button" onClick={back} className="hover:text-paper">
              Back
            </button>
          )}
        </div>
        <div
          className="mb-8 flex items-center gap-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={quizQuestions.length}
          aria-valuenow={step}
          aria-label="Quiz progress"
        >
          {quizQuestions.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < step ? "bg-accent" : i === step ? "bg-accent/50" : "bg-paper/10"
              }`}
            />
          ))}
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mb-8 font-serif text-2xl italic leading-snug outline-none sm:text-3xl"
        >
          {q.prompt}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {q.options.map((opt, i) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => choose(i)}
              className="rounded-2xl border border-paper/15 px-6 py-5 text-left text-sm text-paper/85 transition-colors hover:border-accent hover:bg-accent/10 focus-visible:border-accent focus-visible:bg-accent/10 focus-visible:outline-none"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const result = scoreQuiz(answers);
  const shareText = `I took the Sierra Leone trip quiz and got "${result.name}". Which Sierra Leone trip suits you? ${quizUrl}`;
  const planText = `Hello Green Vital, I took the Sierra Leone trip quiz and got "${result.name}". I'd like help planning this trip.`;

  return (
    <div className="rounded-3xl border border-paper/12 bg-ink p-8 text-paper sm:p-12" aria-live="polite">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={result.img}
            alt={result.imgAlt}
            fill
            sizes="(min-width: 640px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow mb-3 text-xs uppercase text-accent-soft">Your Sierra Leone trip</p>
          <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl leading-tight outline-none">
            {result.name}
          </h2>
          <p className="mt-3 text-sm text-paper/70">{result.tagline}</p>
        </div>
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3 text-xs uppercase text-accent-soft">Good to know</p>
        <ul className="space-y-2 text-sm leading-relaxed text-paper/80">
          {result.knowing.map((k) => (
            <li key={k} className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-accent-soft">✦</span>
              {k}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3 text-xs uppercase text-accent-soft">Read next</p>
        <ul className="flex flex-wrap gap-3">
          {result.guides.map((g) => {
            const entry = getJournalEntry(g.slug);
            if (!entry) return null;
            return (
              <li key={g.slug}>
                <Link
                  href={`/journal/${g.slug}`}
                  className="inline-block rounded-full border border-paper/25 px-5 py-2 text-xs text-paper/85 transition-colors hover:border-paper hover:text-paper"
                >
                  {g.label}
                </Link>
              </li>
            );
          })}
          {result.tourSlug && (
            <li>
              <Link
                href={`/tours/${result.tourSlug}`}
                className="inline-block rounded-full border border-accent/60 px-5 py-2 text-xs text-accent-soft transition-colors hover:bg-accent hover:text-ink"
              >
                See the matching tour
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Magnetic>
          <a
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(planText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
          >
            Plan this trip on WhatsApp
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-paper/30 px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Share with a friend
          </a>
        </Magnetic>
        <button type="button" onClick={reset} className="text-xs eyebrow uppercase text-paper/60 hover:text-paper">
          Take it again
        </button>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-paper/50">
        This is a friendly first idea, not a booking. Our team in Freetown will confirm timings, access and costs with
        you before you decide anything.
      </p>
    </div>
  );
}
