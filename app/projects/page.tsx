import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Enterprise platforms, workflow automation, and applied-AI systems built for real organizations.",
  alternates: {
    canonical: `${siteUrl}/projects`,
    types: { "application/rss+xml": `${siteUrl}/rss.xml` },
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-20">
      <SectionHeading
        eyebrow="All Projects"
        title="Systems in production, not tutorials."
        description="Search or filter by technology to find a specific project."
      />
      <ProjectsExplorer />
    </div>
  );
}
