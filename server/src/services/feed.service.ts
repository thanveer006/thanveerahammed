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
  const posts = await Post.find().sort({ date: -1 }).lean();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
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
    Project.find().select("slug").lean(),
    Post.find().select("slug").lean(),
  ]);

  const staticRoutes = ["", "/projects", "/blog", "/resume", "/uses", "/now", "/privacy"];
  const lastmod = new Date().toISOString();

  const urls = [
    ...staticRoutes.map((r) => `${siteUrl}${r}`),
    ...projects.map((p) => `${siteUrl}/projects/${p.slug}`),
    ...posts.map((p) => `${siteUrl}/blog/${p.slug}`),
  ];

  const body = urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
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
