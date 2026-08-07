"use client";

import * as React from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Single source of truth for "should heavy motion be disabled" — combines the
 * OS-level `prefers-reduced-motion` signal with framer-motion's own hook so every
 * motion primitive in this directory agrees on the same answer.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

/** Coarse pointer (touch) devices — used to disable pointer-driven 3D effects. */
export function useIsCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setIsCoarse(e.matches);
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return isCoarse;
}

/** Below this breakpoint, scroll-snap + WebGL are disabled site-wide (mobile Safari risk). */
export function useIsAboveBreakpoint(query = "(min-width: 768px)"): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches);
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/** True once mounted client-side — guards SSR/pre-hydration mismatches for motion upgrades. */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Single source of truth for whether `SnapContainer` would activate scroll-snap:
 * mounted, motion not reduced, and viewport wide enough. `SnapContainer` uses this
 * to decide its own rendering; anything outside its subtree (e.g. `Nav`, which can't
 * read `SnapActiveContext` since it isn't a descendant) uses it to predict the same
 * answer instead of re-deriving the condition and risking drift.
 */
export function useSnapWouldBeActive(): boolean {
  const mounted = useHasMounted();
  const reducedMotion = useReducedMotion();
  const isWide = useIsAboveBreakpoint("(min-width: 768px)");
  return mounted && !reducedMotion && isWide;
}
