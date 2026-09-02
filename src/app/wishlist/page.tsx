import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WishlistView from "@/components/WishlistView";

const description = "Tours and destinations you've saved on this device — tap the heart on any card to add one.";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description,
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">Your Wishlist</p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Saved for later.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/60">
            {description}
          </p>
        </Reveal>

        <div className="mt-14">
          <WishlistView />
        </div>
      </div>
    </main>
  );
}
