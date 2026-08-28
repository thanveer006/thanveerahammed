import { useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { siteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { usePost } from "@/lib/queries";
import { Markdown } from "@/components/markdown";

export function Component() {
  const { slug = "" } = useParams();
  const { data: post, loading } = usePost(slug);

  if (!post) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
        <Seo title="Post not found" path={`/blog/${slug}`} />
        <p className="font-mono text-sm text-primary">{loading ? "Loading…" : "404"}</p>
        {!loading && (
          <>
            <h1 className="font-heading mt-3 text-(length:--text-h3) font-semibold tracking-tight">
              Post not found.
            </h1>
            <Button asChild className="mt-8">
              <Link href="/blog">
                <ArrowLeft className="size-4" />
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
    <article className="mx-auto max-w-2xl px-6 py-20">
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        jsonLd={articleJsonLd}
      />

      <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3">
        <Link href="/blog">
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
      </Button>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

      <h1 className="font-heading mb-4 text-(length:--text-h1) leading-[1.1] font-semibold tracking-tight text-balance">
        {post.title}
      </h1>

      <div className="mb-10 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div>
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
