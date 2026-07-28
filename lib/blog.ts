import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function readPostFile(slug: string) {
  // Reject anything but a plain filename segment before it ever touches the filesystem —
  // slugs come straight from the [slug] route param, so this is the traversal boundary.
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(BLOG_DIR) + path.sep)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const raw = fs.readFileSync(resolved, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const { data, content } = readPostFile(slug);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  try {
    const { data, content } = readPostFile(slug);
    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      readingTime: readingTime(content).text,
      content,
    };
  } catch {
    return null;
  }
}
