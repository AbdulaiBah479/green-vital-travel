// Editable from the admin panel (content/settings/index.json) so the site
// owner can update contact details without touching code.
import settings from "../../content/settings/index.json";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://gtravelsandtours.com" : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Green Vital";

export const siteFullName = "Green Vital Travel and Tour Agency Limited";

// The name exactly as it appears on the certificate of incorporation (one word, "Greenvital").
export const legalName = "Greenvital Travel and Tour Agency Limited";

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
  incorporatedDate: "20 July 2026",
  jurisdiction: "Sierra Leone",
  entityType: "Private Company Limited by Liability",
};

// Public opening hours. Kept in one place so the visible text and the
// structured data Google reads can't drift apart.
export const businessHours = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  opens: "09:00",
  closes: "18:00",
  label: "Monday to Friday, 9:00 to 18:00",
};

// The business's Google Search / Maps knowledge-panel entry.
export const googleBusinessUrl = "https://www.google.com/search?kgmid=%2Fg%2F11nw2fzdgz";

// Opens Google's "write a review" box for the business — shared with customers
// and linked from the Reviews page and footer.
export const googleReviewUrl = "https://g.page/r/CXXFXqzi85e4EBM/review";

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

// Licences and registrations, as shown on the original certificates. Shown on the About page so visitors and partners can check them.
export const licences = [
  {
    authority: "National Investment Board",
    document: "Certificate of Incorporation and Registration",
    reference: "SL200726GREEN31171",
    validity: "Incorporated 20 July 2026",
  },
  {
    authority: "Sierra Leone Civil Aviation Authority",
    document: "Air Ticketing Certificate (Air Ticketing Agent)",
    reference: "ECR/26/SLCAA/093",
    validity: "18 September 2026 to 17 September 2027",
  },
  {
    authority: "National Tourist Board of Sierra Leone",
    document: "Class 2 Travel Agency licences (manager and proprietor)",
    reference: "NTB-TA-200",
    validity: "Until 31 July 2027",
  },
  {
    authority: "National Tourist Board of Sierra Leone",
    document: "Class 2 Handling Agency licences (manager and proprietor)",
    reference: "NTB-TH-199 and NTB-TH-099",
    validity: "Until 31 July 2027",
  },
  {
    authority: "Freetown City Council",
    document: "Business licence",
    reference: "FCC/S25/008753",
    validity: "January to December 2026",
  },
  {
    authority: "NASSIT",
    document: "Registration of establishment",
    reference: "W01J2026393",
    validity: "Registered 20 July 2026",
  },
] as const;
