import { Project } from "../models/project.model.js";
import { Post } from "../models/post.model.js";
import { env } from "../config/env.js";

const siteUrl = env.PUBLIC_SITE_URL;

/** Public pages that exist independently of the database content. */
export const STATIC_ROUTES = ["", "/projects", "/blog", "/resume", "/uses", "/now", "/privacy"];

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** ISO timestamp, or undefined for a missing/unparseable date. */
function iso(d: unknown): string | undefined {
  if (d === undefined || d === null || d === "") return undefined;
  const t = new Date(d as string | number | Date);
  return Number.isNaN(t.getTime()) ? undefined : t.toISOString();
}

type FeedPost = { slug: string; title: string; description: string; date: string };

/** Pure RSS 2.0 renderer (no I/O) so it can be unit-tested. */
export function renderRss(posts: FeedPost[], site = siteUrl, now = new Date()): string {
  const items = posts
    .map((post) => {
      const link = escapeXml(`${site}/blog/${post.slug}`);
      const pub = iso(post.date);
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>${
        pub ? `\n      <pubDate>${new Date(pub).toUTCString()}</pubDate>` : ""
      }
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thanveer Ahammed N — Blog</title>
    <link>${escapeXml(`${site}/blog`)}</link>
    <atom:link href="${escapeXml(`${site}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>Notes on software engineering, system design, AI integration, and automation.</description>
    <language>en-us</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>
`;
}

type SitemapDoc = { slug: string; updatedAt?: unknown; date?: unknown };

/** Pure XML sitemap renderer (no I/O). */
export function renderSitemap(projects: SitemapDoc[], posts: SitemapDoc[], site = siteUrl): string {
  const latest = [...projects, ...posts]
    .map((d) => iso(d.updatedAt))
    .filter((d): d is string => !!d)
    .sort()
    .pop();

  const urls: { url: string; lastmod?: string }[] = [
    ...STATIC_ROUTES.map((r) => ({ url: `${site}${r}`, lastmod: latest })),
    ...projects.map((p) => ({ url: `${site}/projects/${p.slug}`, lastmod: iso(p.updatedAt) })),
    ...posts.map((p) => ({ url: `${site}/blog/${p.slug}`, lastmod: iso(p.updatedAt) ?? iso(p.date) })),
  ];

  const body = urls
    .map(
      ({ url, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(url)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** RSS 2.0 feed of blog posts, newest first. */
export async function buildRssXml(): Promise<string> {
  const posts = await Post.find().select("slug title description date").sort({ date: -1 }).lean();
  return renderRss(posts);
}

/** XML sitemap of every public page. */
export async function buildSitemapXml(): Promise<string> {
  const [projects, posts] = await Promise.all([
    Project.find().select("slug updatedAt").lean(),
    Post.find().select("slug date updatedAt").lean(),
  ]);
  return renderSitemap(projects, posts);
}

/** robots.txt for the API host itself (the website ships its own static copy). */
export function buildRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}
