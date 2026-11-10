import { useSyncExternalStore } from "react";

/**
 * SSR/SSG-safe media query. The server (and the hydration pass) always reports
 * `false`, so prerendered HTML is the mobile-first layout; the real value is
 * picked up right after hydration.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
