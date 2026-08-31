import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { Button } from "@/components/ui/button";

export function Component() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <Seo title="Page not found" noIndex />
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="font-heading mt-3 text-(length:--text-h3) font-semibold tracking-tight">
        Page not found.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground text-pretty">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </Button>
    </div>
  );
}
