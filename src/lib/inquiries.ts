import { siteUrl, contact } from "./site";

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
        html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${text}</pre>`,
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
  tourSlug: string;
  tourTitle: string;
  rating: number;
  name: string;
  body: string;
};

// Reviews are hand-curated (checked against a real booking before
// publishing, per the copy on the review form) rather than auto-published,
// so a submission notifies the business instead of writing straight to
// the reviews data — same fallback pattern as the other inquiry types.
export async function submitReview(review: ReviewSubmission) {
  const businessEmail = process.env.BUSINESS_EMAIL || process.env.CONTACT_EMAIL || contact.email;
  const fromEmail = process.env.EMAIL_FROM || `noreply@${new URL(siteUrl).hostname}`;

  await logToAirtable({
    Name: review.name,
    Type: "Review Submission",
    "Subject / Tour": review.tourTitle,
    Message: `Rating: ${review.rating}/5\n\n${review.body}`,
    Source: "website-review-form",
    Status: "New",
    Priority: "Normal",
    "Date Received": new Date().toISOString(),
  });

  const text = [
    "New traveler review submitted",
    `Tour: ${review.tourTitle}`,
    `Rating: ${review.rating}/5`,
    `Name: ${review.name}`,
    "",
    `Review:\n${review.body}`,
    "",
    "Verify against a real booking before adding it to src/lib/reviews.ts.",
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
        subject: `New review: ${review.tourTitle} (${review.rating}/5)`,
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
