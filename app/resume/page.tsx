import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume for Thanveer Ahammed N, Software Engineer based in Kozhikode, Kerala, India.",
  alternates: {
    canonical: `${siteUrl}/resume`,
    types: { "application/rss+xml": `${siteUrl}/rss.xml` },
  },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Resume
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Thanveer Ahammed N</h1>
        </div>
        <Button asChild size="lg">
          <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf">
            <Download className="size-4" />
            Download PDF
          </a>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <object data="/resume.pdf" type="application/pdf" className="h-[80vh] w-full">
          <p className="p-8 text-sm text-muted-foreground">
            Your browser can&apos;t preview the PDF inline.{" "}
            <a href="/resume.pdf" className="text-primary underline underline-offset-4">
              Open it directly
            </a>
            {" "}or use the download button above.
          </p>
        </object>
      </div>
    </div>
  );
}
