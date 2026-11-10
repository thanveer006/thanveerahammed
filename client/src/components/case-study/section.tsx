import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function CaseStudySection({
  title,
  index,
  children,
}: {
  title: string;
  /** Two-digit step number shown in the margin, e.g. "01". */
  index?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-border py-14 first:border-t-0 md:grid-cols-[10rem_1fr] md:gap-10">
      <Reveal>
        <h2 className="flex items-baseline gap-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase md:sticky md:top-28 md:flex-col md:gap-2">
          {index ? <span className="text-muted-foreground tabular-nums">{index}</span> : null}
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.05} className="min-w-0">
        {children}
      </Reveal>
    </section>
  );
}
