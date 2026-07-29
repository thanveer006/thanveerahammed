import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Uses",
  description: "The editor, stack, and tools behind the work.",
};

const groups = [
  {
    title: "Editor & Terminal",
    items: ["VS Code", "Git & GitHub", "Windows Terminal", "Postman"],
  },
  {
    title: "Stack",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Prisma"],
  },
  {
    title: "AI & Automation",
    items: ["Claude", "ChatGPT", "Google AI Studio"],
  },
  {
    title: "Design",
    items: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
  },
  {
    title: "Deployment & Infra",
    items: ["Vercel", "Cloudinary", "MongoDB Atlas"],
  },
];

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading
        eyebrow="Uses"
        title="What I build with."
        description="The tools that make up my day-to-day, updated as things change."
      />

      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {group.title}
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
