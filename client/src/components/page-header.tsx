import { ChevronRight } from "lucide-react";
import { Link } from "@/components/link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail used by every inner page. The last crumb is the current page. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="inline-flex min-h-8 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-foreground" : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-50" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Consistent top-of-page block for inner routes: breadcrumbs, eyebrow, h1, description, actions. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  accent,
  description,
  actions,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative mb-12 border-b border-border pb-12", className)}>
      <Breadcrumbs items={crumbs} className="mb-10" />
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-(length:--text-h1) leading-[1.02] font-semibold text-balance">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="em-serif text-[1.08em]">{accent}</span>
              </>
            ) : null}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {description}
            </p>
          ) : null}
        </div>
        {actions}
      </Reveal>
    </header>
  );
}
