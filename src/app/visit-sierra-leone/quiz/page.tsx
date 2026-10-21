import type { Metadata } from "next";
import type { BreadcrumbList, WebPage, WithContext } from "schema-dts";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SierraLeoneQuiz from "@/components/SierraLeoneQuiz";
import { jsonLdScript } from "@/lib/jsonLd";
import { siteUrl } from "@/lib/site";

const description =
  "Take our one-minute quiz to find the Sierra Leone trip that suits you: beaches and islands, rainforest wildlife, history and heritage, or a first-week sampler.";

export const metadata: Metadata = {
  title: "Which Sierra Leone Trip Suits You? Take the Quiz",
  description,
  alternates: { canonical: "/visit-sierra-leone/quiz" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Which Sierra Leone Trip Suits You? Take the Quiz — Green Vital",
    description,
    url: "/visit-sierra-leone/quiz",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Which Sierra Leone Trip Suits You? Take the Quiz — Green Vital",
    description,
  },
};

export default function SierraLeoneQuizPage() {
  const pageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Which Sierra Leone trip suits you?",
    description,
    url: `${siteUrl}/visit-sierra-leone/quiz`,
    isPartOf: { "@type": "WebSite", name: "Green Vital", url: siteUrl },
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Visit Sierra Leone", item: `${siteUrl}/visit-sierra-leone` },
      { "@type": "ListItem", position: 2, name: "Trip quiz", item: `${siteUrl}/visit-sierra-leone/quiz` },
    ],
  };

  return (
    <main className="pb-24 pt-40 sm:pb-32 lg:pt-48">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink/60">
            <Link href="/visit-sierra-leone" className="hover:text-ink">
              Visit Sierra Leone
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">Trip quiz</span>
          </nav>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">One-minute quiz</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Which Sierra Leone trip suits you?
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/70">
            Four quick questions, no email needed. You&rsquo;ll get a trip idea, a few things worth knowing, and the
            guides to read next, from the team that arranges these trips in Freetown every day.
          </p>
        </Reveal>

        <div className="mt-12">
          <SierraLeoneQuiz />
        </div>
      </div>
    </main>
  );
}
