import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mb-5 text-base leading-relaxed text-foreground/90 text-pretty" {...props} />,
  ul: (props) => <ul className="mb-5 ml-5 list-disc space-y-2 text-foreground/90" {...props} />,
  ol: (props) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-foreground/90" {...props} />,
  a: (props) => (
    <a className="text-primary underline underline-offset-4 hover:no-underline" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-5 border-l-2 border-primary pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
};
