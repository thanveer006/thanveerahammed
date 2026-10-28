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
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="About"
            title="I build software that businesses run on."
            description="Based in Kozhikode, Kerala, India. I work across the stack — from database schema to production deployment — with a focus on internal platforms, workflow automation, and applied AI for organizations that need software to actually work, every day."
            className="mb-8"
          />
          <Reveal delay={0.1}>
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
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <li className="flex gap-5 py-7 sm:gap-8">
                <span className="font-heading text-4xl leading-none font-semibold text-highlight sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                    <p.icon className="size-4.5 text-primary" aria-hidden />
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-pretty">{p.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
