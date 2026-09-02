import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import BookingWizard from "@/components/BookingWizard";
import { tours, getTour } from "@/lib/tours";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};

  return {
    title: `Reserve — ${t.title}`,
    description: `Request a reservation for ${t.title}. No payment due now — our team confirms availability and takes a deposit.`,
    alternates: { canonical: `/book/${t.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            Reserve Your Trip
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {tour.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-balance text-center text-sm leading-relaxed text-ink/70">
            A four-step request — no payment now. Our team confirms availability and takes a
            deposit once everything&rsquo;s locked in.
          </p>
        </Reveal>

        <div className="mt-14">
          <Suspense fallback={null}>
            <BookingWizard tour={tour} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
