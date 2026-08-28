/**
 * Static CSS stand-in for the WebGL hero scene — shown while the canvas chunk loads,
 * and permanently in its place under reduced-motion or small/coarse-pointer viewports.
 */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/3 right-[10%] size-64 rounded-full bg-edge-glow opacity-30 blur-3xl sm:size-96" />
    </div>
  );
}
