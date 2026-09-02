import Link from "next/link";
import { tours } from "@/lib/tours";

export default function DealsBand() {
  const dealCount = tours.filter((t) => !!t.deal).length;
  if (dealCount === 0) return null;

  const topDeal = [...tours]
    .filter((t) => !!t.deal)
    .sort((a, b) => (b.deal?.percentOff ?? 0) - (a.deal?.percentOff ?? 0))[0];

  return (
    <Link
      href="/deals"
      data-cursor-hover
      className="group flex flex-col items-center justify-center gap-2 bg-accent-2 px-6 py-5 text-center text-ink transition-colors hover:brightness-95 sm:flex-row sm:gap-4"
    >
      <span className="text-xs eyebrow uppercase">
        {dealCount} Active Offer{dealCount === 1 ? "" : "s"}
      </span>
      <span className="hidden text-ink/70 sm:inline">·</span>
      <span className="text-sm">
        Up to {topDeal?.deal?.percentOff}% off {topDeal?.title.split(":")[0]} and more
      </span>
      <span className="text-xs eyebrow uppercase underline underline-offset-4 transition-transform group-hover:translate-x-0.5">
        View Deals →
      </span>
    </Link>
  );
}
