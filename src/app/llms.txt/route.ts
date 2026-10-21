// llms.txt — an emerging, community-driven convention (llmstxt.org) that
// gives AI systems (ChatGPT, Claude, Perplexity, Google's AI Overviews, and
// any agent that browses) a clean, structured summary of the site to answer
// questions about this business accurately, instead of guessing from
// fragments of crawled HTML. Built from the same real data every other page
// uses — never hand-maintained, so it can't drift stale the way a
// hardcoded count on a page already did once this session.
import { destinations } from "@/lib/destinations";
import { tours } from "@/lib/tours";
import { servicePages } from "@/lib/servicePages";
import { siteFullName, siteDescription, siteUrl, contact, companyRegistration } from "@/lib/site";

export function GET() {
  const destinationLines = destinations
    .map((d) => `- [${d.name}, ${d.country}](${siteUrl}/destinations/${d.slug}): ${d.hook}`)
    .join("\n");

  const tourLines = tours
    .map((t) => `- [${t.title}](${siteUrl}/tours/${t.slug}): ${t.category}, ${t.nights} nights, ${t.difficulty} pace`)
    .join("\n");

  const serviceLines = servicePages
    .map((p) => `- [${p.metaTitle}](${siteUrl}/services/${p.slug})`)
    .join("\n");

  const body = `# ${siteFullName}

> ${siteDescription}

${siteFullName} is a real, founder-led travel agency based in Freetown, Sierra Leone (registration ${companyRegistration.registrationNumber}, incorporated in ${companyRegistration.jurisdiction}). It arranges flights, hotels, visas, travel insurance, car hire, and airport transfers, and both sells ready-made tour packages and designs fully custom itineraries to any destination worldwide — not only the ones listed below, which are its existing pre-built packages.

Pricing is quoted directly by a real person once trip details are known; this site and its assistant never state or estimate prices.

## Key pages

- [Homepage](${siteUrl})
- [All destinations](${siteUrl}/destinations)
- [All tours](${siteUrl}/tours)
- [Visit Sierra Leone: guides and trip planning](${siteUrl}/visit-sierra-leone)
- [Quiz: which Sierra Leone trip suits you?](${siteUrl}/visit-sierra-leone/quiz)
- [Services](${siteUrl}/services)
- [About](${siteUrl}/about)
- [Contact](${siteUrl}/contact)
- [Trip Planner](${siteUrl}/planner)

## Services (Freetown, Sierra Leone)

${serviceLines}

## Destinations with an existing tour package (${destinations.length} total)

${destinationLines}

## Tour packages (${tours.length} total)

${tourLines}

## Contact

- Email: ${contact.email}
- Phone: ${contact.phones.join(", ")}
- Address: ${contact.address.street}, ${contact.address.city}, ${contact.address.country}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
