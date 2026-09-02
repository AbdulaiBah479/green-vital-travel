import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

const description =
  "Entry requirements for Sierra Leone and outbound travel for Sierra Leonean passport holders — plus why the destination's embassy is the source that matters.";

export const metadata: Metadata = {
  title: "Travel Requirements",
  description,
  alternates: { canonical: "/travel-requirements" },
  openGraph: {
    title: "Travel Requirements — Green Vital",
    description,
    url: "/travel-requirements",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Requirements — Green Vital",
    description: description,
  },
};

const sierraLeoneSections = [
  {
    title: "Entering Sierra Leone",
    body: "A yellow fever vaccination certificate is a mandatory entry requirement for all travelers arriving in Sierra Leone, regardless of origin — carry the physical or digital certificate, not just proof of the shot. Most nationalities require a visa in advance; ECOWAS nationals travel visa-free with a valid ECOWAS travel certificate or passport.",
  },
  {
    title: "Leaving Sierra Leone",
    body: "Sierra Leonean passport holders need a visa for most international destinations, including the UK, US, Schengen area, and Gulf states. Processing times and documentation vary by embassy and by season — we handle this as part of booking, but the earlier you start, the more options you have.",
  },
  {
    title: "Hajj & Umrah Travel",
    body: "Saudi Arabia requires a meningitis (ACYW135) vaccination certificate for all pilgrims, alongside a Nusuk/Umrah visa arranged through a licensed operator. Requirements and quotas are set annually by the Saudi authorities — we confirm the current year's rules before your group departs.",
  },
];

const generalSections = [
  {
    title: "Passport Validity",
    body: "Many countries require six months of validity remaining beyond your travel dates, not just beyond your return flight. Check this before booking, not after.",
  },
  {
    title: "Visas",
    body: "Some destinations require a visa arranged in advance; others issue one on arrival or waive the requirement for certain passports. This varies by nationality and can change with little notice.",
  },
  {
    title: "Health & Vaccinations",
    body: "Some regions require or recommend specific vaccinations or documentation beyond yellow fever — check with a travel clinic or your doctor well ahead of departure.",
  },
  {
    title: "Airline Document Checks",
    body: "Airlines are required to verify entry documents before boarding, and will deny boarding rather than risk a fine. This makes the departure gate the worst possible place to discover a missing requirement.",
  },
];

export default function TravelRequirementsPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-2xl px-6 pt-40 sm:px-10 lg:pt-48">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            Travel Requirements
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Confirm it yourself, always.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/60">
            {description}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Sierra Leone Travel</p>
          <div className="space-y-8">
            {sierraLeoneSections.map((s) => (
              <div key={s.title} className="border-t border-ink/10 pt-6 first:border-t-0 first:pt-0">
                <h2 className="font-serif text-xl text-ink">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">General Guidance</p>
          <div className="space-y-8">
            {generalSections.map((s) => (
              <div key={s.title} className="border-t border-ink/10 pt-6 first:border-t-0 first:pt-0">
                <h2 className="font-serif text-xl text-ink">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border border-ink/10 bg-paper-dim p-6 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">This page is general guidance, not legal advice.</strong>{" "}
          Requirements vary by nationality, change without much notice, and the only authoritative
          source is the destination country&rsquo;s own embassy, consulate, or (for Sierra Leone) the
          Ministry of Internal Affairs. We&rsquo;ll flag what we know when we build your itinerary, but
          always confirm directly before you book.
        </Reveal>
      </div>
    </main>
  );
}
