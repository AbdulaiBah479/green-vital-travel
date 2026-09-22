// Real seats-remaining, sourced from the Airtable CRM (src/lib/inquiries.ts
// logs every booking there) — never a fabricated "spots left" number. Only
// counts bookings staff have actually marked Status = Confirmed in Airtable,
// since an unconfirmed inquiry hasn't actually claimed a seat yet.

export type SpotsLeftByDate = Record<string, number>;

function escapeForFormula(value: string): string {
  return value.replace(/"/g, '\\"');
}

// Returns confirmed travelers booked per departure date for a tour. Returns
// an empty object (not an error) when Airtable isn't configured, so callers
// can treat "no data" and "not configured" the same way: show nothing rather
// than guess.
export async function confirmedTravelersByDate(tourSlug: string): Promise<SpotsLeftByDate> {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return {};
  }

  const formula = `AND({Tour Slug} = "${escapeForFormula(tourSlug)}", {Status} = "Confirmed")`;
  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Inquiries%20%26%20Bookings`
  );
  url.searchParams.set("filterByFormula", formula);
  url.searchParams.append("fields[]", "Departure Date");
  url.searchParams.append("fields[]", "Travelers");

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
      // Airtable's own rate limit is 5 req/sec per base — this cache means
      // every tour page view in a 2-minute window shares one Airtable call
      // instead of one each.
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      console.error("Airtable availability fetch failed:", await response.text());
      return {};
    }

    const data = (await response.json()) as {
      records?: { fields: { "Departure Date"?: string; Travelers?: number } }[];
    };

    const byDate: SpotsLeftByDate = {};
    for (const record of data.records ?? []) {
      const date = record.fields["Departure Date"];
      const travelers = Number(record.fields.Travelers) || 0;
      if (!date) continue;
      byDate[date] = (byDate[date] ?? 0) + travelers;
    }
    return byDate;
  } catch (error) {
    console.error("Airtable availability fetch threw:", error);
    return {};
  }
}

// Clamped to 0 — never negative, even if confirmed bookings ever exceed the
// listed group size (e.g. the cap was lowered after bookings were taken).
export function spotsLeft(groupSizeMax: number, confirmedTravelers: number): number {
  return Math.max(0, groupSizeMax - confirmedTravelers);
}
