"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          background: "#ffffff",
          color: "#0a2f3d",
          fontFamily: "Georgia, serif",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#0f6b47",
            marginBottom: "1.5rem",
          }}
        >
          Greenvital
        </p>
        <h1 style={{ fontSize: "2rem", fontStyle: "italic", maxWidth: 480, margin: 0 }}>
          The site hit an unexpected error.
        </h1>
        <p style={{ marginTop: "1.5rem", maxWidth: 420, fontFamily: "Arial, sans-serif", fontSize: "0.9rem", opacity: 0.7 }}>
          Try reloading — if it keeps happening, the fault is ours, not
          yours.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            marginTop: "2rem",
            padding: "0.9rem 1.8rem",
            borderRadius: "9999px",
            background: "#0a2f3d",
            color: "#ffffff",
            border: "none",
            fontFamily: "Arial, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
