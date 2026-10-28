import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/queries";
import { cn } from "@/lib/utils";

/** How many projects the homepage preview shows before sending visitors to /projects. */
const PREVIEW_COUNT = 4;

/** Bento layout: card width and tint per slot (static strings so Tailwind keeps them). */
const slots = [
  { span: "md:col-span-4", tint: "bg-primary/10 hover:border-primary/50", label: "text-primary" },
  { span: "md:col-span-2", tint: "bg-highlight/15 hover:border-highlight/60", label: "text-accent" },
  { span: "md:col-span-2", tint: "bg-coral/10 hover:border-coral/50", label: "text-coral" },
  { span: "md:col-span-4", tint: "bg-indigo/10 hover:border-indigo/50", label: "text-indigo" },
];

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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {projects.map((project, i) => {
          const slot = slots[i % slots.length];
          return (
            <Reveal key={project.slug} delay={(i % 2) * 0.08} className={slot.span}>
              <Link
                href={`/projects/${project.slug}`}
                className={cn(
                  "group flex h-full min-h-60 flex-col rounded-3xl border border-border p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8",
                  slot.tint
                )}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <p className={cn("text-xs font-semibold tracking-wide uppercase", slot.label)}>
                    {project.category}
                  </p>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <h3 className="font-heading mb-3 text-2xl font-semibold text-balance">
                  {project.name}
                </h3>
                <p className="mb-6 max-w-xl text-muted-foreground text-pretty">{project.oneLiner}</p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <Badge key={t} variant="outline" className="bg-background/70 text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            </Reveal>
          );
        })}
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
