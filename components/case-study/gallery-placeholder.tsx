import { Lock } from "lucide-react";

export function GalleryPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 px-6 py-10 text-center">
      <Lock className="size-5 text-muted-foreground" aria-hidden />
      <p className="max-w-md text-sm text-muted-foreground text-pretty">
        This is an internal system built for a business, not a public product — screenshots
        and live demos aren&apos;t shareable. The architecture, features, and outcomes above
        reflect what was actually built and shipped.
      </p>
    </div>
  );
}
