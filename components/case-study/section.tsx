import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <Reveal>
        <h2 className="font-heading mb-6 text-(length:--text-h3) font-semibold tracking-tight">
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}
