import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  // Start at the final value so prerendered HTML and no-JS users see real numbers.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
