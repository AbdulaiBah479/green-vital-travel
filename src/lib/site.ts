// Editable from the admin panel (content/settings/index.json) so the site
// owner can update contact details without touching code.
import settings from "../../content/settings/index.json";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://gtravelsandtours.com" : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Green Vital";

export const siteFullName = "Green Vital Travel and Tour Agency Limited";

export const siteTitle = "Green Vital | Travel Agency in Freetown, Sierra Leone";

export const siteDescription =
  "Green Vital is a travel agency in Freetown, Sierra Leone: air tickets, Lungi ferry tickets, visas, hotels, car hire, tours and travel insurance.";

export const siteKeywords = [
  "Green Vital",
  "travel agency Sierra Leone",
  "travel agency Freetown",
  "air ticketing Freetown",
  "flight booking Sierra Leone",
  "boat ticketing Sierra Leone",
  "Lungi ferry tickets",
  "visa assistance Sierra Leone",
  "hotel bookings Sierra Leone",
  "tour packages Sierra Leone",
  "holiday packages",
  "car rentals Freetown",
  "airport transfers Freetown",
  "travel insurance Sierra Leone",
];

export const companyRegistration = {
  // From the real National Investment Board certificate of incorporation
  // and NRA taxpayer certificate.
  registrationNumber: "SL200726GREEN31171",
  tin: "1001814533",
  incorporatedDate: "Founded 2026",
  jurisdiction: "Sierra Leone",
  entityType: "Private Company Limited by Shares",
};

export const founder = {
  name: "Ibrahim Bah",
  title: "Founder & Director",
};

export const contact = {
  email: settings.email,
  phones: settings.phones,
  // wa.me links need bare digits (country code + number, no "+", no
  // spaces) — the admin panel doesn't enforce that format, so normalize
  // here rather than relying on whoever edits it to type it exactly
  // right. A real broken WhatsApp link on the live site (a "+" and
  // spaces made it through untouched) is what surfaced this.
  whatsapp: settings.whatsapp.replace(/\D/g, ""),
  address: {
    street: "57 Main Motor Road, Congo Cross",
    city: "Freetown",
    country: "Sierra Leone",
  },
};

// Editable from the admin panel (content/settings/index.json), each
// platform independently — LinkedIn and Instagram in particular don't
// necessarily share the same handle as the others, so these aren't
// derived from one shared string.
export const social = {
  facebook: settings.facebook,
  instagram: settings.instagram,
  twitter: settings.twitter,
  tiktok: settings.tiktok,
  linkedin: settings.linkedin,
};
