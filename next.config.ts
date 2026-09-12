import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

// Next.js injects its own inline hydration/RSC-payload <script> tags and
// this app sets a couple of inline styles for computed values (stagger
// delays, dynamic widths) — neither carries a nonce, so 'unsafe-inline' is
// required for script-src/style-src rather than a false sense of security
// from a CSP that would just break the site. Everything else is locked to
// 'self' plus the one remote image host actually in use.
const csp = [
  "default-src 'self'",
  // React's dev-mode error overlay reconstructs call stacks with eval(),
  // so 'unsafe-eval' is added for local dev only — production keeps the
  // stricter policy, since React never uses eval() in production mode.
  // @vercel/analytics and @vercel/speed-insights only need an external host
  // in dev — that's their local debug script (va.vercel-scripts.com); once
  // actually deployed to Vercel both load from the site's own domain, so
  // production's script-src stays locked to 'self'.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // All photography is self-hosted under /public/images — no remote host
  // needed here anymore.
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws://localhost:* http://localhost:* https://va.vercel-scripts.com" : ""}`,
  // The Contact page embeds an OpenStreetMap iframe for the office location —
  // OSM's embed doesn't set tracking cookies, unlike Google Maps, which
  // matters since the site's cookie notice promises no tracking cookies.
  "frame-src https://www.openstreetmap.org",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Only honored by browsers over HTTPS, so harmless in local HTTP dev —
  // set now so it's already live the moment the real domain goes up.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Drops the "X-Powered-By: Next.js" response header — free information
  // disclosure otherwise handed to anyone fingerprinting the stack.
  poweredByHeader: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Every photo is self-hosted under /public/images — no remote patterns needed.
    formats: ["image/avif", "image/webp"],
    // These source photos never change once published — cache the
    // optimized variants for a year instead of Next's 60s default.
    minimumCacheTTL: 31536000,
    // Next.js 16 restricts quality props to an explicit allow-list (default
    // is [75] only) and silently coerces anything else to the nearest
    // allowed value. The services-section imagery deliberately requests 85
    // for extra sharpness — without listing it here that request would be
    // silently downgraded back to 75.
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Static /public assets aren't content-hashed, so this is a
        // deliberately moderate cache lifetime (not `immutable`) — repeat
        // visits load instantly, but a future replace of the same filename
        // still reaches visitors within a day rather than staying stuck.
        source: "/:path*.(mp4|jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
