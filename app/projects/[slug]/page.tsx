import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data/projects";
import { CaseStudySection } from "@/components/case-study/section";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { CodeBlock } from "@/components/case-study/code-block";
import { GalleryPlaceholder } from "@/components/case-study/gallery-placeholder";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="border-b border-border">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3">
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Back to projects
            </Link>
          </Button>

          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-primary">
            {project.category}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{project.oneLiner}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {project.timeline}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {project.role}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-xs font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6">
        <CaseStudySection title="Overview">
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium text-foreground">Problem</p>
              <p className="text-sm text-muted-foreground text-pretty">{project.problem}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-foreground">Solution</p>
              <p className="text-sm text-muted-foreground text-pretty">{project.solution}</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <ArchitectureDiagram layers={project.architectureLayers} />
          <ul className="mt-6 space-y-3">
            {project.architectureNotes.map((note) => (
              <li key={note} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                <span className="text-pretty">{note}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Feature Breakdown">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-lg border border-border bg-card p-4 text-sm text-foreground/90 text-pretty"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Implementation Detail">
          <CodeBlock label={project.codeSnippet.label} code={project.codeSnippet.code} />
        </CaseStudySection>

        <CaseStudySection title="Challenges & Solutions">
          <div className="space-y-4">
            {project.challenges.map((c) => (
              <div key={c.challenge} className="rounded-lg border border-border bg-card p-5">
                <p className="mb-2 text-sm font-medium text-foreground">{c.challenge}</p>
                <p className="text-sm text-muted-foreground text-pretty">{c.solution}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="Results">
          <ul className="space-y-3">
            {project.results.map((result) => (
              <li key={result} className="flex gap-2 text-sm text-foreground/90">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-success" aria-hidden />
                <span className="text-pretty">{result}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Lessons Learned">
          <ul className="space-y-3">
            {project.lessons.map((lesson) => (
              <li key={lesson} className="text-sm text-muted-foreground text-pretty">
                {lesson}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Gallery">
          <GalleryPlaceholder />
          <p className="mt-3 text-xs text-muted-foreground">
            Screenshots to be added.
          </p>
        </CaseStudySection>
      </div>

      {/* More projects */}
      {otherProjects.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="mb-6 text-sm font-medium text-muted-foreground">More projects</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <p className="mb-1 font-mono text-xs text-muted-foreground">{p.category}</p>
                  <p className="font-medium">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
