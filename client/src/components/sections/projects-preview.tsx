import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/queries";

/** How many projects the homepage preview shows before sending visitors to /projects. */
const PREVIEW_COUNT = 4;

export function ProjectsPreview() {
  const { data: allProjects } = useProjects();
  const projects = allProjects.slice(0, PREVIEW_COUNT);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Systems in production, not tutorials."
        description="Enterprise platforms, automation tooling, and applied-AI systems built for real organizations."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-7"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-1.5 text-xs font-medium text-primary">{project.category}</p>
                  <h3 className="text-lg font-semibold text-balance">{project.name}</h3>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>

              <p className="mb-6 text-sm text-muted-foreground text-pretty">{project.oneLiner}</p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">
            Browse all projects
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
