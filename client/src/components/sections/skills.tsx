import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useSkills } from "@/lib/queries";

export function Skills() {
  const { data: skills } = useSkills();
  const { categories: skillCategories, highlightedIntegrations } = skills;

  return (
    <Section id="skills" tone="ink">
      <SectionHeading
        onDark
        eyebrow="Skills"
        title="A stack built around shipping real systems."
        description="Organized by where each piece sits in a production system, not a logo wall."
      />

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category, i) => (
          <Reveal key={category.name} delay={(i % 4) * 0.06}>
            <div className="h-full border-t-2 border-brand-light/70 pt-4">
              <h3 className="mb-4 font-heading text-lg font-semibold">{category.name}</h3>
              <ul className="space-y-2 text-sm text-ink-foreground/70">
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-14 border-t border-white/10 pt-8">
        <p className="mb-4 text-sm font-medium text-ink-foreground/60">
          Integrations shipped in production
        </p>
        <div className="flex flex-wrap gap-2">
          {highlightedIntegrations.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-ink-foreground/85 transition-colors hover:border-highlight/70 hover:text-highlight"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
