import type { Project } from "./types";

type Searchable = Pick<Project, "name" | "category" | "oneLiner" | "tech">;

/** Every distinct technology across the projects, alphabetically (case-insensitive). */
export function collectTags(projects: Searchable[]): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.tech))).sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" })
  );
}

/**
 * Projects matching a free-text query (all whitespace-separated terms must
 * appear in the name, category, one-liner or tech list; case-insensitive) and,
 * optionally, an exact technology tag.
 */
export function filterProjects<T extends Searchable>(
  projects: T[],
  query: string,
  tag: string | null
): T[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter((p) => {
    if (tag && !p.tech.includes(tag)) return false;
    if (terms.length === 0) return true;
    const haystack = [p.name, p.category, p.oneLiner, ...p.tech].join(" ").toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
