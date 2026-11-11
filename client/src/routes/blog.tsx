import { ArrowUpRight, Clock, Rss } from "lucide-react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { rssUrl } from "@/lib/api";
import { usePosts } from "@/lib/queries";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

export function Component() {
  const { data: posts, loading, error } = usePosts();

  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-28">
      <Seo
        title="Blog"
        description="Notes on software engineering, system design, AI integration, and automation."
        path="/blog"
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="Writing"
        title="Notes from the"
        accent="workshop."
        description="Notes on system design, security, and where AI actually belongs in a workflow."
        actions={
          <Button asChild variant="outline" size="sm">
            <a href={rssUrl}>
              <Rss />
              RSS
            </a>
          </Button>
        }
      />

      <div className="divide-y divide-border border-b border-border">
        {posts.length === 0 && (
          <p className="py-20 text-center text-sm text-muted-foreground" role="status">
            {loading
              ? "Loading posts…"
              : error
                ? "Couldn't load posts right now. Please try again shortly."
                : "No posts yet."}
          </p>
        )}
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i, 3) * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-4 py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[9rem_1fr_auto] sm:gap-8"
            >
              <div className="flex flex-col gap-1 font-mono text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>
              </div>
              <div>
                <h2 className="mb-2 text-(length:--text-h3) leading-tight font-semibold text-balance transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mb-4 text-muted-foreground text-pretty">{post.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="hidden size-6 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent sm:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
