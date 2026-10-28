import { Code2, Puzzle, Layers, Sparkles } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

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
    body: "I use LLMs and automation tools where they remove real work — approvals, notifications, reporting — not as a feature for its own sake.",
  },
  {
    icon: Code2,
    title: "Craft",
    body: "A graphic design background before engineering means interfaces get the same attention as the systems behind them.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="I build software that businesses run on."
        description="Based in Kozhikode, Kerala, India. I work across the stack — from database schema to production deployment — with a focus on internal platforms, workflow automation, and applied AI for organizations that need software to actually work, every day."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </div>
              <h3 className="mb-2 font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Languages</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <Badge
              key={lang.name}
              variant="outline"
              className="rounded-full border-border bg-card px-3 py-1 font-normal"
            >
              {lang.name}
              <span className="ml-1.5 text-muted-foreground">&middot; {lang.level}</span>
            </Badge>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
