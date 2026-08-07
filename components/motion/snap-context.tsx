"use client";

import * as React from "react";

/** Whether the nearest ancestor `SnapContainer` is actively running scroll-snap. */
export const SnapActiveContext = React.createContext(false);

export function useSnapActive(): boolean {
  return React.useContext(SnapActiveContext);
}

/**
 * The nearest ancestor `SnapContainer`'s scrollable element — null when there is
 * none, or when it isn't currently the active scroller. `ParallaxLayer` needs this
 * to track scroll progress against the right element: when `SnapContainer` is
 * active, it (not `window`) is what's actually scrolling.
 */
export const SnapContainerRefContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(
  null,
);

export function useSnapContainerRef(): React.RefObject<HTMLDivElement | null> | null {
  return React.useContext(SnapContainerRefContext);
}
