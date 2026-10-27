import { createHmac, timingSafeEqual } from "node:crypto";
import data from "../../content/site-reviews.json";

// Reviews written on the website. A visitor's submission is emailed to the
// business with a signed "publish" link; opening it and confirming adds the
// review to content/site-reviews.json, and the site rebuilds to show it.
// Nothing here is shown until the owner approves it.
export type SiteReview = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  /** What the customer used Green Vital for, e.g. "Air ticket". Optional. */
  service?: string;
  /** ISO date the review was submitted. */
  isoDate: string;
};

export const siteReviews = data as SiteReview[];

export { REVIEW_SERVICES } from "./siteReviews-services";

const LINK_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;

function base64url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Builds the signed token carried in the publish link. The review travels inside the link, so no database is needed. */
export function createReviewToken(review: SiteReview, secret: string): string {
  const payload = base64url(JSON.stringify(review));
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the review if the token's signature is valid and the link has not expired, otherwise null. */
export function readReviewToken(token: string, secret: string, now = Date.now()): SiteReview | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const review = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SiteReview;
    const submitted = Date.parse(review.isoDate);
    if (!Number.isFinite(submitted) || now - submitted > LINK_LIFETIME_MS) return null;
    if (!review.id || !review.name || !review.body || ![1, 2, 3, 4, 5].includes(review.rating)) return null;
    return review;
  } catch {
    return null;
  }
}

/** A short, stable id so the same submission can never be published twice. */
export function reviewId(name: string, body: string, isoDate: string): string {
  return createHmac("sha256", "review-id").update(`${name}|${body}|${isoDate}`).digest("hex").slice(0, 12);
}
