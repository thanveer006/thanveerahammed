import * as React from "react";
import { cn } from "@/lib/utils";
import { HeroFallback } from "@/components/three/hero-fallback";
import {
  useHasMounted,
  useIsCoarsePointer,
  useReducedMotion,
} from "@/components/motion/use-reduced-motion";

const HeroScene = React.lazy(() => import("@/components/three/hero-scene"));

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

  // Stop the WebGL render loop once the hero scrolls out of view — otherwise it
  // keeps rendering invisible frames, burning GPU/battery for nothing.
  React.useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Until mounted, render only the static fallback so the prerendered HTML never
  // references `three` / `window`. Swap in WebGL once we know the environment.
  if (!mounted) {
    return <HeroFallback className={className} />;
  }

  if (reducedMotion || isCoarsePointer) {
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
      <React.Suspense fallback={<HeroFallback className="absolute inset-0" />}>
        <HeroScene inView={inView} />
      </React.Suspense>
    </div>
  );
}
