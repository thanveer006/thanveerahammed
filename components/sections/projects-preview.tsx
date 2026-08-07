import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";
import { SnapSection } from "@/components/motion/snap-section";
import { Tilt3D } from "@/components/motion/tilt-3d";

export function ProjectsPreview() {
  return (
    <SnapSection id="projects" className="border-b border-border">
      <div className="mx-auto max-w-350 px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Systems in production, not tutorials."
          description="Enterprise platforms, automation tooling, and applied-AI systems built for real organizations."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <Tilt3D>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-7"
                >
                  <div
                    className="mb-6 flex h-32 items-center justify-center rounded-lg border border-border/60 bg-secondary/50 bg-[linear-gradient(135deg,transparent_calc(50%-1px),var(--color-border)_50%,transparent_calc(50%+1px))] bg-size-[16px_16px]"
                    aria-hidden
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-balance">{project.name}</h3>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>

                  <p className="mb-5 text-sm text-muted-foreground text-pretty">{project.oneLiner}</p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <Badge key={t} variant="secondary" className="font-mono text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Link>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/projects">
              Browse all & filter by tech
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </SnapSection>
  );
}
