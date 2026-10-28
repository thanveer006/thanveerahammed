import { ArrowRight, Download, MapPin } from "lucide-react";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { StatCounter } from "@/components/stat-counter";

const stats = [
  { value: 10, suffix: "+", label: "Production apps" },
  { value: 6, suffix: "", label: "Enterprise systems" },
  { value: 100, suffix: "%", label: "Full-stack ownership" },
];

export function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-(--nav-height) overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-130 bg-linear-to-b from-primary/8 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24">
        <div className="order-2 lg:order-1">
          <p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-success" />
            Available for select engineering work
          </p>

          <p className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
            Thanveer Ahammed N
          </p>

          <h1
            className="font-heading text-(length:--text-h1) leading-[1.08] font-semibold tracking-tight text-balance"
          >
            Software Developer building{" "}
            <span className="text-primary">software businesses run on.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty"
          >
            Software developer designing secure, scalable web applications, enterprise
            systems, workflow automation, and AI-powered tools — from architecture to
            deployment.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/#projects">
                View Projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf">
                <Download className="size-4" />
                Resume
              </a>
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <Button asChild size="icon" variant="ghost">
                <a
                  href="https://github.com/thanveer006"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="size-4" />
                </a>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <a
                  href="https://www.linkedin.com/in/thanveer-ahammed-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <dl
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
                <dd className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="relative order-1 mx-auto w-full max-w-72 sm:max-w-sm lg:order-2 lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-linear-to-br from-primary/25 to-transparent blur-2xl"
          />
          <img
            src="/founder.jpg"
            alt="Portrait of Thanveer Ahammed N"
            width={640}
            height={640}
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full rounded-3xl border border-border object-cover shadow-xl"
          />
          <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium shadow-lg sm:left-6">
            <MapPin className="size-3.5 text-primary" />
            Kozhikode, Kerala
          </div>
        </div>
      </div>
    </section>
  );
}
