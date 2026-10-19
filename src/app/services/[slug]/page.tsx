import type { Metadata } from "next";
import type { BreadcrumbList, FAQPage, Service, WithContext } from "schema-dts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { servicePages, getServicePage } from "@/lib/servicePages";
import { jsonLdScript } from "@/lib/jsonLd";
import { siteUrl, siteName, contact } from "@/lib/site";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getServicePage(slug);
  if (!p) return {};

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/services/${p.slug}` },
    openGraph: {
      title: `${p.metaTitle} — Green Vital`,
      description: p.metaDescription,
      url: `/services/${p.slug}`,
      type: "website",
      images: [{ url: p.heroImg, alt: p.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.metaTitle} — Green Vital`,
      description: p.metaDescription,
    },
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getServicePage(slug);
  if (!p) notFound();

  const url = `${siteUrl}/services/${p.slug}`;

  const serviceJsonLd: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.h1,
    serviceType: p.name,
    description: p.metaDescription,
    url,
    image: `${siteUrl}${p.heroImg}`,
    provider: {
      "@type": "TravelAgency",
      name: siteName,
      url: siteUrl,
      telephone: contact.phones[0].replace(/\s/g, ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.street,
        addressLocality: contact.address.city,
        addressCountry: "SL",
      },
    },
    areaServed: [
      { "@type": "Country", name: "Sierra Leone" },
      { "@type": "City", name: "Freetown" },
    ],
  };

  const faqJsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 2, name: p.name, item: url },
    ],
  };

  const others = servicePages.filter((o) => o.slug !== p.slug);

  return (
    <main className="pb-24 sm:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="relative flex h-[50vh] min-h-[460px] w-full items-end overflow-hidden bg-ink">
        <Image src={p.heroImg} alt={p.heroAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center sm:px-10">
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">{p.eyebrow}</p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            {p.h1}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <nav aria-label="Breadcrumb" className="mb-10 text-xs text-ink/60">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink/80">{p.name}</span>
        </nav>

        <Reveal className="space-y-6 text-sm leading-relaxed text-ink/75">
          {p.intro.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <h2 className="eyebrow mb-6 text-xs uppercase text-accent-deep">What you get</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {p.points.map((pt, i) => (
            <Reveal key={pt.title} delay={i * 100}>
              <div className="h-full rounded-3xl border border-ink/10 p-7">
                <h3 className="font-serif text-xl leading-snug text-ink">{pt.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{pt.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl px-6 sm:px-10">
        <h2 className="eyebrow mb-6 text-xs uppercase text-accent-deep">Common questions</h2>
        <dl className="space-y-4">
          {p.faqs.map((f) => (
            <Reveal key={f.question}>
              <div className="rounded-2xl border border-ink/10 p-6">
                <dt className="font-serif text-lg leading-snug text-ink">{f.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">{f.answer}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
          <p className="eyebrow text-xs uppercase text-accent-soft">Talk to us in Freetown</p>
          <h2 className="max-w-md text-balance font-serif text-3xl leading-tight">
            Tell us your plans and we will come back with options.
          </h2>
          <p className="max-w-md text-sm text-paper/70">
            {contact.address.street}, {contact.address.city}, {contact.address.country}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                className="inline-block rounded-full bg-accent px-8 py-4 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
              >
                WhatsApp us
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-block rounded-full border border-paper/30 px-8 py-4 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper"
              >
                Contact page
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-14">
          <h2 className="eyebrow mb-4 text-xs uppercase text-accent-deep">More from Green Vital</h2>
          <ul className="flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="inline-block rounded-full border border-ink/15 px-5 py-2 text-xs text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/tours"
                className="inline-block rounded-full border border-ink/15 px-5 py-2 text-xs text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
              >
                Tour packages
              </Link>
            </li>
            <li>
              <Link
                href="/insurance"
                className="inline-block rounded-full border border-ink/15 px-5 py-2 text-xs text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
              >
                Travel insurance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
