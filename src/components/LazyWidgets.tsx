"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The chat assistant and the toast notifications aren't needed to paint or use
// the page, but together they add about 70 KB of JavaScript to every first
// load. Loading them once the browser is idle keeps that weight off the
// critical path (the page's Largest Contentful Paint) on slow phones.
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });
const SiteToaster = dynamic(() => import("./SiteToaster"), { ssr: false });

export default function LazyWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    // Safari does not support requestIdleCallback, so fall back to a timer.
    const idle = window as unknown as {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (idle.requestIdleCallback && idle.cancelIdleCallback) {
      const id = idle.requestIdleCallback(start, { timeout: 2500 });
      return () => idle.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(start, 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <>
      <Chatbot />
      <SiteToaster />
    </>
  );
}
