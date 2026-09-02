import { siteUrl, contact } from "./site";

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
