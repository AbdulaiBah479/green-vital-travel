import { siteUrl, contact } from "./site";
import { createReviewToken, reviewId } from "./siteReviews";

// Best-effort CRM logging to Airtable. Never blocks or fails the caller —
// the email notification below is the channel that must work; this is a
// bonus running record of every lead, so a hiccup here should never stop a
// contact/booking/review submission from reaching the business.
async function logToAirtable(fields: Record<string, unknown>) {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) return;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Inquiries%20%26%20Bookings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      }
    );

    if (!response.ok) {
      console.error("Airtable save failed:", await response.text());
    }
  } catch (error) {
    console.error("Airtable save threw:", error);
  }
}

// Visitor-supplied text is embedded in an HTML email body, so it must be
// escaped — otherwise a form submission could inject markup (phishing links,
// tracking pixels) into the message the business owner opens.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type ContactInquiry = {
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
};

export type BookingInquiry = {
  tourSlug: string;
  tourTitle: string;
  departureDate: string;
  travelers: number;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  addOns: {
    insurance: boolean;
    transfer: boolean;
    roomUpgrade: boolean;
  };
  total: number;
  notes?: string;
  source?: string;
};

export async function submitInquiry(kind: "contact" | "booking", payload: ContactInquiry | BookingInquiry) {
  const submissionTime = new Date().toISOString();
  const businessEmail = process.env.BUSINESS_EMAIL || process.env.CONTACT_EMAIL || contact.email;
  const fromEmail = process.env.EMAIL_FROM || `noreply@${new URL(siteUrl).hostname}`;

  const reference =
    kind === "booking"
      ? `MR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      : undefined;

  const text =
    kind === "contact"
      ? [
          "New website contact inquiry",
          `Name: ${(payload as ContactInquiry).name}`,
          `Email: ${(payload as ContactInquiry).email}`,
          `Subject: ${(payload as ContactInquiry).subject}`,
          "",
          `Message:\n${(payload as ContactInquiry).message}`,
        ].join("\n")
      : [
          "New booking inquiry",
          `Reference: ${reference}`,
          `Tour: ${(payload as BookingInquiry).tourTitle}`,
          `Slug: ${(payload as BookingInquiry).tourSlug}`,
          `Departure: ${(payload as BookingInquiry).departureDate}`,
          `Travelers: ${(payload as BookingInquiry).travelers}`,
          `Lead traveler: ${(payload as BookingInquiry).leadName}`,
          `Email: ${(payload as BookingInquiry).leadEmail}`,
          `Phone: ${(payload as BookingInquiry).leadPhone || "Not provided"}`,
          `Insurance: ${(payload as BookingInquiry).addOns.insurance ? "Yes" : "No"}`,
          `Airport transfer: ${(payload as BookingInquiry).addOns.transfer ? "Yes" : "No"}`,
          `Cabin upgrade: ${(payload as BookingInquiry).addOns.roomUpgrade ? "Yes" : "No"}`,
          `Estimated total: ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format((payload as BookingInquiry).total)}`,
          "",
          `Notes:\n${(payload as BookingInquiry).notes || "None"}`,
        ].join("\n");

  const subject =
    kind === "contact"
      ? `New website inquiry: ${(payload as ContactInquiry).subject}`
      : `New reservation request: ${(payload as BookingInquiry).tourTitle}`;

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const table = kind === "contact" ? "contact_inquiries" : "booking_inquiries";
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        ...payload,
        created_at: submissionTime,
        source: (payload as { source?: string }).source ?? "website",
        reference,
      }),
    });

    if (!response.ok) {
      console.error(`Supabase save failed for ${kind}:`, await response.text());
    }
  }

  if (kind === "contact") {
    const contactPayload = payload as ContactInquiry;
    await logToAirtable({
      Name: contactPayload.name,
      Email: contactPayload.email,
      Type: "Contact Inquiry",
      "Subject / Tour": contactPayload.subject,
      Message: contactPayload.message,
      Source: contactPayload.source ?? "website",
      Status: "New",
      Priority: "Normal",
      "Date Received": submissionTime,
    });
  } else {
    const bookingPayload = payload as BookingInquiry;
    await logToAirtable({
      Name: bookingPayload.leadName,
      Email: bookingPayload.leadEmail,
      ...(bookingPayload.leadPhone ? { Phone: bookingPayload.leadPhone } : {}),
      Type: "Booking Request",
      "Subject / Tour": bookingPayload.tourTitle,
      "Tour Slug": bookingPayload.tourSlug,
      "Departure Date": bookingPayload.departureDate,
      Travelers: bookingPayload.travelers,
      "Add-ons": [
        ...(bookingPayload.addOns.insurance ? ["Insurance"] : []),
        ...(bookingPayload.addOns.transfer ? ["Airport Transfer"] : []),
        ...(bookingPayload.addOns.roomUpgrade ? ["Cabin Upgrade"] : []),
      ],
      "Estimated Total": bookingPayload.total,
      Message: bookingPayload.notes,
      Reference: reference,
      Source: bookingPayload.source ?? "website",
      Status: "New",
      Priority: "Normal",
      "Date Received": submissionTime,
    });
  }

  if (process.env.RESEND_API_KEY) {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Green Vital <${fromEmail}>`,
        to: [businessEmail],
        subject,
        text,
        html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${escapeHtml(text)}</pre>`,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error(`Resend send failed for ${kind}:`, errorText);
      throw new Error("Unable to send your message right now. Please email us directly.");
    }
  }

  if (!process.env.RESEND_API_KEY && !process.env.SUPABASE_URL) {
    console.info(`[${kind}-inquiry] ${subject}\n${text}`);
  }

  return { reference, ok: true };
}

export async function subscribeNewsletter(email: string) {
  const submissionTime = new Date().toISOString();

  await logToAirtable({
    Name: email,
    Email: email,
    Type: "Newsletter Signup",
    Source: "website-newsletter",
    Status: "New",
    Priority: "Low",
    "Date Received": submissionTime,
  });

  // Preferred path: add the address to a real Resend audience, so it's an
  // actual mailing list, not just a one-off notification.
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    const response = await fetch(
      `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend audience signup failed:", errorText);
      throw new Error("Unable to subscribe right now. Please try again shortly.");
    }

    return { ok: true };
  }

  // No audience configured yet — at least save the lead somewhere so it
  // isn't lost, the same fallback pattern as contact/booking inquiries.
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email, created_at: submissionTime, source: "website-newsletter" }),
    });

    if (!response.ok) {
      console.error("Supabase newsletter save failed:", await response.text());
    }
    return { ok: true };
  }

  if (process.env.RESEND_API_KEY) {
    const businessEmail = process.env.BUSINESS_EMAIL || process.env.CONTACT_EMAIL || contact.email;
    const fromEmail = process.env.EMAIL_FROM || `noreply@${new URL(siteUrl).hostname}`;
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Green Vital <${fromEmail}>`,
        to: [businessEmail],
        subject: "New newsletter signup",
        text: `New newsletter signup: ${email}\n\nNo RESEND_AUDIENCE_ID is configured yet, so this wasn't added to a mailing list automatically — add it manually or set RESEND_AUDIENCE_ID.`,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend newsletter notification failed:", await emailResponse.text());
      throw new Error("Unable to subscribe right now. Please try again shortly.");
    }
    return { ok: true };
  }

  console.info(`[newsletter-signup] ${email}`);
  return { ok: true };
}

export type ReviewSubmission = {
  name: string;
  rating: number;
  body: string;
  service?: string;
};

// Website reviews are never shown automatically. A submission is emailed to
// the business with a signed link; opening it and confirming publishes the
// review (see /api/review/approve). Without REVIEW_SECRET the email still
// arrives, just without the publish link.
export async function submitReview(review: ReviewSubmission) {
  const businessEmail = process.env.BUSINESS_EMAIL || process.env.CONTACT_EMAIL || contact.email;
  const fromEmail = process.env.EMAIL_FROM || `noreply@${new URL(siteUrl).hostname}`;
  const serviceLabel = review.service || "Not given";

  await logToAirtable({
    Name: review.name,
    Type: "Review Submission",
    "Subject / Tour": serviceLabel,
    Message: `Rating: ${review.rating}/5\n\n${review.body}`,
    Source: "website-review-form",
    Status: "New",
    Priority: "Normal",
    "Date Received": new Date().toISOString(),
  });

  const secret = process.env.REVIEW_SECRET;
  let publishLine = "To publish it, add it to content/site-reviews.json (set REVIEW_SECRET to get a one-tap link here).";
  if (secret) {
    const isoDate = new Date().toISOString();
    const token = createReviewToken(
      {
        id: reviewId(review.name, review.body, isoDate),
        name: review.name,
        rating: review.rating as 1 | 2 | 3 | 4 | 5,
        body: review.body,
        service: review.service,
        isoDate,
      },
      secret
    );
    publishLine = `Publish it (link works for 30 days):\n${siteUrl}/api/review/approve?t=${token}`;
  }

  const text = [
    "New review submitted on the website",
    `Used us for: ${serviceLabel}`,
    `Rating: ${review.rating}/5`,
    `Name: ${review.name}`,
    "",
    `Review:\n${review.body}`,
    "",
    "Check it is from a real customer, then publish it or ignore this email.",
    publishLine,
  ].join("\n");

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/pending_reviews`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...review, created_at: new Date().toISOString(), source: "website-review-form" }),
    });
    if (!response.ok) {
      console.error("Supabase review save failed:", await response.text());
    }
  }

  if (process.env.RESEND_API_KEY) {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Green Vital <${fromEmail}>`,
        to: [businessEmail],
        subject: `New website review (${review.rating}/5) from ${review.name}`,
        text,
      }),
    });
    if (!emailResponse.ok) {
      console.error("Resend review notification failed:", await emailResponse.text());
      throw new Error("Unable to submit your review right now. Please try again shortly.");
    }
    return { ok: true };
  }

  if (!process.env.RESEND_API_KEY && !process.env.SUPABASE_URL) {
    console.info(`[review-submission] ${text}`);
  }

  return { ok: true };
}
