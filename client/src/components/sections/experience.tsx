import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useExperience } from "@/lib/queries";

export function Experience() {
  const { data: experience } = useExperience();

  return (
    <Section id="experience" tinted>
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built."
        description="Roles focused on shipping and owning production systems, not just contributing to them."
      />

      <div className="space-y-5">
        {experience.map((entry, i) => (
          <Reveal key={entry.role + entry.company} delay={i * 0.08}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{entry.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.company} &middot; {entry.type}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium whitespace-nowrap text-muted-foreground">
                  {entry.start} &ndash; {entry.end}
                </span>
              </div>

              <p className="mb-5 text-sm text-foreground/90 text-pretty">{entry.impact}</p>

              <ul className="mb-5 space-y-2">
                {entry.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span className="text-pretty">{r}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {entry.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
