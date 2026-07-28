import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Quote } from "lucide-react";

const placeholders = [
  {
    quote:
      "Placeholder testimonial — replace with feedback from a manager, client, or collaborator describing the impact of a specific project.",
    name: "Name Surname",
    role: "Role, Organization",
  },
  {
    quote:
      "Placeholder testimonial — a second quote focused on collaboration, reliability, or technical depth works well here.",
    name: "Name Surname",
    role: "Role, Organization",
  },
  {
    quote:
      "Placeholder testimonial — keep these short (2-3 sentences) and specific to a real outcome, not generic praise.",
    name: "Name Surname",
    role: "Role, Organization",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say about working with me."
          description="Placeholder content — to be replaced with real testimonials."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {placeholders.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-xl border border-dashed border-border bg-card/50 p-6">
                <Quote className="mb-4 size-5 text-muted-foreground" />
                <p className="mb-6 flex-1 text-sm text-muted-foreground text-pretty">{t.quote}</p>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
