import { Mail, Download, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
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
    <Section id="contact">
      <Reveal className="noise relative overflow-hidden rounded-3xl border border-border bg-ink text-ink-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -bottom-40 size-136 rounded-full bg-brand-light/14 blur-[120px]"
        />
        <div className="relative grid grid-cols-1 gap-12 p-7 sm:p-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-16">
          <div className="flex flex-col">
            <p className="mb-6 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-brand-light uppercase">
              <span className="opacity-60">07</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              Contact
            </p>
            <h2 className="text-[clamp(2.5rem,1.6rem+3.6vw,5rem)] leading-[0.98] font-semibold text-balance">
              Let&apos;s build <span className="em-serif text-brand-light">something.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-foreground/65 text-pretty">
              Open to full-time roles and select freelance engagements. Send a message directly, or
              reach me through any of the channels below.
            </p>

            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex min-h-14 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    <link.icon className="size-5 shrink-0 text-ink-foreground/70 transition-colors group-hover:text-brand-light" />
                    <span className="text-sm font-medium">{link.label}</span>
                    <span className="ml-auto flex min-w-0 items-center gap-1 truncate font-mono text-xs text-ink-foreground/70">
                      {link.value}
                      <ArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-light" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="/resume.pdf"
              download="Thanveer_Ahammed_Resume.pdf"
              className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium transition-colors hover:border-white/35 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>

          <div className="rounded-3xl border border-border bg-background p-6 text-foreground shadow-2xl sm:p-8 lg:self-start">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
