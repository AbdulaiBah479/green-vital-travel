export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://greenvitaltravel.com" : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Green Vital";

export const siteFullName = "Green Vital Travel and Tour Agency Limited";

export const siteTitle = "Green Vital | Travel with confidence";

export const siteDescription =
  "Green Vital offers air ticketing, car rentals, visa assistance, hotel bookings, tours, and travel insurance across Sierra Leone and West Africa.";

export const siteKeywords = [
  "Green Vital",
  "travel agency Sierra Leone",
  "air ticketing Freetown",
  "visa assistance Sierra Leone",
  "hotel bookings West Africa",
  "holiday packages",
  "car rentals Freetown",
];

export const companyRegistration = {
  // Only "IB" initials and the National Investment Board mention survived
  // in old page copy — no registration number or exact founding year was
  // ever recorded in this codebase. Replace with the real figures.
  registrationNumber: "N/A",
  tin: "N/A",
  incorporatedDate: "Founded 2026",
  jurisdiction: "Sierra Leone",
  entityType: "Travel agency",
};

export const founder = {
  // Only the initials "IB" survived from the old designers-page bio —
  // the full name was never recorded anywhere recoverable. Replace with
  // the real founder's name.
  name: "I. B.",
  title: "Founder & Director",
};

export const contact = {
  // Real business email, confirmed by the site owner. Phone/WhatsApp
  // numbers were never recorded anywhere recoverable in this codebase —
  // these are still placeholders and must be replaced with the real
  // numbers before going live.
  email: "greenvitaltravelandtouragencyl@gmail.com",
  phones: ["+232 00 000 0000"],
  whatsapp: "23200000000",
  address: {
    street: "57 Main Motor Road, Congo Cross",
    city: "Freetown",
    country: "Sierra Leone",
  },
};
