import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Code2, Puzzle, Layers, Sparkles } from "lucide-react";

const languages = [
  { name: "Malayalam", level: "Native / Bilingual" },
  { name: "English", level: "Professional working" },
  { name: "Tamil", level: "Elementary" },
  { name: "Arabic", level: "Elementary" },
  { name: "Urdu", level: "Limited working" },
];

const pillars = [
  {
    icon: Layers,
    title: "Architecture",
    body: "I design systems around how a business actually operates — data models, access boundaries, and integrations that hold up as requirements change.",
  },
  {
    icon: Puzzle,
    title: "Problem Solving",
    body: "Most of the work is translating a messy manual process into a reliable one. I start from the constraint, not the framework.",
  },
  {
    icon: Sparkles,
    title: "Applied AI & Automation",
    body: "I use LLMs and tools like n8n where they remove real work — approvals, notifications, reporting — not as a feature for its own sake.",
  },
  {
    icon: Code2,
    title: "Craft",
    body: "A graphic design background before engineering means interfaces get the same attention as the systems behind them.",
  },
];

export function About() {
  return (
    <section id="about" className="border-b border-border py-24">
      <div className="mx-auto max-w-350 px-6">
        <SectionHeading
          eyebrow="About"
          title="I build software that businesses run on."
          description="Based in Kozhikode, Kerala, India. I work across the stack — from database schema to production deployment — with a focus on internal platforms, workflow automation, and applied AI for organizations that need software to actually work, every day."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <p.icon className="mb-4 size-5 text-primary" />
                <h3 className="mb-2 font-medium">{p.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-10">
          <p className="mb-4 text-sm font-medium text-muted-foreground">Languages</p>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang.name}
                variant="outline"
                className="rounded-full border-border px-3 py-1 font-normal"
              >
                {lang.name}
                <span className="ml-1.5 text-muted-foreground">&middot; {lang.level}</span>
              </Badge>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
