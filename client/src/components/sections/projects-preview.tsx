import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/components/link";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/spotlight-card";
import { useMediaQuery } from "@/components/motion/use-media-query";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useProjects } from "@/lib/queries";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** How many projects the homepage preview shows before sending visitors to /projects. */
const PREVIEW_COUNT = 4;

function ProjectCard({ project, index, className }: { project: Project; index: number; className?: string }) {
  return (
    <SpotlightCard className={cn("group h-full transition-colors hover:border-foreground/30", className)}>
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full min-h-64 flex-col rounded-3xl p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
      >
        <div className="mb-8 flex items-start justify-between gap-3">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            <span className="mr-2 opacity-60">{String(index + 1).padStart(2, "0")}</span>
            {project.category}
          </p>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <h3 className="mb-3 text-3xl leading-tight font-semibold tracking-tight text-balance">
          {project.name}
        </h3>
        <p className="mb-8 max-w-xl text-muted-foreground text-pretty">{project.oneLiner}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      </Link>
    </SpotlightCard>
  );
}


const headingProps = {
  index: "03",
  eyebrow: "Featured Projects",
  title: "Systems in production,",
  accent: "not tutorials.",
  description:
    "Enterprise platforms, automation tooling, and applied-AI systems built for real organizations.",
} as const;

/**
 * Desktop: the section pins while vertical scroll drives a horizontal track of
 * project cards (scroll-linked, reversible). Below `lg`, with touch, or under
 * reduced motion it is a normal grid, so there is no scroll-jacking on phones.
 */
function HorizontalTrack({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      const track = trackRef.current;
      if (!track || cancelled) return;
      // clientWidth excludes the classic scrollbar; innerWidth would over-scroll by its width.
      const viewport = document.documentElement.clientWidth;
      setDistance(Math.max(0, Math.round(track.scrollWidth - viewport)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    // Web-font swap changes text metrics (and so card heights/widths) after first paint.
    void document.fonts?.ready.then(measure);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects.length]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // Height = one viewport + the horizontal distance, so vertical scroll maps 1:1 onto the track.
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionHeading {...headingProps} className="mb-10" />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pr-6 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {projects.map((project, i) => (
            <div key={project.slug} className="w-[min(32rem,70vw)] shrink-0">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
          <div className="flex w-[min(20rem,50vw)] shrink-0 items-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                Browse all projects
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 h-px w-full max-w-6xl bg-border px-6" aria-hidden>
          <motion.div style={{ width: bar }} className="h-px bg-accent" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsPreview() {
  const { data: allProjects } = useProjects();
  const projects = allProjects.slice(0, PREVIEW_COUNT);
  const wide = useMediaQuery("(min-width: 1024px) and (hover: hover)");
  const reduced = useReducedMotion();
  const pinned = wide && !reduced && projects.length > 0;

  // One stable <section id="projects"> in both modes. Swapping the element itself would
  // orphan anything observing it (the nav's active-section tracking) after hydration or
  // when the viewport crosses the breakpoint.
  return (
    <section
      id="projects"
      className={cn(
        "relative scroll-mt-(--nav-height)",
        pinned ? "border-b border-border" : "py-24 sm:py-32"
      )}
    >
      {pinned ? (
        <HorizontalTrack projects={projects} />
      ) : (
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading {...headingProps} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                Browse all projects
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      )}
    </section>
  );
}
