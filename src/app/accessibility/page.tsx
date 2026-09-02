import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/site";

const description = "Green Vital's commitment to an accessible website, and how to report an issue.";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description,
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement — Green Vital",
    description,
    url: "/accessibility",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Accessibility Statement — Green Vital", description },
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Legal</p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Accessibility Statement
          </h1>
          <p className="mt-4 text-sm text-ink/60">Last updated August 2026</p>
        </Reveal>

        <Reveal className="mt-14 space-y-10 text-sm leading-relaxed text-ink/75">
          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              Our commitment
            </h2>
            <p>
              We want this site to work for everyone, including people using
              screen readers, keyboard navigation, voice control, or other
              assistive technology. We build against the{" "}
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                className="text-ink underline underline-offset-2 hover:text-accent-deep"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
              </a>
              , as an ongoing standard rather than a one-time checklist.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              What we&rsquo;ve done
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Full keyboard navigation, including a skip-to-content link and a focus-trapped mobile menu and dialogs</li>
              <li>Visible focus states throughout, independent of the decorative cursor</li>
              <li>Semantic headings, landmarks, and alt text on every meaningful image</li>
              <li>Support for reduced-motion preferences, which disables decorative animation site-wide</li>
              <li>Color combinations checked against WCAG AA contrast minimums</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              Known limitations
            </h2>
            <p>
              The Trip Planner&rsquo;s day-by-day results and the destination
              network diagram are richer than plain text and reasonably
              complex to navigate by screen reader; we&rsquo;ve labeled them
              accordingly but are continuing to refine that experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              Reporting an issue
            </h2>
            <p>
              If you hit a barrier anywhere on this site, we want to know.
              Email{" "}
              <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-2 hover:text-accent-deep">
                {contact.email}
              </a>{" "}
              with the page and what happened, and we&rsquo;ll respond directly.
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
