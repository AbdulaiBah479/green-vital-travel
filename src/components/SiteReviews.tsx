import { Stars } from "./TourCard";
import { siteReviews } from "@/lib/siteReviews";

const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/** Reviews customers wrote on this website and the business approved. Shown with their own words, name and month. */
export default function SiteReviews() {
  if (siteReviews.length === 0) return null;
  return (
    <section aria-labelledby="site-reviews-title">
      <p className="eyebrow mb-3 text-center text-xs uppercase text-accent-deep">From our customers</p>
      <h2 id="site-reviews-title" className="mb-10 text-balance text-center font-serif text-3xl leading-tight text-ink">
        Reviews written on this website
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteReviews.map((r) => (
          <li key={r.id} className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-paper p-7">
            <span className="flex items-center justify-between gap-3">
              <Stars rating={r.rating} />
              <span className="sr-only">{r.rating} out of 5 stars</span>
              <span className="text-xs text-ink/60">{dateLabel(r.isoDate)}</span>
            </span>
            <blockquote className="flex-1 whitespace-pre-line font-serif text-lg leading-snug text-ink">
              &ldquo;{r.body}&rdquo;
            </blockquote>
            <p className="text-xs eyebrow uppercase text-ink/70">
              {r.name}
              {r.service && <span className="ml-1 normal-case tracking-normal text-ink/50">· {r.service}</span>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
