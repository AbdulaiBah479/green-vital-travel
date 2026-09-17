import type { Metadata } from "next";
import type { FAQPage, WithContext } from "schema-dts";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Stats from "@/components/Stats";
import Philosophy from "@/components/Philosophy";
import Destinations from "@/components/Destinations";
import FeaturedTours from "@/components/FeaturedTours";
import Journey from "@/components/Journey";
import TripMatcher from "@/components/TripMatcher";
import PlannerTeaser from "@/components/PlannerTeaser";
import ReviewsSummary from "@/components/ReviewsSummary";
import JournalTeaser from "@/components/JournalTeaser";
import Faq from "@/components/Faq";
import { faqs } from "@/lib/faqs";
import Cta from "@/components/Cta";
import ScrollProgress from "@/components/ScrollProgress";
import { jsonLdScript } from "@/lib/jsonLd";
import { siteUrl, siteTitle, siteDescription } from "@/lib/site";
import AgencyOverview from "@/components/AgencyOverview";
import AirlinePartners from "@/components/AirlinePartners";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const faqJsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <ScrollProgress />
      <Hero />
      <Stats />
      <AgencyOverview />
      <Destinations />
      <FeaturedTours />
      <Philosophy />
      <Journey />
      <TripMatcher />
      <PlannerTeaser />
      <TrustStrip />
      <AirlinePartners />
      <ReviewsSummary />
      <JournalTeaser />
      <Faq />
      <Cta />
    </main>
  );
}
