import { ArrowUpRight } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { startup } from "@/lib/site";

const offerings = [
  {
    title: "AI agents and chat",
    body: "WhatsApp and web assistants that answer from your own information.",
  },
  {
    title: "Workflow automation",
    body: "Processes that move between your systems on their own.",
  },
  {
    title: "Integrations",
    body: "Connecting your CRM, payments, WhatsApp, and internal tools.",
  },
  {
    title: "Custom software",
    body: "Web and mobile apps built around what AI is genuinely good at.",
  },
  {
    title: "Ongoing support",
    body: "Monitoring, improvements, and new automations on a retainer.",
  },
];

const steps = ["Discover the problem", "Design a focused solution", "Build and deploy fast", "Support and improve"];

export function Startup() {
  return (
    <Section id="startup" tone="tinted">
      <Reveal className="noise relative overflow-hidden rounded-3xl border border-border bg-ink text-ink-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-24 size-112 rounded-full bg-brand-light/12 blur-[110px]"
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="mb-6 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-brand-light uppercase">
              <span className="opacity-60">04</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              My startup
            </p>
            <h2 className="text-(length:--text-h2) leading-[1.04] font-semibold text-balance">
              Building <span className="em-serif text-brand-light">{startup.name}.</span>
            </h2>
            <p className="mt-3 text-xl font-medium text-ink-foreground/80">{startup.tagline}</p>

            <p className="mt-6 text-ink-foreground/65 text-pretty">
              {startup.name} is an AI engineering team that embeds intelligence directly into the way
              businesses already work. We partner with companies to design, build, and deploy AI
              agents, automations, and custom software, so teams save time, reduce manual work, and
              grow faster. I&apos;m the {startup.role}.
            </p>

            <blockquote className="em-serif mt-8 border-l-2 border-brand-light pl-5 text-2xl leading-snug text-pretty">
              We build AI into your workflow, so your business runs smarter without starting over.
            </blockquote>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href={startup.url} target="_blank" rel="noopener noreferrer">
                  Visit inlinecognition.io
                  <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 bg-transparent text-ink-foreground hover:border-white/35 hover:bg-white/6"
              >
                <Link href={startup.instagram} target="_blank" rel="noopener noreferrer">
                  <SiInstagram size={16} color="currentColor" aria-hidden />
                  Instagram
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/3 p-8 sm:p-12 lg:border-t-0 lg:border-l lg:p-14">
            <h3 className="mb-5 font-mono text-xs font-medium tracking-[0.18em] text-ink-foreground/50 uppercase">
              What we do
            </h3>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {offerings.map((o) => (
                <li key={o.title} className="py-4">
                  <p className="font-medium">{o.title}</p>
                  <p className="mt-0.5 text-sm text-ink-foreground/60 text-pretty">{o.body}</p>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 mb-5 font-mono text-xs font-medium tracking-[0.18em] text-ink-foreground/50 uppercase">
              How we work
            </h3>
            <ol className="grid grid-cols-2 gap-x-4 gap-y-5">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="font-mono text-sm leading-5 text-brand-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
