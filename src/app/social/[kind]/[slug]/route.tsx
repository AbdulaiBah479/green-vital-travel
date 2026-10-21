import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getJournalEntry } from "@/lib/journal";
import { getTour } from "@/lib/tours";
import { getDestination } from "@/lib/destinations";
import { siteName } from "@/lib/site";

// Branded 4:5 cards for social posts (Facebook, Instagram, LinkedIn), made on
// demand from the site's own content: /social/guide/<slug>, /social/tour/<slug>
// or /social/destination/<slug>. Only known slugs resolve, so this can't be
// used to render arbitrary text. Instagram only accepts JPEG, so the PNG that
// next/og produces is converted with sharp when it is available.

export const runtime = "nodejs";

const WIDTH = 1080;
const HEIGHT = 1350;

type CardData = { title: string; eyebrow: string; img: string };

function cardData(kind: string, slug: string): CardData | null {
  if (kind === "guide") {
    const g = getJournalEntry(slug);
    return g ? { title: g.title, eyebrow: `${g.category} · ${g.readTime}`, img: g.img } : null;
  }
  if (kind === "tour") {
    const t = getTour(slug);
    return t ? { title: t.title, eyebrow: `${t.category} · ${t.nights} nights`, img: t.heroImg } : null;
  }
  if (kind === "destination") {
    const d = getDestination(slug);
    return d ? { title: d.name, eyebrow: `${d.country} · ${d.region}`, img: d.heroImg } : null;
  }
  return null;
}

// Images are read from /public by path, so only accept plain site-relative paths.
function imageDataUrl(publicPath: string): string | null {
  if (!publicPath.startsWith("/") || publicPath.includes("..")) return null;
  try {
    const file = readFileSync(join(process.cwd(), "public", publicPath));
    const ext = publicPath.toLowerCase().endsWith(".png") ? "png" : "jpeg";
    return `data:image/${ext};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

const logoDataUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/icon-512.png")).toString("base64")}`;

export async function GET(_request: Request, { params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const data = cardData(kind, slug);
  if (!data) return new Response("Not found", { status: 404 });

  const photo = imageDataUrl(data.img);
  // Long titles shrink so they never overflow the card.
  const titleSize = data.title.length > 70 ? 62 : data.title.length > 45 ? 72 : 84;

  const png = await new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a2f3d",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={WIDTH}
            height={HEIGHT}
            style={{ position: "absolute", top: 0, left: 0, width: WIDTH, height: HEIGHT, objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: WIDTH,
            height: HEIGHT,
            display: "flex",
            backgroundImage:
              "linear-gradient(to bottom, rgba(10,47,61,0.55) 0%, rgba(10,47,61,0) 28%, rgba(10,47,61,0.55) 55%, rgba(10,47,61,0.96) 100%)",
          }}
        />

        <div style={{ position: "absolute", top: 64, left: 64, display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#ffffff",
              backgroundImage: `url(${logoDataUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>
            {siteName.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 78,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#f2c14e", fontWeight: 700 }}>
            {data.eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: titleSize,
              lineHeight: 1.12,
              fontWeight: 700,
            }}
          >
            {data.title}
          </div>
          <div style={{ display: "flex", width: 96, height: 4, background: "#f2c14e", marginTop: 38 }} />
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "rgba(255,255,255,0.85)" }}>
            gtravelsandtours.com · Freetown, Sierra Leone
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  ).arrayBuffer();

  let body: Uint8Array = new Uint8Array(png);
  let contentType = "image/png";
  try {
    const sharp = (await import("sharp")).default;
    body = await sharp(Buffer.from(png)).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
    contentType = "image/jpeg";
  } catch {
    // sharp unavailable: fall back to the PNG (fine for Facebook and LinkedIn).
  }

  return new Response(Buffer.from(body), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex",
    },
  });
}
