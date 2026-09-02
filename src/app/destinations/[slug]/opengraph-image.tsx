import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { getDestination } from "@/lib/destinations";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const logoDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/icon-512.png")
).toString("base64")}`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  const name = d?.name ?? "Destinations";
  const country = d?.country ?? "";
  const hook = d?.hook ?? "Green Vital";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#0a2f3d",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            color: "#1f9d6b",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {country ? country.toUpperCase() : "DESTINATION"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontStyle: "italic",
            marginTop: 28,
            maxWidth: 950,
            lineHeight: 1.15,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 20,
            maxWidth: 850,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {hook}
        </div>
        <div
          style={{
            display: "flex",
            width: 64,
            height: 2,
            background: "#1f9d6b",
            marginTop: 44,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
          <div
            aria-hidden="true"
            style={{
              width: 40,
              height: 40,
              borderRadius: 9,
              background: "#ffffff",
              backgroundImage: `url(${logoDataUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              color: "rgba(255,255,255,0.55)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            KRISHNA TRAVELS
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
