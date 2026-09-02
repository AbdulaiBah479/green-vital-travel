"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/destinations";
import WishlistButton from "./WishlistButton";

export default function DestinationCard({ destination: d }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      data-cursor-hover
      className="card-lift group relative block overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-ink/20"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={d.heroImg}
          alt={d.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      </div>
      <WishlistButton slug={`destination:${d.slug}`} className="absolute right-4 top-4" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs eyebrow uppercase text-accent-soft">
          {d.country} · {d.region}
        </p>
        <h3 className="mt-1 font-serif text-xl text-paper">{d.name}</h3>
        <p className="mt-1 text-sm text-paper/75">{d.hook}</p>
      </div>
    </Link>
  );
}
