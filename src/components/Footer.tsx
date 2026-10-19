import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import SocialLinks from "./SocialLinks";
import { contact, companyRegistration, siteFullName, businessHours } from "@/lib/site";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Tour Packages", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Journal", href: "/journal" },
  { label: "Trip Planner", href: "/planner" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Air Tickets Freetown", href: "/services/air-tickets-freetown" },
  { label: "Lungi Ferry & Boat Tickets", href: "/services/lungi-ferry-and-boat-tickets" },
  { label: "Visa Assistance", href: "/services/visa-assistance-sierra-leone" },
  { label: "Hotel Bookings", href: "/services/hotel-booking-sierra-leone" },
  { label: "Car Rental Freetown", href: "/services/car-rental-freetown" },
  { label: "Airport Transfers", href: "/services/airport-transfers-freetown" },
  { label: "Travel Insurance", href: "/insurance" },
];

const supportLinks = [
  { label: "FAQ", href: "/#faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Travel Requirements", href: "/travel-requirements" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Rewards", href: "/rewards" },
  { label: "Partners", href: "/partners" },
  { label: "Press", href: "/press" },
  { label: "Sustainability", href: "/sustainability" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

const officeAddress = `${contact.address.street}, ${contact.address.city}, ${contact.address.country}`;

const trustBadges = [
  "Freetown-Based, Personally Run",
  "Air Ticketing & Visa Support",
  "Direct Support — Call or WhatsApp",
  "Trusted Travel Assistance",
];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pt-16 pb-10 text-paper sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-ink-soft to-ink border border-paper/10 px-8 py-10 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="font-serif text-2xl leading-snug text-paper sm:text-3xl">
              Ready when you are.
            </p>
            <p className="mt-2 max-w-md text-sm text-paper/60">
              Message us on WhatsApp or start the Trip Planner — either way, a real person replies.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="btn-shine rounded-full bg-accent px-6 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft"
            >
              WhatsApp Us
            </a>
            <Link
              href="/planner"
              data-cursor-hover
              className="rounded-full border border-paper/25 px-6 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Plan a Trip
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 border-b border-paper/10 pb-16 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="inline-flex items-center rounded-2xl bg-paper px-5 py-4 shadow-sm sm:px-6 sm:py-5">
              <Image
                src="/brand-logo.png"
                alt="Green Vital"
                width={963}
                height={982}
                className="h-32 w-auto sm:h-40"
                loading="eager"
              />
            </div>
            <p className="mt-5 max-w-60 text-sm leading-relaxed text-paper/55">
              Travel solutions across Sierra Leone and the wider region — from ticketing and hotel
              bookings to visa help and holiday planning.
            </p>
            <div className="mt-6 max-w-xs">
              <p className="eyebrow mb-3 text-xs uppercase text-paper/50">Newsletter</p>
              <NewsletterForm />
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          <div>
            <p className="eyebrow mb-4 text-xs uppercase text-paper/50">Contact</p>
            <ul className="space-y-3 text-sm break-words text-paper/75">
              <li>
                <a href={`mailto:${contact.email}`} data-cursor-hover className="transition-colors hover:text-accent">
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    data-cursor-hover
                    className="transition-colors hover:text-accent"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>{officeAddress}</li>
              <li>{businessHours.label}</li>
            </ul>
            <SocialLinks className="mt-5" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-paper/10 py-8 text-[11px] uppercase tracking-wide text-paper/50">
          {trustBadges.map((b) => (
            <span key={b} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
              {b}
            </span>
          ))}
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            App — Coming Soon
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 text-xs text-paper/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteFullName}. Reg. No.{" "}
            {companyRegistration.registrationNumber}, {companyRegistration.jurisdiction}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  data-cursor-hover
                  className="transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>Crafted with care, for the way you actually travel.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-4 text-xs uppercase text-paper/50">{title}</p>
      <ul className="space-y-3 text-sm text-paper/75">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} data-cursor-hover className="transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
