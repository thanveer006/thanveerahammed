import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useExperience } from "@/lib/queries";

export function Experience() {
  const { data: experience } = useExperience();

  return (
    <Section id="experience" tone="tinted">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built."
        description="Roles focused on shipping and owning production systems, not just contributing to them."
      />

      <div className="relative">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-border md:left-[calc(13rem+5px)]"
        />
        {experience.map((entry, i) => (
          <Reveal key={entry.role + entry.company} delay={i * 0.06} className="pb-12 last:pb-0">
            <article className="relative grid grid-cols-1 gap-x-12 pl-8 md:grid-cols-[13rem_1fr] md:pl-0">
              <span
                aria-hidden
                className={`absolute top-2 left-0 size-[11px] rounded-full border-2 border-background md:left-[13rem] ${
                  i === 0 ? "bg-highlight ring-4 ring-highlight/25" : "bg-primary"
                }`}
              />
              <div className="mb-3 md:mb-0 md:pr-4 md:text-right">
                <p className="text-sm font-semibold text-primary">
                  {entry.start} &ndash; {entry.end}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.company}
                  <span className="block md:hidden">{entry.type}</span>
                </p>
                <p className="hidden text-xs text-muted-foreground md:block">{entry.type}</p>
              </div>

              <div className="md:pl-10">
                <h3 className="font-heading text-xl font-semibold">{entry.role}</h3>
                <p className="mt-2 text-sm text-foreground/90 text-pretty">{entry.impact}</p>

                <ul className="mt-4 space-y-2">
                  {entry.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span className="text-pretty">{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tech.map((t) => (
                    <Badge key={t} variant="outline" className="bg-card text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
