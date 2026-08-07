import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-(length:--text-h2) leading-[1.1] font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-muted-foreground text-pretty">{description}</p>
      ) : null}
    </Reveal>
  );
}
