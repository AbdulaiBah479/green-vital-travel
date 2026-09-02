import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const alt = "The Journal — Green Vital";
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            aria-hidden="true"
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
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
              letterSpacing: 8,
              color: "#1f9d6b",
              fontFamily: "Arial, sans-serif",
            }}
          >
            KRISHNA TRAVELS JOURNAL
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontStyle: "italic",
            marginTop: 28,
            maxWidth: 920,
            lineHeight: 1.25,
          }}
        >
          Notes on planning, places, and the difference between the two.
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
      </div>
    ),
    { ...size }
  );
}
