"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div id="main-content" key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
