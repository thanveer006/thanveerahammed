import { Layers, Bot, Sparkles, ShieldCheck } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const services = [
  {
    icon: Layers,
    title: "Full-Stack Web Development",
    body: "Production web applications and internal platforms built end to end with Next.js, TypeScript, and Node.js — from database schema to deployment.",
  },
  {
    icon: Bot,
    title: "AI Workflow Automation",
    body: "Automation pipelines, APIs, and AI agents that remove repetitive manual work — approvals, notifications, reporting — without fragile automation nobody trusts.",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    body: "Wiring Claude, ChatGPT, or Gemini into a real product or workflow where it earns its place, not bolted on as a feature for its own sake.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Internal Tools",
    body: "Role-based, secure systems — auth, RBAC, payroll, scheduling — for organizations replacing manual, spreadsheet-driven processes.",
  },
];

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="What I can build for you."
        description="Freelance and contract engineering work, focused on production systems — not demos."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </div>
              <h3 className="mb-2 font-semibold text-balance">{s.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
