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
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base text-muted-foreground text-pretty">{description}</p>
      ) : null}
    </Reveal>
  );
}
