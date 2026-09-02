import { journalEntries } from "@/lib/journal";
import { siteUrl, siteName, siteDescription } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = journalEntries
    .map((entry) => {
      const url = `${siteUrl}/journal/${entry.slug}`;
      return `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(entry.isoDate).toUTCString()}</pubDate>
      <description>${escapeXml(entry.excerpt)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteName)} Journal</title>
    <link>${siteUrl}/journal</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
