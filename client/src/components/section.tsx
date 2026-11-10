import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  base: "",
  tinted: "bg-card/50 border-y border-border",
  ink: "bg-ink text-ink-foreground",
} as const;

/** Standard homepage band: consistent vertical rhythm and a centered container. */
export function Section({
  id,
  children,
  className,
  tone = "base",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background treatment; `ink` is a dark band in both themes. */
  tone?: keyof typeof tones;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-(--nav-height) py-24 sm:py-32", tones[tone], className)}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
