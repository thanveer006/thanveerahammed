import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've built."
          description="Roles focused on shipping and owning production systems, not just contributing to them."
        />

        <div className="relative space-y-8 sm:pl-10">
          <div className="absolute top-2 bottom-2 left-4 hidden w-px bg-border sm:block" aria-hidden />
          {experience.map((entry, i) => (
            <Reveal key={entry.role + entry.company} delay={i * 0.08} className="relative">
              <span
                className="absolute -left-10 top-7 hidden size-2.5 rounded-full border-2 border-background bg-primary sm:block"
                aria-hidden
              />
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{entry.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.company} &middot; {entry.type}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {entry.start} &ndash; {entry.end}
                  </span>
                </div>

                <p className="mb-5 text-sm text-foreground/90 text-pretty">{entry.impact}</p>

                <ul className="mb-5 space-y-2">
                  {entry.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                      <span className="text-pretty">{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {entry.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
