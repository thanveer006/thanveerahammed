import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useSkills } from "@/lib/queries";

export function Skills() {
  const { data: skills } = useSkills();
  const { categories: skillCategories, highlightedIntegrations } = skills;

  return (
    <Section id="skills">
      <SectionHeading
        index="05"
        eyebrow="Skills"
        title="A stack built around"
        accent="shipping real systems."
        description="Organized by where each piece sits in a production system, not a logo wall."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category, i) => (
          <Reveal key={category.name} delay={(i % 4) * 0.06} className="bg-background">
            <div className="h-full p-7">
              <h3 className="mb-5 flex items-center gap-2.5 text-lg font-semibold">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {category.name}
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {category.skills.map((skill) => (
                  <li key={skill} className="transition-colors hover:text-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-14">
        <p className="mb-4 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Integrations shipped in production
        </p>
        <div className="flex flex-wrap gap-2">
          {highlightedIntegrations.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-sm text-foreground/85 transition-colors hover:border-accent hover:text-accent"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
