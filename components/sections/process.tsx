import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const steps = [
  { step: "01", title: "Requirement Analysis", body: "Understand the underlying workflow and constraints before writing a spec." },
  { step: "02", title: "Architecture", body: "Define data models, service boundaries, and integration points." },
  { step: "03", title: "UI Design", body: "Design interfaces around the user's task, not the data model." },
  { step: "04", title: "Backend", body: "Build the business logic and services the product runs on." },
  { step: "05", title: "API", body: "Design contracts that are stable, documented, and easy to consume." },
  { step: "06", title: "Database", body: "Model data for correctness first, then for query performance." },
  { step: "07", title: "Testing", body: "Verify behavior against actual usage scenarios, not just happy paths." },
  { step: "08", title: "Deployment", body: "Ship with CI/CD, monitoring, and a rollback plan in place." },
  { step: "09", title: "Maintenance", body: "Monitor, fix, and evolve the system as usage reveals new needs." },
];

export function Process() {
  return (
    <section id="process" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Development Process"
          title="From requirement to production."
          description="The same disciplined process on every project, regardless of size."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={(i % 3) * 0.06}>
              <div className="relative rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-xs text-primary">{s.step}</span>
                <h3 className="mt-2 mb-2 font-medium">{s.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
