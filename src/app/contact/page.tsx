import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import OfficeMap from "@/components/OfficeMap";
import { contact } from "@/lib/site";

const description =
  "One office in Freetown, one team — reach us directly, or start with the form and we'll route it to the right person.";

export const metadata: Metadata = {
  title: "Contact Our Freetown Travel Agency",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — Green Vital", description, url: "/contact", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Green Vital",
    description: description,
  },
};

const office = {
  city: contact.address.city,
  detail: `${contact.address.street}, ${contact.address.city}, ${contact.address.country}`,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; amount?: string }>;
}) {
  const { subject, amount } = await searchParams;
  const initialMessage = amount ? `I'd like to purchase a $${amount} gift card.` : undefined;

  return (
    <main className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-2xl px-6 pt-40 sm:px-10 lg:pt-48">
        <Reveal>
          <p className="eyebrow mb-4 text-center text-xs uppercase text-accent-deep">Contact</p>
          <h1 className="text-balance text-center font-serif text-4xl leading-tight text-ink sm:text-5xl">
            One honest conversation to start.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <Reveal>
              <p className="font-serif text-xl text-ink">{office.city}</p>
              <p className="mt-0.5 text-xs eyebrow uppercase text-accent-deep">{office.detail}</p>
              <ul className="mt-3 space-y-1 text-sm text-ink/70">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    data-cursor-hover
                    className="transition-colors hover:text-accent-deep"
                  >
                    {contact.email}
                  </a>
                </li>
                {contact.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      data-cursor-hover
                      className="transition-colors hover:text-accent-deep"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs eyebrow uppercase text-ink transition-opacity hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
            </Reveal>
            <Reveal className="border-t border-ink/10 pt-6 text-sm text-ink/70">
              Prefer to chat now? Use the assistant in the corner of every page — it can answer most
              questions instantly and route anything else to a real person on our team.
            </Reveal>
            <Reveal>
              <OfficeMap />
            </Reveal>
          </div>

          <Reveal>
            <ContactForm initialSubject={subject} initialMessage={initialMessage} />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
