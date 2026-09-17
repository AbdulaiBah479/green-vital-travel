"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Same starting transforms as the CSS version this replaces, but driven by
// a spring instead of a fixed-duration cubic-bezier — a spring settles with
// a touch of natural overshoot rather than easing to a dead stop, which is
// what actually reads as "alive" rather than merely animated.
const variantOffsets: Record<"up" | "scale" | "left" | "right", { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  scale: { scale: 0.92 },
  left: { x: -36 },
  right: { x: 36 },
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "scale" | "left" | "right";
}) {
  // Respects the OS-level "reduce motion" setting exactly like the CSS
  // `prefers-reduced-motion` guard this replaces — skips straight to the
  // final, settled state instead of animating.
  const reduceMotion = useReducedMotion();
  const offset = variantOffsets[variant];

  const variants: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.6,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
