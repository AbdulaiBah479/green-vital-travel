import type { MetadataRoute } from "next";
import { siteName, siteTitle, siteDescription } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a2f3d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
