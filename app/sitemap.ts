import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { getAllSlugs } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projects",
    "/blog",
    "/resume",
    "/uses",
    "/now",
    "/privacy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = getAllSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
