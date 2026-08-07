import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getPost } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
      types: { "application/rss+xml": `${siteUrl}/rss.xml` },
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Thanveer Ahammed N",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>
    </article>
  );
}
