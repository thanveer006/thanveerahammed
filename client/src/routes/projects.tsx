import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/page-header";
import { ProjectsExplorer } from "@/components/projects-explorer";

export function Component() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-28">
      <Seo
        title="Projects"
        description="Enterprise platforms, workflow automation, and applied-AI systems built for real organizations."
        path="/projects"
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        eyebrow="All Projects"
        title="Systems in production,"
        accent="not tutorials."
        description="Search or filter by technology to find a specific project."
      />
      <ProjectsExplorer />
    </div>
  );
}
