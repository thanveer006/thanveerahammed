import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Light text for use on a dark (`ink`) band. */
  onDark?: boolean;
  /** Heading level; standalone pages pass "h1" (the homepage hero owns its h1). */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide uppercase",
            align === "center" && "justify-center",
            onDark ? "text-brand-light" : "text-primary"
          )}
        >
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-heading text-(length:--text-h2) leading-[1.12] font-semibold tracking-tight text-balance">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base text-pretty",
            onDark ? "text-ink-foreground/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
