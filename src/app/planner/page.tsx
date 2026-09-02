import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TripPlanner from "@/components/TripPlanner";

const description =
  "Answer four quick questions and get a real day-by-day draft itinerary — a starting sketch our team refines from there.";

export const metadata: Metadata = {
  title: "Trip Planner",
  description,
  alternates: {
    canonical: "/planner",
  },
  openGraph: {
    title: "Trip Planner — Green Vital",
    description,
    url: "/planner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trip Planner — Green Vital",
    description: description,
  },
};

export default function PlannerPage() {
  return (
    <main className="pt-40 pb-24 sm:pb-32 lg:pt-48">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">
            The Trip Planner
          </p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            A real draft itinerary, built in under a minute.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            No email required. Answer four questions and we&rsquo;ll sketch a
            day-by-day starting point from the same building blocks our
            team actually uses — then a real person takes it from there.
          </p>
        </Reveal>

        <div className="mt-14">
          <TripPlanner />
        </div>
      </div>
    </main>
  );
}
