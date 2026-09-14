// Editable from the admin panel (content/settings/index.json) so the site
// owner can update contact details without touching code.
import settings from "../../content/settings/index.json";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://gtravelsandtours.com" : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Greenvital";

export const siteFullName = "Greenvital Travel and Tour Agency Limited";

export const siteTitle = "Greenvital | Discover the world";

export const siteDescription =
  "Greenvital offers air and boat ticketing, car rentals, visa assistance, hotel bookings, tours, and travel insurance across Sierra Leone and West Africa.";

export const siteKeywords = [
  "Greenvital",
  "travel agency Sierra Leone",
  "air ticketing Freetown",
  "boat ticketing Sierra Leone",
  "visa assistance Sierra Leone",
  "hotel bookings West Africa",
  "holiday packages",
  "car rentals Freetown",
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
  whatsapp: settings.whatsapp,
  address: {
    street: "57 Main Motor Road, Congo Cross",
    city: "Freetown",
    country: "Sierra Leone",
  },
};

// Handle normalized from the name given for these accounts ("G~travel and
// tours") into the alphanumeric-only format every one of these platforms
// requires — none allow the tilde or the spaces in the original. Confirm
// each of these actually matches the registered account before relying on
// them; a name and a live handle aren't guaranteed to be the same string.
const socialHandle = "gtravelandtours";

export const social = {
  facebook: `https://www.facebook.com/${socialHandle}`,
  instagram: `https://www.instagram.com/${socialHandle}`,
  twitter: `https://x.com/${socialHandle}`,
  tiktok: `https://www.tiktok.com/@${socialHandle}`,
  linkedin: `https://www.linkedin.com/company/${socialHandle}`,
};
