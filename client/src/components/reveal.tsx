import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Scroll-triggered entrance. Once-only so it never re-hides content on scroll back. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
