import { escapeHtml } from "@/lib/inquiries";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { readReviewToken, type SiteReview } from "@/lib/siteReviews";

// Opened from the email the business receives for each website review.
// GET only shows the review and a Publish button (so an email scanner that
// pre-opens links can never publish anything); POST does the publishing.
const FILE_PATH = "content/site-reviews.json";

const page = (title: string, body: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(
      title
    )}</title><style>body{font-family:system-ui,sans-serif;background:#f6f3ec;color:#1b2b22;margin:0;padding:24px}main{max-width:560px;margin:40px auto;background:#fff;border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.06)}h1{font-size:22px;margin:0 0 12px}blockquote{margin:16px 0;padding:14px 16px;background:#f1efe6;border-radius:12px;white-space:pre-wrap}button{background:#1f5c3f;color:#fff;border:0;border-radius:999px;padding:14px 28px;font-size:15px;cursor:pointer}small{color:#666}</style></head><body><main>${body}</main></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    }
  );

function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function reviewSummary(review: SiteReview) {
  return `<p><strong>${escapeHtml(review.name)}</strong> &middot; ${stars(review.rating)}${
    review.service ? ` &middot; ${escapeHtml(review.service)}` : ""
  }</p><blockquote>${escapeHtml(review.body)}</blockquote>`;
}

function setup() {
  const secret = process.env.REVIEW_SECRET;
  return secret ? { secret } : null;
}

export async function GET(request: Request) {
  const config = setup();
  if (!config) return page("Not set up", "<h1>Not set up yet</h1><p>REVIEW_SECRET is missing on the website.</p>", 503);

  const token = new URL(request.url).searchParams.get("t") ?? "";
  const review = readReviewToken(token, config.secret);
  if (!review) {
    return page("Link not valid", "<h1>This link is not valid</h1><p>It may have expired (links last 30 days) or been changed.</p>", 400);
  }

  return page(
    "Publish this review?",
    `<h1>Publish this review?</h1>${reviewSummary(review)}<form method="post" action="/api/review/approve"><input type="hidden" name="t" value="${escapeHtml(
      token
    )}"><button type="submit">Publish on the website</button></form><p><small>If you do not want it shown, just close this page. Nothing is published until you press the button.</small></p>`
  );
}

export async function POST(request: Request) {
  if (!rateLimit(`review-approve:${clientKey(request)}`, 10, 10 * 60 * 1000)) {
    return page("Slow down", "<h1>Too many attempts</h1><p>Please try again in a few minutes.</p>", 429);
  }

  const config = setup();
  if (!config) return page("Not set up", "<h1>Not set up yet</h1><p>REVIEW_SECRET is missing on the website.</p>", 503);

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return page(
      "Not set up",
      "<h1>Publishing is not set up yet</h1><p>GITHUB_TOKEN is missing on the website, so the review could not be added.</p>",
      503
    );
  }

  const form = await request.formData();
  const review = readReviewToken(String(form.get("t") ?? ""), config.secret);
  if (!review) {
    return page("Link not valid", "<h1>This link is not valid</h1><p>It may have expired or been changed.</p>", 400);
  }

  const repo = process.env.GITHUB_REPO || "AbdulaiBah479/green-vital-travel";
  const branch = process.env.GITHUB_BRANCH || "master";
  const url = `https://api.github.com/repos/${repo}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "green-vital-website",
  };

  try {
    const current = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, { headers, cache: "no-store" });
    if (!current.ok) throw new Error(`read failed (${current.status})`);
    const file = (await current.json()) as { sha: string; content: string };
    const existing = JSON.parse(Buffer.from(file.content, "base64").toString("utf8")) as SiteReview[];

    if (existing.some((r) => r.id === review.id)) {
      return page("Already published", "<h1>Already published</h1><p>This review is already on the website.</p>");
    }

    const updated = [review, ...existing];
    const saved = await fetch(url, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Publish website review from ${review.name}`,
        content: Buffer.from(`${JSON.stringify(updated, null, 2)}\n`, "utf8").toString("base64"),
        sha: file.sha,
        branch,
        committer: { name: "Green Vital Website", email: "info@gtravelsandtours.com" },
      }),
    });
    if (!saved.ok) throw new Error(`write failed (${saved.status})`);

    return page(
      "Published",
      `<h1>Published</h1>${reviewSummary(review)}<p>It will appear on the Reviews page in a few minutes, once the site finishes updating.</p>`
    );
  } catch (error) {
    console.error("Review publish failed:", error);
    return page("Could not publish", "<h1>Could not publish</h1><p>Something went wrong. Please try the link again in a minute.</p>", 502);
  }
}
