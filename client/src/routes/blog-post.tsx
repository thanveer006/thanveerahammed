import { useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { siteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { usePost } from "@/lib/queries";
import { Markdown } from "@/components/markdown";
import { Breadcrumbs } from "@/components/page-header";

export function Component() {
  const { slug = "" } = useParams();
  const { data: post, loading } = usePost(slug);

  if (!post) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
        <Seo title="Post not found" path={`/blog/${slug}`} noIndex />
        <p className="font-mono text-sm text-accent">{loading ? "Loading…" : "404"}</p>
        {!loading && (
          <>
            <h1 className="mt-3 text-(length:--text-h3) font-semibold">Post not found.</h1>
            <Button asChild className="mt-8">
              <Link href="/blog">
                <ArrowLeft />
                Back to blog
              </Link>
            </Button>
          </>
        )}
      </div>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Thanveer Ahammed N" },
    url: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pt-12 pb-28">
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        jsonLd={articleJsonLd}
      />

      <Breadcrumbs
        className="mb-12"
        items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <header className="mb-12 border-b border-border pb-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
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

        <h1 className="mb-6 text-(length:--text-h1) leading-[1.04] font-semibold text-balance">
          {post.title}
        </h1>

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
      </header>

      <div>
        <Markdown>{post.content}</Markdown>
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <Button asChild variant="outline">
          <Link href="/blog">
            <ArrowLeft />
            All posts
          </Link>
        </Button>
      </div>
    </article>
  );
}
