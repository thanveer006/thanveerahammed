import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { skillCategories, highlightedIntegrations } from "@/lib/data/skills";
import { SnapSection } from "@/components/motion/snap-section";
import { ParallaxLayer } from "@/components/motion/parallax-layer";

export function Skills() {
  return (
    <SnapSection id="skills" className="border-b border-border">
      <div className="mx-auto max-w-350 px-6">
        <SectionHeading
          eyebrow="Skills"
          title="A stack built around shipping real systems."
          description="Organized by where each piece sits in a production system, not a logo wall."
        />

        <ParallaxLayer
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          yRange={[24, -24]}
        >
          {skillCategories.map((category, i) => (
            <Reveal key={category.name} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {category.name}
                </h3>
                <ul className="space-y-2 text-sm">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ParallaxLayer>

        <Reveal delay={0.2} className="mt-10">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Integrations shipped in production
          </p>
          <div className="flex flex-wrap gap-2">
            {highlightedIntegrations.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="rounded-full border-border px-3 py-1 font-mono text-xs font-normal transition-colors hover:border-primary/50 hover:text-primary"
              >
                {item}
              </Badge>
            ))}
          </div>
        </Reveal>
      </div>
    </SnapSection>
  );
}
