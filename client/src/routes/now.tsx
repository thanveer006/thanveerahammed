import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

const items = [
  {
    title: "Day job",
    body: "Building and maintaining internal software at DOPA Coaching: enterprise HR tooling, mentor operations, and event platforms, as a Software Developer (IT Executive).",
  },
  {
    title: "Applied AI",
    body: "Deepening applied-AI and workflow-automation work, mostly figuring out, project by project, which pipeline steps actually need an LLM and which are better off as plain, deterministic functions.",
  },
  {
    title: "This site",
    body: "Keeping this portfolio current as the case studies, blog, and project list evolve; project screenshots and real testimonials are still on the list.",
  },
  {
    title: "Mentoring",
    body: "Mentoring a small group of students and professionals in applied AI and modern web development on the side.",
  },
];

export function Component() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-28">
      <Seo title="Now" description="What I'm currently focused on." path="/now" />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Now" }]}
        eyebrow="Now"
        title="What I'm"
        accent="focused on."
        description="A snapshot, updated periodically, inspired by nownownow.com."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <p className="mb-4 font-mono text-xs tracking-[0.18em] text-accent uppercase">
                  <span className="mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </p>
                <p className="text-foreground/90 text-pretty">{item.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
