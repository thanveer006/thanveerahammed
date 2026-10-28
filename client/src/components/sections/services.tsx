import { Layers, Bot, Sparkles, ShieldCheck } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Layers,
    title: "Full-Stack Web Development",
    body: "Production web applications and internal platforms built end to end with Next.js, TypeScript, and Node.js — from database schema to deployment.",
    tile: "bg-primary text-primary-foreground",
  },
  {
    icon: Bot,
    title: "AI Workflow Automation",
    body: "Automation pipelines, APIs, and AI agents that remove repetitive manual work — approvals, notifications, reporting — without fragile automation nobody trusts.",
    tile: "bg-highlight text-ink",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    body: "Wiring Claude, ChatGPT, or Gemini into a real product or workflow where it earns its place, not bolted on as a feature for its own sake.",
    tile: "bg-coral text-ink",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Internal Tools",
    body: "Role-based, secure systems — auth, RBAC, payroll, scheduling — for organizations replacing manual, spreadsheet-driven processes.",
    tile: "bg-indigo text-ink",
  },
];

export function Services() {
  return (
    <Section id="services" tone="tinted">
      <SectionHeading
        eyebrow="Services"
        title="What I can build for you."
        description="Freelance and contract engineering work, focused on production systems — not demos."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.08}>
            <div className="flex h-full gap-5 rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lg sm:p-7">
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                  s.tile
                )}
              >
                <s.icon className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading mb-2 text-xl font-semibold text-balance">{s.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
