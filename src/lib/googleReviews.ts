// Reviews copied word for word from Green Vital's public Google Business Profile, so visitors can read them here and
// check them there. Only reviews with written comments from customers are listed; reviews by the owner, staff or
// related companies are left out (Google's rules do not allow those, and showing them would mislead). Add new ones
// exactly as written on Google, newest first. No star average or count is shown on the site: those change on Google
// with every review and would quickly be wrong here.
export type GoogleReview = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Month and year as shown on Google, e.g. "October 2026". */
  month: string;
};

export const googleReviews: GoogleReview[] = [
  { name: "Rodney Kanu", rating: 5, text: "Best travel agency in Sierra Leone", month: "October 2026" },
  {
    name: "Yashwanth Jakkula",
    rating: 5,
    text: "Excellent service! Very professional, friendly, and helpful team. The entire travel process was smooth and hassle-free. Highly recommended for reliable travel services!",
    month: "October 2026",
  },
  { name: "Mariam Sheriff", rating: 5, text: "Their customer service is amazing, and I highly recommend", month: "October 2026" },
];

/** The review shown on the home page: the most detailed one. */
export const featuredGoogleReview = googleReviews.reduce<GoogleReview | undefined>(
  (best, r) => (!best || r.text.length > best.text.length ? r : best),
  undefined,
);
