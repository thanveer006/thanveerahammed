import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useExperience } from "@/lib/queries";

/** Vertical timeline whose spine draws itself as you scroll (and un-draws on the way back). */
export function Experience() {
  const { data: experience } = useExperience();
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.7", "end 0.6"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <Section id="experience" tone="tinted">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where I've"
        accent="built."
        description="Roles focused on shipping and owning production systems, not just contributing to them."
      />

      <div ref={trackRef} className="relative">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-1.25 w-px bg-border md:left-57.25"
        />
        <motion.span
          aria-hidden
          style={{ scaleY: reduced ? 1 : draw }}
          className="absolute top-2 bottom-2 left-1 w-0.75 origin-top rounded-full bg-accent md:left-57"
        />

        {experience.map((entry, i) => (
          <Reveal key={entry.role + entry.company} className="pb-14 last:pb-0">
            <article className="relative grid grid-cols-1 gap-x-14 pl-9 md:grid-cols-[14rem_1fr] md:pl-0">
              <span
                aria-hidden
                className={`absolute top-1.5 left-0 size-3.25 rounded-full border-[3px] border-background md:left-56 ${
                  i === 0 ? "bg-accent ring-4 ring-accent/25" : "bg-muted-foreground"
                }`}
              />
              <div className="mb-3 md:mb-0 md:pr-4 md:text-right">
                <p className="font-mono text-sm font-medium text-accent">
                  {entry.end ? `${entry.start} to ${entry.end}` : entry.start}
                </p>
                <p className="mt-1.5 text-sm text-foreground">
                  {entry.company}
                  <span className="block text-muted-foreground md:hidden">{entry.type}</span>
                </p>
                <p className="hidden text-xs text-muted-foreground md:block">{entry.type}</p>
              </div>

              <div className="md:pl-12">
                <h3 className="text-2xl font-semibold tracking-tight">{entry.role}</h3>
                <p className="mt-3 text-foreground/90 text-pretty">{entry.impact}</p>

                <ul className="mt-5 space-y-2.5">
                  {entry.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span className="text-pretty">{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {entry.tech.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
