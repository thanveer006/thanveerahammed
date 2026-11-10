import * as React from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks which section is under the middle of the viewport, for a nav active-state
 * indicator.
 *
 * The nav persists across routes while the sections only exist on the homepage, and
 * those sections can be replaced after a navigation (lazy route modules, layout mode
 * switches). So instead of holding IntersectionObservers on specific nodes, which go
 * stale when a node is swapped, the elements are looked up fresh on each rAF-throttled
 * scroll/resize tick and a few settle checks after a route change.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const { pathname } = useLocation();
  // Stable dependency: callers may pass a fresh array literal.
  const key = sectionIds.join("|");

  React.useEffect(() => {
    const ids = key.split("|");
    let frame = 0;

    const compute = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          current = id;
          break;
        }
      }
      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Sections may mount (or reflow, e.g. the pinned projects track) shortly after
    // navigation; re-check while things settle.
    const timers = [0, 150, 500, 1200].map((ms) => window.setTimeout(schedule, ms));
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      timers.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, pathname]);

  return activeId;
}
