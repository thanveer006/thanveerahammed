import type { ReactNode } from "react";

export function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <h2 className="mb-6 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
