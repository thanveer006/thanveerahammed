import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { Button } from "@/components/ui/button";

export function Component() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <Seo title="Page not found" noIndex />
      <p
        aria-hidden
        className="pointer-events-none absolute -z-10 text-[clamp(10rem,40vw,22rem)] leading-none font-semibold tracking-[-0.06em] text-foreground/4 select-none"
      >
        404
      </p>
      <p className="font-mono text-sm tracking-[0.18em] text-accent uppercase">Error 404</p>
      <h1 className="mt-4 text-(length:--text-h1) leading-none font-semibold">
        Page <span className="em-serif">not found.</span>
      </h1>
      <p className="mt-5 text-muted-foreground text-pretty">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Button asChild size="lg" className="mt-9">
        <Link href="/">
          <ArrowLeft />
          Back home
        </Link>
      </Button>
    </div>
  );
}
