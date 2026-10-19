import type { Metadata } from "next";
import type { Article, BreadcrumbList, WithContext } from "schema-dts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalEntries, getJournalEntry } from "@/lib/journal";
import { siteUrl, siteName } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return {};

  const seoTitle = entry.metaTitle ?? entry.title;

  return {
    title: seoTitle,
    description: entry.excerpt,
    alternates: {
      canonical: `/journal/${entry.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: entry.excerpt,
      url: `/journal/${entry.slug}`,
      type: "article",
      publishedTime: entry.isoDate,
      section: entry.category,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: entry.excerpt,
    },
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  const more = journalEntries.filter((e) => e.slug !== slug).slice(0, 2);
  const url = `${siteUrl}/journal/${entry.slug}`;

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.excerpt,
    image: `${siteUrl}${entry.img}`,
    datePublished: entry.isoDate,
    dateModified: entry.isoDate,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${siteUrl}/journal` },
      { "@type": "ListItem", position: 3, name: entry.title, item: url },
    ],
  };

  return (
    <main className="pb-24 sm:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="relative flex h-[60vh] min-h-[480px] w-full items-end overflow-hidden bg-ink">
        <Image
          src={entry.img}
          alt={entry.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 sm:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs eyebrow uppercase text-paper/50">
            <Link href="/" className="transition-colors hover:text-paper">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/journal" className="transition-colors hover:text-paper">
              Journal
            </Link>
          </nav>
          <p className="eyebrow mb-4 text-xs uppercase text-accent-soft">
            {entry.category} · {entry.readTime}
          </p>
          <h1 className="text-balance font-serif text-4xl leading-tight text-paper sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-4 text-sm text-paper/60">
            <time dateTime={entry.isoDate}>{entry.date}</time>
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-2xl px-6 pt-16 sm:px-10">
        <Reveal>
          <div className="space-y-6">
            {entry.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-balance text-lg leading-relaxed text-ink/80 first:font-serif first:text-2xl first:italic first:leading-snug first:text-ink"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-ink/10 pt-10">
          <h2 className="eyebrow mb-4 text-xs uppercase text-accent-deep">
            Start Planning
          </h2>
          <p className="max-w-md text-balance font-serif text-2xl italic leading-snug text-ink">
            If a place in this note is starting to sound like your next trip,
            let&rsquo;s talk about it.
          </p>
          <Magnetic strength={0.25} className="mt-6">
            <Link
              href="/#contact"
              className="inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
            >
              Talk to Our Team
            </Link>
          </Magnetic>
        </Reveal>

        {more.length > 0 && (
          <div className="mt-20 border-t border-ink/10 pt-10">
            <h2 className="eyebrow mb-6 text-xs uppercase text-accent-deep">
              Also in the Journal
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {more.map((e) => (
                <Link
                  key={e.slug}
                  href={`/journal/${e.slug}`}
                  data-cursor-hover
                  className="group"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={e.img}
                      alt={e.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-accent-deep">
                    {e.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
