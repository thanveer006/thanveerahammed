import * as React from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Link } from "@/components/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/spotlight-card";
import { useProjects } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function ProjectsExplorer() {
  const { data: projects, loading, error } = useProjects();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
    [projects]
  );

  const filtered = projects.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      [p.name, p.category, p.oneLiner, ...p.tech]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
    const matchesTag = !activeTag || p.tech.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-11"
            aria-label="Search projects"
          />
        </div>
        {(query || activeTag) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
          >
            <X />
            Clear
          </Button>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {allTags.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
              aria-pressed={active}
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

      <p className="mb-8 font-mono text-xs text-muted-foreground" role="status" aria-live="polite">
        {filtered.length} of {projects.length} projects
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
          {projects.length > 0
            ? "No projects match your search."
            : loading
              ? "Loading projects…"
              : error
                ? "Couldn't load projects right now. Please try again shortly."
                : "No projects yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((project, i) => (
            <SpotlightCard
              key={project.slug}
              className="group h-full transition-colors hover:border-foreground/30"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="flex h-full flex-col rounded-3xl p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="mb-7 flex items-start justify-between gap-3">
                  <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                    <span className="mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {project.category}
                  </p>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
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
          ))}
        </div>
      )}
    </div>
  );
}
