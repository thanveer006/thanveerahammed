import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ShieldCheck, Blocks, TrendingUp, Bot } from "lucide-react";

const principles = [
  {
    icon: ShieldCheck,
    title: "Security is not optional",
    body: "Auth, access control, and data handling are designed in from the start, not patched on before launch.",
  },
  {
    icon: Blocks,
    title: "Architecture for change",
    body: "Requirements shift. I design boundaries — between data, logic, and integrations — that absorb that change instead of breaking under it.",
  },
  {
    icon: Bot,
    title: "AI where it earns its place",
    body: "Before adding a model call, I ask whether a plain function could do the job. If it can, that's what ships — cheaper, faster, and easier to debug.",
  },
  {
    icon: TrendingUp,
    title: "Business value first",
    body: "Every technical decision gets weighed against what it costs the business in time, money, or risk — not just engineering elegance.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="border-b border-border py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="How I Think"
          title="Software Engineering Philosophy"
          description="The principles that shape every system I build, regardless of stack."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.05}>
              <div className="h-full bg-card p-6">
                <p.icon className="mb-4 size-5 text-primary" />
                <h3 className="mb-2 text-sm font-medium">{p.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
