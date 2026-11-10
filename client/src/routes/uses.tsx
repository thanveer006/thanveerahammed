import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

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

export function Component() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-28">
      <Seo
        title="Uses"
        description="The editor, stack, and tools behind the work."
        path="/uses"
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Uses" }]}
        eyebrow="Uses"
        title="What I"
        accent="build with."
        description="The tools that make up my day-to-day, updated as things change."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 2) * 0.06} className="h-full">
            <section className="h-full rounded-3xl border border-border bg-card p-7">
              <h2 className="mb-5 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
                {group.title}
              </h2>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
