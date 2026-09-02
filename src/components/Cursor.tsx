"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Not rendered at all until a real pointer position is known — a fixed
  // element with a resting transform of translate(-50%, -50%) at (0,0)
  // spans from -17px to 17px, which is enough to inflate the page's
  // horizontal scrollable area even while invisible (opacity doesn't
  // remove an element from layout). Easiest fix that can't regress: don't
  // put it in the DOM until it has somewhere real to be.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    document.body.classList.add("cursor-none");

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let hasMoved = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        // First real position: snap the ring straight there instead of
        // lerping in from (0,0), then mount both elements.
        hasMoved = true;
        ringX = targetX;
        ringY = targetY;
        setReady(true);
      }
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, [data-cursor-hover]")) {
        ringRef.current?.classList.add("is-active");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, [data-cursor-hover]")) {
        ringRef.current?.classList.remove("is-active");
      }
    };

    let raf: number;
    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
