import { Mail } from "lucide-react";
import { Link } from "@/components/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const socials = [
  { href: "mailto:thanveerahd06@gmail.com", label: "Email", icon: Mail },
  { href: "https://www.linkedin.com/in/thanveer-ahammed-dev", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://github.com/thanveer006", label: "GitHub", icon: GitHubIcon },
];

const siteLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/uses", label: "Uses" },
  { href: "/now", label: "Now" },
  { href: "/privacy", label: "Privacy" },
];

const footLink =
  "inline-flex min-h-11 items-center rounded-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light";

const repoUrl = "https://github.com/thanveer006/thanveerahammed";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav aria-label="Footer" className="mb-6 flex flex-wrap items-center gap-x-6 text-sm">
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={footLink}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={footLink}
          >
            View Source
          </Link>
        </nav>

        <div className="flex flex-col items-center gap-4 text-sm text-ink-foreground/70 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Thanveer Ahammed N. All rights reserved.</p>
          <div className="flex items-center gap-1">
            {socials.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full text-ink-foreground/70 transition-colors hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
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
