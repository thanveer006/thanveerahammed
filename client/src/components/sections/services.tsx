import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const services = [
  {
    title: "Full-Stack Web Development",
    body: "Production web applications and internal platforms built end to end with Next.js, TypeScript, and Node.js, from database schema to deployment.",
  },
  {
    title: "AI Workflow Automation",
    body: "Automation pipelines, APIs, and AI agents that remove repetitive manual work (approvals, notifications, reporting) without fragile automation nobody trusts.",
  },
  {
    title: "AI Integration",
    body: "Wiring Claude, ChatGPT, or Gemini into a real product or workflow where it earns its place, not bolted on as a feature for its own sake.",
  },
  {
    title: "Enterprise Internal Tools",
    body: "Role-based, secure systems (auth, RBAC, payroll, scheduling) for organizations replacing manual, spreadsheet-driven processes.",
  },
];

export function Services() {
  return (
    <Section id="services" tone="tinted">
      <SectionHeading
        index="06"
        eyebrow="Services"
        title="What I can"
        accent="build for you."
        description="Freelance and contract engineering work, focused on production systems, not demos."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.08} className="h-full">
            <SpotlightCard className="h-full p-7 transition-colors hover:border-foreground/25 sm:p-9">
              <span className="font-mono text-sm text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-balance">{s.title}</h3>
              <p className="text-muted-foreground text-pretty">{s.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
