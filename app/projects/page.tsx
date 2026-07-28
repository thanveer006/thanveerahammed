import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsExplorer } from "@/components/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Enterprise platforms, workflow automation, and applied-AI systems built for real organizations.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="All Projects"
        title="Systems in production, not tutorials."
        description="Search or filter by technology to find a specific project."
      />
      <ProjectsExplorer />
    </div>
  );
}
