import { useEffect, useState } from "react";
import { ApiError, apiFetch } from "./api";
import { snapshot } from "@/generated/content";
import type { ExperienceEntry, Post, PostMeta, Project, Skills } from "./types";

type Resource<T> = { data: T; loading: boolean; error: string | null };

/**
 * Reads a JSON endpoint. Seeded with the build-time snapshot so prerendered HTML
 * (and first paint) is fully populated, then revalidated against the live API on
 * mount — the same shape as the old Next.js "static data + client" model.
 *
 * When `path` changes (e.g. slug-to-slug navigation on a detail route), `data`
 * resets synchronously to the new `initial` so the previous route's content and
 * SEO tags never leak onto the new URL.
 */
function useResource<T>(path: string, initial: T): Resource<T> {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedPath, setLoadedPath] = useState(path);

  if (loadedPath !== path) {
    setLoadedPath(path);
    setData(initial);
    setError(null);
    setLoading(true);
  }

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiFetch<T>(path, controller.signal)
      .then((json) => {
        if (controller.signal.aborted) return;
        setData(json);
        setError(null);
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        // A 404 on a detail endpoint means the entry doesn't exist (e.g. removed
        // since the snapshot): drop the stale seeded value so the route shows 404.
        if (e instanceof ApiError && e.status === 404) setData(null as T);
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [path]);

  return { data, loading, error };
}

export const useProjects = () =>
  useResource<Project[]>("/api/projects", snapshot.projects);

export const useProject = (slug: string) =>
  useResource<Project | null>(
    `/api/projects/${encodeURIComponent(slug)}`,
    snapshot.projects.find((p) => p.slug === slug) ?? null
  );

export const usePosts = () => useResource<PostMeta[]>("/api/posts", snapshot.posts);

export const usePost = (slug: string) =>
  useResource<Post | null>(
    `/api/posts/${encodeURIComponent(slug)}`,
    snapshot.fullPosts.find((p) => p.slug === slug) ?? null
  );

export const useExperience = () =>
  useResource<ExperienceEntry[]>("/api/experience", snapshot.experience);

export const useSkills = () => useResource<Skills>("/api/skills", snapshot.skills);
