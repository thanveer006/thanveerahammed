import { Project } from "../models/project.model.js";
import { Post } from "../models/post.model.js";
import { env } from "../config/env.js";

const siteUrl = env.PUBLIC_SITE_URL;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of blog posts. Ported from `app/rss.xml/route.ts`. */
export async function buildRssXml(): Promise<string> {
  const posts = await Post.find().select("-content").sort({ date: -1 }).lean();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${siteUrl}/blog/${post.slug}`)}</link>
      <guid>${escapeXml(`${siteUrl}/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Thanveer Ahammed N — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Notes on software engineering, system design, AI integration, and automation.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
}

/** XML sitemap. Ported from `app/sitemap.ts`. */
export async function buildSitemapXml(): Promise<string> {
  const [projects, posts] = await Promise.all([
    Project.find().select("slug updatedAt").lean(),
    Post.find().select("slug date updatedAt").lean(),
  ]);

  const staticRoutes = ["", "/projects", "/blog", "/resume", "/uses", "/now", "/privacy"];
  const iso = (d: unknown) => {
    const t = new Date(d as string | number | Date);
    return Number.isNaN(t.getTime()) ? undefined : t.toISOString();
  };
  const latest = [...projects, ...posts]
    .map((d) => iso(d.updatedAt))
    .filter((d): d is string => !!d)
    .sort()
    .pop();

  const urls: { url: string; lastmod?: string }[] = [
    ...staticRoutes.map((r) => ({ url: `${siteUrl}${r}`, lastmod: latest })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastmod: iso(p.updatedAt) })),
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastmod: iso(p.updatedAt) ?? iso(p.date),
    })),
  ];

  const body = urls
    .map(
      ({ url, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(url)}</loc>${
          lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
        }\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

/** robots.txt. Ported from `app/robots.ts`. */
export function buildRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}
