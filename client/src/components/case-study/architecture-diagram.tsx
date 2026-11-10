import type { ArchitectureLayer } from "@/lib/types";

/** Layered stack, top to bottom, joined by a single vertical rail. */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <ol className="relative space-y-3 pl-8">
      <span aria-hidden className="absolute top-3 bottom-3 left-1.75 w-px bg-border" />
      {layers.map((layer) => (
        <li key={layer.layer} className="relative">
          <span
            aria-hidden
            className="absolute top-5 -left-8 size-3.75 rounded-full border-[3px] border-background bg-accent"
          />
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <p className="mb-1 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
              {layer.layer}
            </p>
            <p className="text-sm text-muted-foreground text-pretty">{layer.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
