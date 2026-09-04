"use client";

import { toast } from "sonner";
import { useWishlist } from "@/lib/WishlistContext";

export default function WishlistButton({
  slug,
  label,
  className = "",
}: {
  slug: string;
  label?: string;
  className?: string;
}) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        toast(saved ? "Removed from wishlist" : `Saved${label ? ` ${label}` : ""} to wishlist`);
      }}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
        saved ? "bg-accent-2 text-ink" : "bg-ink/40 text-paper hover:bg-ink/60"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M12 21s-7-4.6-9.5-9C.6 8.4 2 4.8 5.4 4.1 7.6 3.6 9.9 4.6 12 7c2.1-2.4 4.4-3.4 6.6-2.9C22 4.8 23.4 8.4 21.5 12 19 16.4 12 21 12 21Z" />
      </svg>
    </button>
  );
}
