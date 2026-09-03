export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://greenvitaltravel.com" : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Greenvital";

export const siteFullName = "Greenvital Travel and Tour Agency Limited";

export const siteTitle = "Greenvital | Travel with confidence";

export const siteDescription =
  "Greenvital offers air ticketing, car rentals, visa assistance, hotel bookings, tours, and travel insurance across Sierra Leone and West Africa.";

export const siteKeywords = [
  "Greenvital",
  "travel agency Sierra Leone",
  "air ticketing Freetown",
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
  // Real business email, confirmed by the site owner. Phones are the two
  // mobile numbers listed on the actual NIB business registration form.
  email: "greenvitaltravelandtouragencyl@gmail.com",
  phones: ["+232 78 411227", "+232 78 598481"],
  whatsapp: "23278411227",
  address: {
    street: "57 Main Motor Road, Congo Cross",
    city: "Freetown",
    country: "Sierra Leone",
  },
};
