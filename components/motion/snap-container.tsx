"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SnapActiveContext, SnapContainerRefContext } from "@/components/motion/snap-context";
import { useSnapWouldBeActive } from "@/components/motion/use-reduced-motion";

/**
 * Scroll-snap wrapper for the homepage. Server-renders (and pre-hydration client-renders)
 * as plain document flow, then upgrades to a snapping scroll region only once mounted,
 * motion isn't reduced, and the viewport is wide enough — so mobile / reduced-motion /
 * no-JS visitors always get a normal, safe scrolling page.
 */
export function SnapContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  const snapActive = useSnapWouldBeActive();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <SnapActiveContext.Provider value={snapActive}>
      <SnapContainerRefContext.Provider value={snapActive ? ref : null}>
        <div
          ref={ref}
          // Focusable so keyboard users can Tab into the scroll region and then
          // use Space/Page Down/arrow keys to scroll it natively — without this,
          // those keys target the near-static outer document instead, since the
          // container is a nested `overflow-y-scroll` element outside the normal
          // scroll path until something inside it happens to receive focus.
          tabIndex={snapActive ? 0 : undefined}
          aria-label={snapActive ? "Page sections" : undefined}
          className={cn(
            snapActive &&
              "h-[calc(100svh-var(--nav-height))] snap-y snap-proximity overflow-y-scroll scroll-smooth focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2",
            className,
          )}
        >
          {children}
        </div>
      </SnapContainerRefContext.Provider>
    </SnapActiveContext.Provider>
  );
}
