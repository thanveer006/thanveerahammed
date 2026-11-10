import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ScrollText } from "@/components/scroll-text";
import { SpotlightCard } from "@/components/spotlight-card";

const languages = [
  { name: "Malayalam", level: "Native / Bilingual" },
  { name: "English", level: "Professional working" },
  { name: "Tamil", level: "Elementary" },
  { name: "Arabic", level: "Elementary" },
  { name: "Urdu", level: "Limited working" },
];

const pillars = [
  {
    title: "Architecture",
    body: "I design systems around how a business actually operates: data models, access boundaries, and integrations that hold up as requirements change.",
  },
  {
    title: "Problem Solving",
    body: "Most of the work is translating a messy manual process into a reliable one. I start from the constraint, not the framework.",
  },
  {
    title: "Applied AI & Automation",
    body: "I use LLMs and automation tools where they remove real work, like approvals, notifications, and reporting, not as a feature for its own sake.",
  },
  {
    title: "Craft",
    body: "A graphic design background before engineering means interfaces get the same attention as the systems behind them.",
  },
];

const statement =
  "I build software that businesses run on. From the database schema to production deployment, I focus on internal platforms, workflow automation, and applied AI for organizations that need software to actually work, every day.";

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <p className="mb-8 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
          <span className="opacity-60">01</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          About
        </p>
      </Reveal>

      {/* Scroll-scrubbed manifesto: each word lights up as it crosses the viewport. */}
      <h2 className="sr-only">About</h2>
      <ScrollText
        text={statement}
        className="max-w-5xl text-[clamp(1.75rem,1.2rem+2.6vw,3.75rem)] leading-[1.12] font-semibold tracking-[-0.035em]"
      />

      <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
        <span className="mr-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Languages
        </span>
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="rounded-full border border-border bg-card/50 px-3 py-1 text-sm text-foreground"
          >
            {lang.name}
            <span className="ml-1.5 text-muted-foreground">&middot; {lang.level}</span>
          </span>
        ))}
      </div>

      <ol className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <SpotlightCard className="h-full p-7 transition-colors hover:border-foreground/25 sm:p-8">
                <span className="font-mono text-sm text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 mb-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-pretty">{p.body}</p>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
