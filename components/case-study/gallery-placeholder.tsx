import { ImageIcon } from "lucide-react";

export function GalleryPlaceholder({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30"
        >
          <ImageIcon className="size-5 text-muted-foreground" aria-hidden />
        </div>
      ))}
    </div>
  );
}
