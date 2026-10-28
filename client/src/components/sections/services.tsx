import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Full-Stack Web Development",
    body: "Production web applications and internal platforms built end to end with Next.js, TypeScript, and Node.js — from database schema to deployment.",
    bar: "bg-primary",
  },
  {
    title: "AI Workflow Automation",
    body: "Automation pipelines, APIs, and AI agents that remove repetitive manual work — approvals, notifications, reporting — without fragile automation nobody trusts.",
    bar: "bg-highlight",
  },
  {
    title: "AI Integration",
    body: "Wiring Claude, ChatGPT, or Gemini into a real product or workflow where it earns its place, not bolted on as a feature for its own sake.",
    bar: "bg-coral",
  },
  {
    title: "Enterprise Internal Tools",
    body: "Role-based, secure systems — auth, RBAC, payroll, scheduling — for organizations replacing manual, spreadsheet-driven processes.",
    bar: "bg-indigo",
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
            <div className="h-full rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lg sm:p-7">
              <span aria-hidden className={cn("mb-5 block h-1.5 w-12 rounded-full", s.bar)} />
              <h3 className="font-heading mb-2 text-xl font-semibold text-balance">{s.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
