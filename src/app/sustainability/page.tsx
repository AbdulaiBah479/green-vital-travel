import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const description =
  "How Green Vital thinks about responsible travel — supporting the people and places our trips depend on, not just visiting them.";

export const metadata: Metadata = {
  title: "Sustainability",
  description,
  alternates: { canonical: "/sustainability" },
  openGraph: {
    images: ["/opengraph-image"], title: "Sustainability — Green Vital", description, url: "/sustainability", type: "website" },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Sustainability — Green Vital",
    description: description,
  },
};

const commitments = [
  {
    title: "We book local, on purpose",
    body: "Guides, drivers, and small properties we work with directly keep more of what you spend in the communities you're visiting, rather than routing it through an intermediary with no stake in the place.",
  },
  {
    title: "We route around overtourism, not into it",
    body: "When a well-known site is being loved to death, we look for the version of that experience — often nearby, sometimes better — that isn't. Fushimi Inari at dawn instead of noon; a smaller trail instead of the famous one.",
  },
  {
    title: "We fly less, and better, where we can",
    body: "We favor fewer, longer stays over itineraries stitched together with short regional flights, and we're upfront when a train or a drive is the better option — not just the slower one.",
  },
  {
    title: "We keep trips honest about capacity",
    body: "Some places, seasons, and properties have real limits. We say so, even when the easier answer would be to fit you in anyway.",
  },
];

export default function SustainabilityPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="/images/unsplash/1441974231531-c6227db76b6e.jpg"
          alt="Forest canopy from above"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            Sustainability
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Travel that leaves the place as it found it, or better.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/80">
            We don&rsquo;t claim to have solved travel&rsquo;s impact on the places it
            touches — nobody honestly can. What we can do is make deliberate
            choices in how we design a trip, and be plain about what those
            choices are.
          </p>
        </Reveal>

        <div className="mt-14 space-y-10">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="border-t border-ink/10 pt-8">
                <h2 className="font-serif text-xl text-ink">{c.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-2xl bg-paper-dim p-8">
          <p className="text-sm leading-relaxed text-ink/70">
            This is a working set of principles, not a finished certification
            — we update it as we learn more from the guides and communities
            we work with. If you have questions about how a specific trip is
            designed, ask our team directly.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
