import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, User } from "lucide-react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { siteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProject, useProjects } from "@/lib/queries";
import { Breadcrumbs } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CaseStudySection } from "@/components/case-study/section";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { CodeBlock } from "@/components/case-study/code-block";

export function Component() {
  const { slug = "" } = useParams();
  const { data: project, loading } = useProject(slug);
  const { data: allProjects } = useProjects();

  if (!project) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
        <Seo title="Project not found" path={`/projects/${slug}`} noIndex />
        <p className="font-mono text-sm text-accent">{loading ? "Loading…" : "404"}</p>
        {!loading && (
          <>
            <h1 className="mt-3 text-(length:--text-h3) font-semibold">Project not found.</h1>
            <Button asChild className="mt-8">
              <Link href="/projects">
                <ArrowLeft />
                Back to projects
              </Link>
            </Button>
          </>
        )}
      </div>
    );
  }

  const otherProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.oneLiner,
    creator: { "@type": "Person", name: "Thanveer Ahammed N" },
    url: `${siteUrl}/projects/${project.slug}`,
    keywords: project.tech.join(", "),
  };

  return (
    <div>
      <Seo
        title={project.name}
        description={project.oneLiner}
        path={`/projects/${project.slug}`}
        type="article"
        jsonLd={projectJsonLd}
      />

      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_at_70%_0%,black,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <Breadcrumbs
            className="mb-12"
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.name },
            ]}
          />
          <Reveal>
            <p className="mb-5 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
              {project.category}
            </p>
            <h1 className="max-w-4xl text-(length:--text-h1) leading-[1.02] font-semibold text-balance">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground text-pretty">{project.oneLiner}</p>

            <dl className="mt-10 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              <div className="flex items-center gap-3 bg-background p-4">
                <Calendar className="size-4 text-accent" aria-hidden />
                <div>
                  <dt className="font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Timeline
                  </dt>
                  <dd className="text-sm">{project.timeline}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background p-4">
                <User className="size-4 text-accent" aria-hidden />
                <div>
                  <dt className="font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Role
                  </dt>
                  <dd className="text-sm">{project.role}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <CaseStudySection index="01" title="Overview">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="mb-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">Problem</p>
              <p className="text-foreground/90 text-pretty">{project.problem}</p>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-card p-6">
              <p className="mb-2 font-mono text-xs tracking-[0.18em] text-accent uppercase">Solution</p>
              <p className="text-foreground/90 text-pretty">{project.solution}</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection index="02" title="Architecture">
          <ArchitectureDiagram layers={project.architectureLayers} />
        </CaseStudySection>

        <CaseStudySection index="03" title="Feature Breakdown">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-2xl border border-border bg-card p-5 text-sm text-foreground/90 text-pretty sm:[&:last-child:nth-child(odd)]:col-span-2"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection index="04" title="Implementation Detail">
          <CodeBlock label={project.codeSnippet.label} code={project.codeSnippet.code} />
        </CaseStudySection>

        <CaseStudySection index="05" title="Challenge & Solution">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 text-lg font-medium text-balance">{project.challenge.challenge}</p>
            <p className="text-muted-foreground text-pretty">{project.challenge.solution}</p>
          </div>
        </CaseStudySection>

        <CaseStudySection index="06" title="Results">
          <ul className="space-y-3">
            {project.results.map((result) => (
              <li key={result} className="flex gap-3 text-foreground/90">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
                <span className="text-pretty">{result}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      </div>

      {otherProjects.length > 0 && (
        <div className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-8 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              More projects
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-3xl border border-border bg-card p-7 transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div>
                    <p className="mb-2 font-mono text-xs tracking-[0.18em] text-accent uppercase">{p.category}</p>
                    <p className="text-xl font-semibold tracking-tight">{p.name}</p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
