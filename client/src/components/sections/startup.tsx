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
      <Reveal className="overflow-hidden rounded-[2rem] border border-border bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide text-primary uppercase">
              <span aria-hidden className="h-px w-8 bg-current" />
              My startup
            </p>
            <h2 className="font-heading text-(length:--text-h2) leading-[1.12] font-semibold tracking-tight text-balance">
              Building {startup.name}.
            </h2>
            <p className="font-heading mt-2 text-xl font-semibold text-primary">{startup.tagline}</p>

            <p className="mt-5 text-muted-foreground text-pretty">
              {startup.name} is an AI engineering team that embeds intelligence directly into the way
              businesses already work. We partner with companies to design, build, and deploy AI
              agents, automations, and custom software, so teams save time, reduce manual work, and
              grow faster. I&apos;m the {startup.role}.
            </p>

            <blockquote className="mt-6 border-l-2 border-highlight pl-4 font-heading text-lg text-foreground text-pretty">
              We build AI into your workflow, so your business runs smarter without starting over.
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href={startup.url} target="_blank" rel="noopener noreferrer">
                  Visit inlinecognition.io
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={startup.instagram} target="_blank" rel="noopener noreferrer">
                  <SiInstagram size={16} color="currentColor" aria-hidden />
                  Instagram
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-border bg-secondary/50 p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
            <h3 className="mb-5 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              What we do
            </h3>
            <ul className="divide-y divide-border border-y border-border">
              {offerings.map((o) => (
                <li key={o.title} className="py-3.5">
                  <p className="font-medium">{o.title}</p>
                  <p className="text-sm text-muted-foreground text-pretty">{o.body}</p>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              How we work
            </h3>
            <ol className="grid grid-cols-2 gap-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="font-heading text-xl leading-none font-semibold text-accent">
                    {i + 1}
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
