import { Mail, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { startup } from "@/lib/site";
import { cn } from "@/lib/utils";

const socials = [
  { href: "mailto:thanveerahd06@gmail.com", label: "Email", icon: Mail },
  { href: "https://www.linkedin.com/in/thanveer-ahammed-dev", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://github.com/thanveer006", label: "GitHub", icon: GitHubIcon },
];

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#experience", label: "Experience" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/resume", label: "Resume" },
      { href: "/uses", label: "Uses" },
      { href: "/now", label: "Now" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

const footLink =
  "inline-flex min-h-11 items-center gap-1 rounded-sm text-ink-foreground/65 transition-colors hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light";

const repoUrl = "https://github.com/thanveer006/thanveerahammed";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      {/* Oversized wordmark: purely decorative depth. */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-0.18em] text-center text-[clamp(5rem,19vw,17rem)] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-white/3.5 select-none"
      >
        Thanveer
      </p>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-full text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light">
              <Logo className="size-8 [--logo-glyph:#0c0e04] [--logo-tile:#c6f135]" />
              Thanveer Ahammed N
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-foreground/60 text-pretty">
              Software developer in Kozhikode, Kerala. Building the systems businesses run on, and
              the AI that makes them lighter.
            </p>
            <Link
              href={startup.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(footLink, "mt-3 text-ink-foreground")}
            >
              Founder, {startup.name}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer ${col.title}`}>
              <p aria-hidden className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-ink-foreground/60 uppercase">
                {col.title}
              </p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.title === "More" && (
                  <li>
                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className={footLink}>
                      View Source
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-sm text-ink-foreground/55 sm:flex-row sm:justify-between">
          {/* The year is baked in at build time; after New Year the client's value
              differs until the next deploy, which must not trigger a hydration error. */}
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Thanveer Ahammed N. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socials.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full text-ink-foreground/65 transition-colors hover:bg-white/10 hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
