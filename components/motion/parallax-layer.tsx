"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHasMounted, useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useSnapContainerRef } from "@/components/motion/snap-context";

/**
 * Depth/parallax wrapper scoped to its own section's scroll progress (not a global
 * timeline), so it composes cleanly regardless of whether scroll-snap is active.
 */
export function ParallaxLayer({
  children,
  className,
  yRange = [40, -40],
  opacityRange,
  scaleRange,
}: {
  children: React.ReactNode;
  className?: string;
  /** [start, end] pixel translateY applied as the section crosses the viewport. */
  yRange?: [number, number];
  opacityRange?: [number, number];
  scaleRange?: [number, number];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mounted = useHasMounted();
  const reducedMotion = useReducedMotion();
  // When SnapContainer is the active scroller, window scroll is frozen — track
  // progress against its scrollable element instead, or `useScroll` never moves.
  const snapContainerRef = useSnapContainerRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: snapContainerRef ?? undefined,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [
    opacityRange?.[0] ?? 1,
    1,
    opacityRange?.[1] ?? 1,
  ]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange ?? [1, 1]);

  // Gate on `mounted` so SSR and the pre-hydration client render agree.
  if (mounted && reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, opacity, scale }}>
      {children}
    </motion.div>
  );
}
