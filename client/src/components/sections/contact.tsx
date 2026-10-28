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
      <Reveal className="overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
        <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-14">
          <div className="flex flex-col">
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide uppercase opacity-90">
              <span aria-hidden className="h-px w-8 bg-current" />
              Contact
            </p>
            <h2 className="font-heading text-(length:--text-h2) leading-[1.12] font-semibold tracking-tight text-balance">
              Let&apos;s build something.
            </h2>
            <p className="mt-4 max-w-md opacity-90 text-pretty">
              Open to full-time roles and select freelance engagements. Send a message directly,
              or reach me through any of the channels below.
            </p>

            <ul className="mt-8 divide-y divide-current/20 border-y border-current/20">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                  >
                    <link.icon className="size-5 shrink-0" />
                    <span className="text-sm font-medium">{link.label}</span>
                    <span className="ml-auto flex min-w-0 items-center gap-1 truncate font-mono text-xs opacity-90">
                      {link.value}
                      <ArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="/resume.pdf"
              download="Thanveer_Ahammed_Resume.pdf"
              className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full border border-current/40 px-6 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>

          <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-xl sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
