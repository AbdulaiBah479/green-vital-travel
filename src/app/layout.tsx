import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SkipLink from "@/components/SkipLink";
import BackToTop from "@/components/BackToTop";
import CookieNotice from "@/components/CookieNotice";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import { WishlistProvider } from "@/lib/WishlistContext";
import { jsonLdScript } from "@/lib/jsonLd";
import {
  siteUrl,
  siteName,
  siteFullName,
  siteTitle,
  siteDescription,
  siteKeywords,
  contact,
} from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Green Vital",
  },
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/journal/feed.xml", title: `${siteName} Journal` },
      ],
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
    url: siteUrl,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "eF1Hbp2pcrmSeQZ9lD2zhvmoffbGplkiZMOWX6wbyMI",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2f3d",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteName,
  legalName: siteFullName,
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  image: `${siteUrl}/icon-512.png`,
  description: siteDescription,
  email: contact.email,
  telephone: contact.phones[0].replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressCountry: contact.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.483077,
    longitude: -13.258893,
  },
  areaServed: "Worldwide",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
        <CurrencyProvider>
          <WishlistProvider>
            <SkipLink />
            <Grain />
            <Cursor />
            <Nav />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <BackToTop />
            <CookieNotice />
            <WhatsAppButton />
            <Chatbot />
          </WishlistProvider>
        </CurrencyProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "flex items-center gap-3 rounded-full border border-ink/10 bg-ink px-5 py-3 text-xs eyebrow uppercase text-paper shadow-xl",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
