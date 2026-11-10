import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  index,
  title,
  accent,
  description,
  align = "left",
  onDark = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  /** Optional section number rendered before the eyebrow, e.g. "02". */
  index?: string;
  title: string;
  /** Trailing words of the title set in the serif accent face. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  /** Light text for use on a dark (`ink`) band. */
  onDark?: boolean;
  /** Heading level; standalone pages pass "h1" (the homepage hero owns its h1). */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-14 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] uppercase",
            align === "center" && "justify-center",
            onDark ? "text-brand-light" : "text-accent"
          )}
        >
          {index ? <span className="opacity-60">{index}</span> : null}
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "text-(length:--text-h2) leading-[1.05] font-semibold text-balance",
          onDark && "text-ink-foreground"
        )}
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span className="em-serif text-[1.08em]">{accent}</span>
          </>
        ) : null}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed text-pretty",
            align === "center" && "mx-auto",
            onDark ? "text-ink-foreground/65" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
