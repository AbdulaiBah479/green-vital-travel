import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Password-protected staff-only tools — never anything a visitor
      // should land on from search, on top of the noindex meta tag and the
      // login wall it's already behind.
      disallow: "/tools",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
