import type { Metadata } from "next";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center sm:px-10">
      <p className="eyebrow mb-6 text-xs uppercase text-accent-deep">404</p>
      <h1 className="max-w-lg text-balance font-serif text-4xl italic leading-tight text-ink sm:text-5xl">
        This particular route doesn&rsquo;t exist yet.
      </h1>
      <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-ink/60">
        Whatever you were looking for isn&rsquo;t at this address — but our
        team would be glad to help you find it another way.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Magnetic strength={0.25}>
          <Link
            href="/"
            className="inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
          >
            Back to Green Vital
          </Link>
        </Magnetic>
        <Link
          href="/journal"
          className="text-xs eyebrow uppercase text-ink/60 transition-colors hover:text-accent-deep"
        >
          Read the Journal
        </Link>
      </div>
    </main>
  );
}
