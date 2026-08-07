"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";
import { Tilt3D } from "@/components/motion/tilt-3d";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();

export function ProjectsExplorer() {
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const filtered = projects.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      [p.name, p.category, p.oneLiner, ...p.tech].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesTag = !activeTag || p.tech.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-9"
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
            <X className="size-3.5" />
            Clear
          </Button>
        )}
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
            aria-pressed={activeTag === tag}
          >
            <Badge
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer font-mono text-xs font-normal transition-colors"
            >
              {tag}
            </Badge>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No projects match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <Tilt3D key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 font-mono text-xs text-muted-foreground">{project.category}</p>
                    <h2 className="font-semibold text-balance">{project.name}</h2>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="mb-5 text-sm text-muted-foreground text-pretty">{project.oneLiner}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            </Tilt3D>
          ))}
        </div>
      )}
    </div>
  );
}
