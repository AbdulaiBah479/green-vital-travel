import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import GiftCardSelector from "@/components/GiftCardSelector";

const description =
  "A gift card toward any trip we design — never expires, redeemable against the design fee or any booking made through us.";

export const metadata: Metadata = {
  title: "Gift Cards",
  description,
  alternates: { canonical: "/gift-cards" },
  openGraph: { title: "Gift Cards — Green Vital", description, url: "/gift-cards", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Gift Cards — Green Vital",
    description: description,
  },
};

const details = [
  { label: "Expiry", value: "Never" },
  { label: "Delivery", value: "Email, or a printable card for gifting in person" },
  { label: "Redeemable toward", value: "Any tour, design fee, or bespoke trip" },
  { label: "Refundable", value: "No, but fully transferable to another traveler" },
];

export default function GiftCardsPage() {
  return (
    <main className="pb-24 sm:pb-32">
      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1668463876833-339717e58c4c?auto=format&fit=crop&w=2000&q=80"
          alt="An elegantly wrapped gift box tied with ribbon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            Gift Cards
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Give someone a trip, not a thing.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-xl text-balance text-center text-sm leading-relaxed text-ink/60">
            {description}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-6 sm:px-10">
        <Reveal>
          <GiftCardSelector />
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {details.map((d) => (
            <div key={d.label} className="rounded-2xl border border-ink/10 p-5">
              <p className="text-[10px] eyebrow uppercase text-ink/45">{d.label}</p>
              <p className="mt-1 text-sm text-ink/75">{d.value}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </main>
  );
}
