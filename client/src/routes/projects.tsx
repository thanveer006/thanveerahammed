import { Seo } from "@/components/seo";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsExplorer } from "@/components/projects-explorer";

export function Component() {
  return (
    <div className="mx-auto max-w-350 px-6 py-20">
      <Seo
        title="Projects"
        description="Enterprise platforms, workflow automation, and applied-AI systems built for real organizations."
        path="/projects"
      />
      <SectionHeading
        eyebrow="All Projects"
        title="Systems in production, not tutorials."
        description="Search or filter by technology to find a specific project."
      />
      <ProjectsExplorer />
    </div>
  );
}
