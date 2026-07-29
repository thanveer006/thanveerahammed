import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently focused on.",
};

export default function NowPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <SectionHeading
        eyebrow="Now"
        title="What I'm focused on."
        description="A snapshot, updated periodically — inspired by nownownow.com."
      />

      <div className="space-y-6 text-sm text-foreground/90">
        <p className="text-pretty">
          Building and maintaining internal software at DOPA Coaching — enterprise HR tooling,
          mentor operations, and event platforms — as a Software Developer (IT Executive).
        </p>
        <p className="text-pretty">
          Deepening applied-AI and workflow-automation work — mostly figuring out, project by
          project, which pipeline steps actually need an LLM and which are better off as plain,
          deterministic functions.
        </p>
        <p className="text-pretty">
          Keeping this portfolio current as the case studies, blog, and project list evolve —
          project screenshots and real testimonials are still on the list.
        </p>
        <p className="text-pretty">
          Mentoring a small group of students and professionals in applied AI and modern web
          development on the side.
        </p>
      </div>
    </div>
  );
}
