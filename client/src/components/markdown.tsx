import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

/**
 * Renders a post's raw markdown body. Replaces the old `next-mdx-remote` +
 * `mdx-components.tsx` setup — the blog posts are plain markdown (no JSX), so
 * `react-markdown` with the same remark/rehype plugins is a drop-in.
 */
// react-markdown passes the hast `node` to every override; strip it so it never
// reaches the DOM as `node="[object Object]"`.
const components: Components = {
  h1: ({ node: _node, ...props }) => (
    <h2 className="mt-14 mb-5 text-(length:--text-h3) leading-tight font-semibold" {...props} />
  ),
  h2: ({ node: _node, ...props }) => (
    <h2 className="mt-14 mb-5 text-(length:--text-h3) leading-tight font-semibold" {...props} />
  ),
  h3: ({ node: _node, ...props }) => (
    <h3 className="mt-10 mb-3 text-(length:--text-h4) leading-snug font-semibold" {...props} />
  ),
  p: ({ node: _node, ...props }) => (
    <p className="mb-5 text-[1.0625rem] leading-[1.8] text-foreground/85 text-pretty" {...props} />
  ),
  ul: ({ node: _node, ...props }) => <ul className="mb-5 ml-5 list-disc space-y-2 text-foreground/90" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-foreground/90" {...props} />,
  a: ({ node: _node, href, ...props }) => {
    const external = /^https?:\/\//i.test(href ?? "");
    return (
      <a
        className="text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:bg-primary hover:text-primary-foreground"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  strong: ({ node: _node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
  code: ({ node: _node, ...props }) => (
    <code className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />
  ),
  pre: ({ node: _node, ...props }) => (
    <pre
      className="mb-6 overflow-x-auto rounded-2xl border border-border bg-ink p-5 text-sm text-ink-foreground leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  blockquote: ({ node: _node, ...props }) => (
    <blockquote className="mb-5 border-l-2 border-primary pl-5 font-serif text-xl text-foreground/80 italic" {...props} />
  ),
  hr: ({ node: _node, ...props }) => <hr className="my-10 border-border" {...props} />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
