import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/site";

const description = "How Green Vital collects, uses, and protects your information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy — Green Vital", description, url: "/privacy", type: "website" },
  twitter: { card: "summary_large_image", title: "Privacy Policy — Green Vital", description },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Legal</p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-ink/60">Last updated August 2026</p>
        </Reveal>

        <Reveal className="prose-legal mt-14 space-y-10 text-sm leading-relaxed text-ink/75">
          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              What we collect
            </h2>
            <p>
              When you use the Trip Planner, submit an enquiry, or contact our
              team, we collect what you give us directly — typically your
              name, email address, and anything you tell us about the trip
              you&rsquo;re planning. The Trip Planner&rsquo;s answers (destination,
              length, pace, interests) are processed in your browser to build
              your draft itinerary and are only sent to us if you choose to
              share it with our team.
            </p>
            <p className="mt-3">
              We do not use advertising or analytics cookies, and we do not
              sell or rent personal information to third parties, ever.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              How we use it
            </h2>
            <p>
              Information you share is used to respond to your enquiry, plan
              your trip, and — if you&rsquo;re a client — coordinate the bookings
              involved in it. We may share necessary details (such as your
              name and travel dates) with the specific hotels, guides, or
              transport providers involved in your itinerary, and with no one
              else.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">
              Cookies and local storage
            </h2>
            <p>
              This site does not set tracking or advertising cookies. It uses
              your browser&rsquo;s local storage for one purpose only: remembering
              what you typed into the homepage search field, so it&rsquo;s still
              there if you navigate back to it. Nothing in that storage is
              transmitted to us or to any third party.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">Your rights</h2>
            <p>
              Wherever you&rsquo;re located, you can ask us at any time what
              information we hold about you, ask us to correct it, or ask us
              to delete it. As a company registered in Sierra Leone, we handle
              these requests in line with the Sierra Leone Data Protection
              Act — but for clients in the EU, UK, and California, we&rsquo;ll just
              as readily honor requests consistent with the GDPR, UK GDPR, or
              CCPA. We&rsquo;ll honor the same request from anyone, regardless of
              where you&rsquo;re writing from.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-ink">Contact</h2>
            <p>
              Questions about this policy, or a request regarding your data,
              can go to{" "}
              <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-2 hover:text-accent-deep">
                {contact.email}
              </a>
              .
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
