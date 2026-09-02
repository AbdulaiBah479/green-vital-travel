import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { siteTitle, siteDescription } from "@/lib/site";

export const alt = siteTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const logoDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/icon-512.png")
).toString("base64")}`;

export default function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            aria-hidden="true"
            style={{
              width: 96,
              height: 96,
              borderRadius: 18,
              background: "#ffffff",
              backgroundImage: `url(${logoDataUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, color: "#1f9d6b" }}>
            KRISHNA TRAVELS
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontStyle: "italic",
            marginTop: 40,
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          Travel, written in your own hand.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
            marginTop: 36,
            maxWidth: 820,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {siteDescription}
        </div>
      </div>
    ),
    { ...size }
  );
}
