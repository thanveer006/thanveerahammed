import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, MapPin, ArrowDown } from "lucide-react";
import { Link } from "@/components/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { StatCounter } from "@/components/stat-counter";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { startup } from "@/lib/site";

const stats = [
  { value: 10, suffix: "+", label: "Production apps" },
  { value: 6, suffix: "", label: "Enterprise systems" },
  { value: 100, suffix: "%", label: "Full-stack ownership" },
];

const heroButton =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-light/50 motion-safe:active:scale-[0.97]";

const iconLink =
  "flex size-11 items-center justify-center rounded-full border border-white/10 text-ink-foreground/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-light/50";

/**
 * Dark stage in both themes. Content is rendered visible (no fade-in) so the
 * prerendered HTML and the portrait (LCP) paint before JS hydrates; scroll only
 * adds parallax on top (transform + opacity).
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const copyY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], reduced ? [1, 1] : [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -70]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.08]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 220]);

  return (
    <section
      ref={ref}
      id="hero"
      className="noise relative -mt-17 scroll-mt-(--nav-height) overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_60%_30%,black,transparent_72%)]"
      />
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-40 right-[-12%] size-176 rounded-full bg-brand-light/13 blur-[140px]"
      />

      <div className="relative mx-auto grid min-h-[min(100dvh,60rem)] max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-28 pb-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12 lg:pt-32">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="order-2 lg:order-1">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 py-1.5 pr-4 pl-3 font-mono text-xs text-ink-foreground/80">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-[pulse-ring_2s_ease-out_infinite]" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            Available for select engineering work
          </p>

          <h1 className="text-(length:--text-display) leading-[0.94] font-semibold tracking-[-0.045em] text-balance">
            Software developer building{" "}
            <span className="em-serif text-brand-light">software businesses run on.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/65 text-pretty sm:text-xl">
            <span className="font-medium text-ink-foreground">Thanveer Ahammed N</span> &middot;{" "}
            {startup.role},{" "}
            <Link
              href="/#startup"
              className="text-ink-foreground underline decoration-brand-light/60 underline-offset-4 transition-colors hover:text-brand-light"
            >
              {startup.name}
            </Link>
            . I design secure, scalable web applications, enterprise systems, workflow automation,
            and AI-powered tools, from architecture to deployment.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className={`${heroButton} bg-primary text-primary-foreground hover:brightness-105 hover:shadow-[0_8px_40px_-8px_rgb(198_241_53/0.6)]`}
            >
              View Projects
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="/resume.pdf"
              download="Thanveer_Ahammed_Resume.pdf"
              className={`${heroButton} border border-white/15 hover:border-white/35 hover:bg-white/6`}
            >
              <Download className="size-4" />
              Resume
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a
                href="https://github.com/thanveer006"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={iconLink}
              >
                <GitHubIcon className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/thanveer-ahammed-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconLink}
              >
                <LinkedInIcon className="size-5" />
              </a>
            </div>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-xs text-ink-foreground/55 sm:text-sm">{s.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-ink-foreground tabular-nums sm:text-5xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          style={{ y: portraitY }}
          className="relative order-1 mx-auto w-full max-w-44 sm:max-w-xs lg:order-2 lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[2.25rem] border border-brand-light/30"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <motion.img
              src="/founder.jpg"
              alt="Portrait of Thanveer Ahammed N"
              width={640}
              height={640}
              fetchPriority="high"
              decoding="async"
              loading="eager"
              style={{ scale: portraitScale }}
              className="size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent"
            />
          </div>
          <div className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xl sm:-left-6">
            <MapPin className="size-3.5" />
            Kozhikode, Kerala
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 text-ink-foreground/60 transition-colors hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-light/50 lg:flex"
      >
        <ArrowDown className="size-4 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
