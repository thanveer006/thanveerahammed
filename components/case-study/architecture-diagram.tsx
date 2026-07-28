import { ArrowDown } from "lucide-react";
import type { ArchitectureLayer } from "@/lib/data/projects";

export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {layers.map((layer, i) => (
        <div key={layer.layer} className="flex flex-col items-center gap-2">
          <div className="w-full rounded-lg border border-border bg-secondary/40 p-4 sm:p-5">
            <p className="mb-1 font-mono text-xs font-medium uppercase tracking-widest text-primary">
              {layer.layer}
            </p>
            <p className="text-sm text-muted-foreground text-pretty">{layer.detail}</p>
          </div>
          {i < layers.length - 1 && (
            <ArrowDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}
