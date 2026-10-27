import { Stars } from "./TourCard";
import { googleReviews } from "@/lib/googleReviews";
import { googleBusinessUrl } from "@/lib/site";

/** Customers' own words from Google, each marked as a Google review and linked to the profile where it can be checked. */
export default function GoogleReviews() {
  if (googleReviews.length === 0) return null;
  return (
    <section aria-labelledby="google-reviews-title">
      <p className="eyebrow mb-3 text-center text-xs uppercase text-accent-deep">From Google</p>
      <h2 id="google-reviews-title" className="mb-10 text-balance text-center font-serif text-3xl leading-tight text-ink">
        What travelers say on Google
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {googleReviews.map((r) => (
          <li key={r.name} className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-paper p-7">
            <span className="flex items-center justify-between gap-3">
              <Stars rating={r.rating} />
              <span className="sr-only">{r.rating} out of 5 stars</span>
              <span className="text-xs text-ink/60">{r.month}</span>
            </span>
            <blockquote className="flex-1 font-serif text-lg leading-snug text-ink">&ldquo;{r.text}&rdquo;</blockquote>
            <p className="text-xs eyebrow uppercase text-ink/70">
              {r.name} <span className="ml-1 normal-case tracking-normal text-ink/50">· Google review</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <a
          href={googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs eyebrow uppercase text-accent-deep underline-offset-4 hover:underline"
        >
          Read every review on Google →
        </a>
      </p>
    </section>
  );
}
