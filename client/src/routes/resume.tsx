import { Download } from "lucide-react";
import { Seo } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export function Component() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-12 pb-28">
      <Seo
        title="Resume"
        description="Resume for Thanveer Ahammed N, Software Developer based in Kozhikode, Kerala, India."
        path="/resume"
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Resume" }]}
        eyebrow="Resume"
        title="Thanveer"
        accent="Ahammed N"
        actions={
          <Button asChild size="lg">
            <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf">
              <Download />
              Download PDF
            </a>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <object data="/resume.pdf" type="application/pdf" className="h-[80vh] w-full">
          <p className="p-8 text-sm text-muted-foreground">
            Your browser can&apos;t preview the PDF inline.{" "}
            <a href="/resume.pdf" className="text-accent underline underline-offset-4">
              Open it directly
            </a>{" "}
            or use the download button above.
          </p>
        </object>
      </div>
    </div>
  );
}
