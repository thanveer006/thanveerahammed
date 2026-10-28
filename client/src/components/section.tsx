import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Standard homepage band: consistent vertical rhythm and a centered container. */
export function Section({
  id,
  children,
  className,
  tinted = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Soft background to alternate bands without borders. */
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-(--nav-height) py-20 sm:py-24", tinted && "bg-secondary/50", className)}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
