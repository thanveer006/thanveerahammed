"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  useHasMounted,
  useIsCoarsePointer,
  useReducedMotion,
} from "@/components/motion/use-reduced-motion";

const MAX_TILT_DEG = 8;

/**
 * CSS 3D tilt wrapper: pointer-driven rotateX/rotateY, clamped to a subtle angle.
 * Disabled (renders a plain div) under reduced-motion or on touch/coarse-pointer devices,
 * where hover-based tilt doesn't make sense anyway.
 */
export function Tilt3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mounted = useHasMounted();
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  // Gate on `mounted` so SSR and the pre-hydration client render agree (both default
  // to the tilt-enabled branch) — only swap to the plain div once mounted.
  const disabled = mounted && (reducedMotion || isCoarsePointer);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 200, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [MAX_TILT_DEG, -MAX_TILT_DEG]);
  const rotateY = useTransform(springX, [0, 1], [-MAX_TILT_DEG, MAX_TILT_DEG]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn("[perspective:var(--perspective-hero)]", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}
