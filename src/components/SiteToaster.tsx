"use client";

import { Toaster } from "sonner";

// The site's toast notifications. Split into its own file so it can be loaded
// after the page is interactive (see LazyWidgets) instead of in the first
// JavaScript download.
export default function SiteToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 rounded-full border border-ink/10 bg-ink px-5 py-3 text-xs eyebrow uppercase text-paper shadow-xl",
        },
      }}
    />
  );
}
