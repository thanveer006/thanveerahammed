import Link from "next/link";
import { Mail } from "lucide-react";
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

const repoUrl = "https://github.com/thanveer006/My-Portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            View Source
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Thanveer Ahammed N. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
