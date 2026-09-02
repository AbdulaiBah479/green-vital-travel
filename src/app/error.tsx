"use client";

import { useEffect } from "react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center sm:px-10">
      <p className="eyebrow mb-6 text-xs uppercase text-accent-deep">
        Something Went Sideways
      </p>
      <h1 className="max-w-lg text-balance font-serif text-4xl italic leading-tight text-ink sm:text-5xl">
        That page hit a snag on our end, not yours.
      </h1>
      <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-ink/70">
        Nothing you did caused this. Try again, or head back and we&rsquo;ll
        take it from there.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Magnetic strength={0.25}>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
          >
            Try Again
          </button>
        </Magnetic>
        <Link
          href="/"
          className="text-xs eyebrow uppercase text-ink/70 transition-colors hover:text-accent-deep"
        >
          Back to Green Vital
        </Link>
      </div>
    </main>
  );
}
