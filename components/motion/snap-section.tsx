"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSnapActive } from "@/components/motion/snap-context";

/**
 * Full-height panel used inside `SnapContainer`. Falls back to a normal padded
 * `<section>` in the document flow whenever snap-scrolling isn't active.
 */
export function SnapSection({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Full-bleed content (e.g. a background canvas) that shouldn't be flex-centered/padded. */
  bleed?: boolean;
}) {
  const snapActive = useSnapActive();

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-(--nav-height)",
        snapActive
          ? "min-h-[calc(100svh-var(--nav-height))] snap-start"
          : "py-20 sm:py-28",
        snapActive && !bleed && "flex flex-col justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
