import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  ShieldCheck,
  Gauge,
  Blocks,
  Wrench,
  TrendingUp,
  Users,
  Bot,
  TestTube2,
} from "lucide-react";

const principles = [
  {
    icon: Wrench,
    title: "Maintainable by default",
    body: "Code is read far more than it's written. I optimize for the next person changing it — often me, six months later.",
  },
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
    icon: Gauge,
    title: "Performance as a feature",
    body: "A slow system is a broken one from the user's perspective. I treat load time and responsiveness as requirements, not polish.",
  },
  {
    icon: TrendingUp,
    title: "Business value first",
    body: "Every technical decision gets weighed against what it costs the business in time, money, or risk — not just engineering elegance.",
  },
  {
    icon: Users,
    title: "User experience is engineering",
    body: "How a system feels to use is a direct result of decisions made in the backend and the interface alike.",
  },
  {
    icon: Bot,
    title: "AI where it earns its place",
    body: "Before adding a model call, I ask whether a plain function could do the job. If it can, that's what ships — it's cheaper, faster, and doesn't need debugging by reading its mind.",
  },
  {
    icon: TestTube2,
    title: "Testing and deployment as one system",
    body: "Confidence in a release comes from the pipeline, not from hoping. I build testing and deployment together, not as an afterthought.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
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
