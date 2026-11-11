import * as React from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Link } from "@/components/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/spotlight-card";
import { useProjects } from "@/lib/queries";
import { collectTags, filterProjects } from "@/lib/filter-projects";
import { cn } from "@/lib/utils";

export function ProjectsExplorer() {
  const { data: projects, loading, error } = useProjects();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => collectTags(projects), [projects]);
  const filtered = React.useMemo(
    () => filterProjects(projects, query, activeTag),
    [projects, query, activeTag]
  );
  // Stable number per project, so cards keep their index while the list is filtered.
  const rank = React.useMemo(() => new Map(projects.map((p, i) => [p.slug, i + 1])), [projects]);
  const hasFilter = query.trim() !== "" || activeTag !== null;
  const clear = () => {
    setQuery("");
    setActiveTag(null);
  };

  let emptyMessage: React.ReactNode = null;
  if (filtered.length === 0) {
    if (projects.length > 0) {
      emptyMessage = (
        <>
          No projects match{query.trim() ? <> &ldquo;{query.trim()}&rdquo;</> : null}
          {activeTag ? <> tagged {activeTag}</> : null}.{" "}
          <button
            type="button"
            onClick={clear}
            className="rounded-sm text-foreground underline decoration-accent underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Clear filters
          </button>
        </>
      );
    } else if (loading) {
      emptyMessage = "Loading projects…";
    } else if (error) {
      emptyMessage = "Couldn't load projects right now. Please try again shortly.";
    } else {
      emptyMessage = "No projects yet.";
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) setQuery("");
            }}
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Search projects..."
            className="pl-11"
            aria-label="Search projects"
            aria-controls="project-results"
          />
        </div>
        {hasFilter && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <X />
            Clear
          </Button>
        )}
      </div>

      {allTags.length > 0 && (
        <div role="group" aria-label="Filter by technology" className="mb-3 flex flex-wrap gap-1.5">
          {allTags.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
                aria-pressed={active}
                aria-controls="project-results"
                className={cn(
                  "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-coarse:min-h-11",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <p className="mb-8 font-mono text-xs text-muted-foreground" role="status" aria-live="polite">
        {filtered.length} of {projects.length} projects
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border px-6 py-20 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <ul id="project-results" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((project) => (
            <li key={project.slug}>
              <SpotlightCard className="group h-full transition-colors hover:border-foreground/30">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex h-full flex-col rounded-3xl p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="mb-7 flex items-start justify-between gap-3">
                    <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                      <span className="mr-2 opacity-60">
                        {String(rank.get(project.slug) ?? 0).padStart(2, "0")}
                      </span>
                      {project.category}
                    </p>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h2 className="mb-3 text-2xl font-semibold tracking-tight text-balance">{project.name}</h2>
                  <p className="mb-6 text-muted-foreground text-pretty">{project.oneLiner}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Link>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
