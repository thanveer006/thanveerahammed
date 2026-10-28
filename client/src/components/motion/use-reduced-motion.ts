import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Single source of truth for "should heavy motion be disabled" — combines the
 * OS-level `prefers-reduced-motion` signal with framer-motion's own hook so every
 * motion primitive in this directory agrees on the same answer.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
