// Notifies IndexNow-participating search engines (Bing, Yandex, Seznam,
// Naver — Google doesn't support this open protocol) the moment content
// changes, instead of waiting for their own crawl schedule to notice.
// Reads the live sitemap so the submitted URL list can never drift out of
// sync with what actually exists — same anti-staleness pattern as
// src/app/sitemap.ts and src/app/llms.txt/route.ts.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://greenvitaltravelandtour.com";
// Trimmed defensively — a stray trailing newline/space is an easy thing to
// paste into a GitHub secret by accident, and IndexNow rejects it outright
// rather than trimming it for you. Not a real secret either way: this same
// key is published in plaintext at <SITE_URL>/<key>.txt for IndexNow itself
// to read, so it's safe to log for debugging.
const KEY = (process.env.INDEXNOW_KEY || "").trim();

if (!KEY) {
  console.log("INDEXNOW_KEY not set — skipping IndexNow submission.");
  process.exit(0);
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(KEY)) {
  throw new Error(
    `INDEXNOW_KEY is set but isn't a valid IndexNow key: ${JSON.stringify(KEY)} (length ${KEY.length}). ` +
      "It must be 8-128 characters, letters/numbers/dashes only."
  );
}

async function main() {
  const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
  }
  const xml = await sitemapRes.text();
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  if (urlList.length === 0) {
    throw new Error("Sitemap had no URLs — refusing to submit an empty list.");
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  // IndexNow returns 200 or 202 on success.
  if (!res.ok && res.status !== 202) {
    const body = await res.text().catch(() => "");
    throw new Error(`IndexNow submission failed: ${res.status} ${body}`);
  }

  console.log(`Submitted ${urlList.length} URLs to IndexNow (status ${res.status}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
