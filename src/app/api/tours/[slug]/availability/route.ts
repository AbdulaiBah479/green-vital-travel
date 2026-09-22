import { NextResponse } from "next/server";
import { getTour } from "@/lib/tours";
import { confirmedTravelersByDate, spotsLeft } from "@/lib/availability";
import { clientKey, rateLimit } from "@/lib/rateLimit";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!rateLimit(`availability:${clientKey(request)}`, 30, 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const configured = Boolean(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID);
  const confirmed = await confirmedTravelersByDate(slug);

  const spotsLeftByDate = Object.fromEntries(
    Object.entries(confirmed).map(([date, travelers]) => [date, spotsLeft(tour.groupSizeMax, travelers)])
  );

  return NextResponse.json({ configured, groupSizeMax: tour.groupSizeMax, spotsLeftByDate });
}
