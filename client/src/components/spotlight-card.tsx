import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Writes pointer coordinates to CSS vars; the `.spotlight` rule paints the glow. */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function SpotlightCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      onPointerMove={trackPointer}
      className={cn("spotlight rounded-3xl border border-border bg-card", className)}
      {...props}
    />
  );
}
