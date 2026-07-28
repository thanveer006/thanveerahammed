import Link from "next/link";
import { Mail, Download, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";

const links = [
  {
    href: "mailto:thanveerahd06@gmail.com",
    label: "Email",
    value: "thanveerahd06@gmail.com",
    icon: Mail,
  },
  {
    href: "https://www.linkedin.com/in/thanveer-ahammed-dev",
    label: "LinkedIn",
    value: "/in/thanveer-ahammed-dev",
    icon: LinkedInIcon,
  },
  {
    href: "https://github.com/thanveer006",
    label: "GitHub",
    value: "/thanveer006",
    icon: GitHubIcon,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something."
          description="Open to full-time roles and select freelance engagements. Send a message directly, or reach me through any of the channels below."
          align="center"
          className="mb-16"
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.05} className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <link.icon className="size-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{link.label}</p>
                    <p className="flex items-center gap-1 truncate font-mono text-xs text-muted-foreground">
                      {link.value}
                      <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </p>
                  </div>
                </Link>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf">
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
