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
    <h2 className="font-heading mt-10 mb-4 text-(length:--text-h3) font-semibold tracking-tight" {...props} />
  ),
  h2: ({ node: _node, ...props }) => (
    <h2 className="font-heading mt-10 mb-4 text-(length:--text-h3) font-semibold tracking-tight" {...props} />
  ),
  h3: ({ node: _node, ...props }) => (
    <h3 className="font-heading mt-8 mb-3 text-(length:--text-h4) font-semibold tracking-tight" {...props} />
  ),
  p: ({ node: _node, ...props }) => (
    <p className="mb-5 text-base leading-relaxed text-foreground/90 text-pretty" {...props} />
  ),
  ul: ({ node: _node, ...props }) => <ul className="mb-5 ml-5 list-disc space-y-2 text-foreground/90" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-foreground/90" {...props} />,
  a: ({ node: _node, href, ...props }) => {
    const external = /^https?:\/\//i.test(href ?? "");
    return (
      <a
        className="text-primary underline underline-offset-4 hover:no-underline"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  strong: ({ node: _node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
  code: ({ node: _node, ...props }) => (
    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />
  ),
  pre: ({ node: _node, ...props }) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  blockquote: ({ node: _node, ...props }) => (
    <blockquote className="mb-5 border-l-2 border-primary pl-4 text-muted-foreground italic" {...props} />
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
