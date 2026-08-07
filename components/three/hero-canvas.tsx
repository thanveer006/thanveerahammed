"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { HeroFallback } from "@/components/three/hero-fallback";
import {
  useHasMounted,
  useIsCoarsePointer,
  useReducedMotion,
} from "@/components/motion/use-reduced-motion";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <HeroFallback className="absolute inset-0" />,
});

/**
 * Background WebGL layer for the Hero section. Skips loading `three` entirely
 * under reduced-motion or on coarse-pointer/touch devices, using the static
 * CSS fallback instead — keeps the JS chunk out of the critical path there.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const mounted = useHasMounted();
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(true);

  // Stop the WebGL render loop once the hero scrolls out of view (e.g. past it in
  // the homepage's scroll-snap flow) — otherwise it keeps rendering invisible
  // frames indefinitely, burning GPU/battery for nothing.
  React.useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Server and the pre-hydration client render both default to the WebGL branch
  // (which itself shows the loading fallback via next/dynamic) — only swap to the
  // permanent CSS fallback once mounted, so SSR and first client paint always agree.
  if (mounted && (reducedMotion || isCoarsePointer)) {
    return <HeroFallback className={className} />;
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 42%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 42%, black 100%)",
      }}
    >
      <HeroScene inView={inView} />
    </div>
  );
}
