"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { faqs } from "@/lib/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-36 lg:scroll-mt-52 bg-paper-dim px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            Questions
          </p>
          <h2 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Things people usually ask before the first call.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-ink/10 border-t border-b border-ink/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-lg text-ink sm:text-xl">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 text-xl text-accent-deep transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="min-h-0 max-w-xl text-sm leading-relaxed text-ink/70">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
