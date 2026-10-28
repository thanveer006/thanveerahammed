import { ArrowRight, Download, MapPin } from "lucide-react";
import { Link } from "@/components/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { StatCounter } from "@/components/stat-counter";
import { startup } from "@/lib/site";

const stats = [
  { value: 10, suffix: "+", label: "Production apps" },
  { value: 6, suffix: "", label: "Enterprise systems" },
  { value: 100, suffix: "%", label: "Full-stack ownership" },
];

const heroButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-[background-color,border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-light/50";

const iconLink =
  "flex size-10 items-center justify-center rounded-full text-ink-foreground/80 transition-colors hover:bg-white/10 hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-light/50";

/**
 * Dark band in both themes. Content is rendered visible (no fade-in) so the
 * prerendered HTML and the portrait (LCP) paint before JS hydrates.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-(--nav-height) overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(color-mix(in_oklab,var(--ink-foreground)_14%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-[10%] size-136 rounded-full bg-brand-light/20 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-16 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28">
        <div className="order-2 lg:order-1">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-ink-foreground/80">
            <span className="size-1.5 rounded-full bg-success" />
            Available for select engineering work
          </p>

          <p className="mb-3 text-lg font-medium text-highlight">
            Thanveer Ahammed N
            <span className="text-ink-foreground/60">
              {" "}
              &middot; {startup.role},{" "}
              <Link
                href="/#startup"
                className="text-ink-foreground underline decoration-brand-light/60 underline-offset-4 transition-colors hover:text-brand-light"
              >
                {startup.name}
              </Link>
            </span>
          </p>

          <h1 className="font-heading text-(length:--text-h1) leading-[1.08] font-semibold tracking-tight text-balance">
            Software Developer building{" "}
            <span className="text-brand-light">software businesses run on.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink-foreground/70 text-pretty">
            Software developer designing secure, scalable web applications, enterprise
            systems, workflow automation, and AI-powered tools — from architecture to
            deployment.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className={`${heroButton} bg-brand-light text-ink hover:bg-brand-light/90`}
            >
              View Projects
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="/resume.pdf"
              download="Thanveer_Ahammed_Resume.pdf"
              className={`${heroButton} border border-white/20 hover:bg-white/10`}
            >
              <Download className="size-4" />
              Resume
            </a>
            <div className="ml-1 flex items-center gap-1">
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

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-ink-foreground/60 sm:text-sm">{s.label}</dt>
                <dd className="font-heading text-3xl font-semibold tracking-tight text-highlight sm:text-4xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-72 sm:max-w-sm lg:order-2 lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-brand-light/60 sm:translate-x-5 sm:translate-y-5"
          />
          <img
            src="/founder.jpg"
            alt="Portrait of Thanveer Ahammed N"
            width={640}
            height={640}
            fetchPriority="high"
            decoding="async"
            className="relative aspect-square w-full rounded-[2rem] object-cover shadow-2xl"
          />
          <div className="absolute -bottom-3 -left-2 flex items-center gap-2 rounded-full bg-highlight px-3.5 py-2 text-xs font-semibold text-ink shadow-lg sm:-left-5">
            <MapPin className="size-3.5" />
            Kozhikode, Kerala
          </div>
        </div>
      </div>
    </section>
  );
}
