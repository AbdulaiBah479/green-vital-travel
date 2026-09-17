"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // A spring rather than the raw motion value: it pulls toward the target
  // instead of snapping straight to it, so the pull-in and (especially)
  // the release-back-to-center both feel physical rather than mechanical.
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
