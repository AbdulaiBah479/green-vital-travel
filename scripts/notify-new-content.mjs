// Emails a ready-to-post social caption the moment a new destination,
// tour or Journal guide is added (destinations and tours via the admin panel) — a push to master is what a Tina edit
// actually produces, and each destination/tour lives in its own committed
// file (content/destinations/<slug>.json, content/tours/<slug>.json), so a
// newly ADDED file in this push is exactly "something new just went live,"
// with no separate webhook or admin-side integration needed. Only newly
// added files count — editing an existing destination/tour doesn't
// re-trigger an announcement.
//
// Deliberately standalone (no import from src/lib/aiProviders.ts) — CI
// scripts in this repo run as plain Node with no TypeScript step, so this
// duplicates the small provider-calling logic rather than pull in a build
// step just for one script.
import { execSync } from "node:child_process";
import fs from "node:fs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@gtravelsandtours.com";
const BEFORE_SHA = process.env.GIT_BEFORE_SHA;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gtravelsandtours.com";

// Optional: a Make.com webhook that fans a caption + photo out to Facebook,
// Instagram, and LinkedIn at once. Without it, the email still drafts a
// caption — there's just no one-click "publish" link under it.
const MAKE_PUBLISH_WEBHOOK = process.env.MAKE_PUBLISH_WEBHOOK_URL;

if (!RESEND_API_KEY || !BUSINESS_EMAIL) {
  console.log("RESEND_API_KEY or BUSINESS_EMAIL not set — skipping new-content notification.");
  process.exit(0);
}

// A brand-new repo, a force-push, or the very first commit all produce an
// all-zero or missing "before" SHA — there's no real diff to compare against.
if (!BEFORE_SHA || /^0+$/.test(BEFORE_SHA)) {
  console.log("No previous commit to diff against — skipping.");
  process.exit(0);
}

function addedFiles(dir) {
  try {
    const output = execSync(`git diff --diff-filter=A --name-only ${BEFORE_SHA}..HEAD -- ${dir}`, {
      encoding: "utf-8",
    });
    return output
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.endsWith(".json") && !f.endsWith("_index.json"));
  } catch (err) {
    console.error(`Failed to diff ${dir}:`, err.message);
    return [];
  }
}

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

// Journal guides live in src/lib/journal.ts rather than one file each, so a
// "new" guide is a slug added to that file in this push. This reads just the
// fields the caption needs; it is a plain-Node scan, not a TypeScript parse.
function addedJournalEntries() {
  let diff = "";
  try {
    diff = execSync(`git diff ${BEFORE_SHA}..HEAD -- src/lib/journal.ts`, { encoding: "utf-8" });
  } catch (err) {
    console.error("Failed to diff journal.ts:", err.message);
    return [];
  }
  const slugs = [...diff.matchAll(/^\+\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
  if (slugs.length === 0) return [];

  const source = fs.readFileSync("src/lib/journal.ts", "utf-8");
  const field = (block, name) => {
    const m = block.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) return "";
    try {
      return JSON.parse(`"${m[1]}"`);
    } catch {
      return m[1];
    }
  };

  return slugs
    .map((slug) => {
      const start = source.indexOf(`slug: "${slug}"`);
      if (start < 0) return null;
      const end = source.indexOf("\n  },", start);
      const block = source.slice(start, end < 0 ? undefined : end);
      return { slug, title: field(block, "title"), excerpt: field(block, "excerpt"), img: field(block, "img") };
    })
    .filter((e) => e && e.title);
}

const newDestinations = addedFiles("content/destinations/").map(readJson);
const newTours = addedFiles("content/tours/").map(readJson);
const newGuides = addedJournalEntries();

if (newDestinations.length === 0 && newTours.length === 0 && newGuides.length === 0) {
  console.log("No new destinations, tours or guides in this push — nothing to notify.");
  process.exit(0);
}

const PROVIDERS = [
  process.env.GROQ_API_KEY && {
    name: "groq",
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
    extraBody: { reasoning_format: "hidden" },
  },
  process.env.GEMINI_API_KEY && {
    name: "gemini",
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
  },
  process.env.CEREBRAS_API_KEY && {
    name: "cerebras",
    apiKey: process.env.CEREBRAS_API_KEY,
    baseURL: "https://api.cerebras.ai/v1",
    model: process.env.CEREBRAS_MODEL || "llama-3.3-70b",
  },
].filter(Boolean);

async function draftCaption(prompt) {
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(`${provider.baseURL}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${provider.apiKey}` },
        body: JSON.stringify({
          model: provider.model,
          temperature: 0.6,
          max_tokens: 200,
          messages: [{ role: "user", content: prompt }],
          ...provider.extraBody,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content?.trim();
      if (text) return text;
    } catch {
      // Try the next provider.
    }
  }
  return null;
}

// Each platform rewards something different, so one drafted caption becomes
// three posts: Facebook gets a clickable link and a few tags, Instagram (where
// links in captions aren't clickable) points to the bio and carries a wider
// hashtag set, and LinkedIn keeps a professional tone with few tags. The
// Make scenario reads captionFacebook / captionInstagram / captionLinkedin and
// falls back to `caption` when a platform-specific one is missing.
const FB_TAGS = "#SierraLeone #VisitSierraLeone #Freetown #TravelAfrica #WestAfrica";
const IG_TAGS =
  "#SierraLeone #VisitSierraLeone #Freetown #Salone #WestAfrica #TravelAfrica #DiscoverAfrica #ExploreAfrica #SierraLeoneTourism #HiddenGems #TravelInspiration #Wanderlust #TravelAgency #FreetownSierraLeone";
const LI_TAGS = "#SierraLeone #Travel #Tourism #WestAfrica #Freetown";

function whatsappNumber() {
  try {
    return readJson("content/settings/index.json").whatsapp || "";
  } catch {
    return "";
  }
}

// The AI is asked for a few hashtags of its own; drop any trailing hashtag-only
// tail so the standard sets below aren't duplicated.
function stripTrailingHashtags(caption) {
  return caption.replace(/(?:\s+#\w+)+\s*$/u, "").trim();
}

function platformCaptions(caption, pageUrl) {
  const base = stripTrailingHashtags(caption);
  const phone = whatsappNumber();
  const contactLine = phone ? `Message us on WhatsApp ${phone} or visit ${SITE_URL.replace(/^https?:\/\//, "")}.` : `Visit ${SITE_URL.replace(/^https?:\/\//, "")}.`;
  return {
    captionFacebook: `${base}${pageUrl ? `\n\n👉 ${pageUrl}` : ""}\n\n${contactLine}\n\n${FB_TAGS}`,
    captionInstagram: `${base}\n\n👉 Link in our bio${pageUrl ? `: ${pageUrl.replace(/^https?:\/\//, "")}` : ""}\n📍 Freetown, Sierra Leone\n💬 ${phone ? `WhatsApp ${phone}` : "DM us"}\n\n${IG_TAGS}`,
    captionLinkedin: `${base}${pageUrl ? `\n\nRead more: ${pageUrl}` : ""}\n\nGreen Vital Travel and Tour Agency, Freetown.\n\n${LI_TAGS}`,
  };
}

// `heroImg` is a site path to the image to post: a branded card such as
// /social/guide/<slug> (see src/app/social), not a raw photo.
function publishLink(caption, heroImg, pageUrl) {
  if (!MAKE_PUBLISH_WEBHOOK) return "";
  const imageUrl = `${SITE_URL}${heroImg}`;
  const params = new URLSearchParams({
    caption: pageUrl ? `${caption}\n\n${pageUrl}` : caption,
    ...platformCaptions(caption, pageUrl),
    imageUrl,
  });
  return `\nPublish to Facebook, Instagram & LinkedIn now:\n${MAKE_PUBLISH_WEBHOOK}?${params}\n`;
}

async function buildSection(label, promptText, heroImg, pageUrl) {
  const caption = PROVIDERS.length > 0 ? await draftCaption(promptText) : null;
  if (!caption) {
    return `${label}\n\n(No AI provider configured — add one to get a draft caption here automatically.)\n${pageUrl ? `Link: ${pageUrl}\n` : ""}`;
  }
  const variants = platformCaptions(caption, pageUrl);
  return [
    `${label}`,
    "",
    "Facebook version:",
    variants.captionFacebook,
    "",
    "Instagram version:",
    variants.captionInstagram,
    "",
    "LinkedIn version:",
    variants.captionLinkedin,
    publishLink(caption, heroImg, pageUrl),
  ].join("\n");
}

async function main() {
  const sections = [];

  for (const d of newDestinations) {
    sections.push(
      await buildSection(
        `New destination: ${d.name}, ${d.country}`,
        `Write a short, upbeat Instagram/Facebook caption (2-3 sentences, end with 3-5 relevant hashtags) announcing that Green Vital Travel now offers trips to ${d.name}, ${d.country}. Hook: "${d.hook}". No markdown, plain text only.`,
        `/social/destination/${d.slug}`
      )
    );
  }

  for (const t of newTours) {
    sections.push(
      await buildSection(
        `New tour package: ${t.title}`,
        `Write a short, upbeat Instagram/Facebook caption (2-3 sentences, end with 3-5 relevant hashtags) announcing Green Vital Travel's new tour package "${t.title}" — ${t.nights} nights, ${t.category} style, ${t.difficulty} pace. Summary: "${t.summary}". No markdown, plain text only.`,
        `/social/tour/${t.slug}`
      )
    );
  }

  for (const g of newGuides) {
    sections.push(
      await buildSection(
        `New travel guide: ${g.title}`,
        `Write a short, upbeat Instagram/Facebook caption (2-3 sentences, end with 3-5 relevant hashtags) sharing Green Vital Travel's new travel guide "${g.title}" for travelers in and to Sierra Leone. Summary: "${g.excerpt}". Say the full guide is on our website. No markdown, no prices, plain text only.`,
        `/social/guide/${g.slug}`,
        `${SITE_URL}/journal/${g.slug}`
      )
    );
  }

  const names = [
    ...newDestinations.map((d) => d.name),
    ...newTours.map((t) => t.title),
    ...newGuides.map((g) => g.title),
  ];
  const body = [
    `${names.length} new listing(s) just went live on gtravelsandtours.com.`,
    "",
    "Review each draft before posting — same rule as everything else: nothing here states a price.",
    "",
    ...sections,
  ].join("\n");

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Green Vital <${EMAIL_FROM}>`,
      to: [BUSINESS_EMAIL],
      subject: `New on the site: ${names.join(", ")}`,
      text: body,
    }),
  });

  if (!emailRes.ok) {
    console.error("Failed to send new-content notification email:", await emailRes.text());
    process.exit(1);
  }

  console.log(`Sent new-content notification for ${newDestinations.length} destination(s), ${newTours.length} tour(s), ${newGuides.length} guide(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
