import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Scroll-scrubbed statement: words light up one by one as the paragraph crosses the
 * viewport, and dim again when scrolling back. Falls back to plain text under
 * reduced motion. The full sentence stays available to assistive tech.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={cn("flex flex-wrap gap-x-[0.28em]", className)}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={i} aria-hidden>
            <Word range={[start, end]} progress={scrollYProgress}>
              {w}
            </Word>
          </span>
        );
      })}
    </p>
  );
}
