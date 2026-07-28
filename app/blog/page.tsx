import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Rss } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software engineering, system design, AI integration, and automation.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          description="Notes on system design, security, and where AI actually belongs in a workflow."
          className="mb-0"
        />
        <Link
          href="/rss.xml"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Rss className="size-4" />
          RSS
        </Link>
      </div>

      <div className="mt-12 divide-y divide-border border-t border-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-8 focus-visible:outline-none"
          >
            <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden>&middot;</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.readingTime}
              </span>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-balance transition-colors group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground text-pretty">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
