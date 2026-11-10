import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/page-header";

const sections = [
  {
    title: "Analytics",
    body: "This site uses Vercel Analytics to measure aggregate traffic (page views, referrers, approximate location from IP). It's cookie-free and doesn't track individual visitors across other sites.",
  },
  {
    title: "Contact form",
    body: "If you submit the contact form, your name, email address, and message are stored by the site owner and sent via email (through Resend), solely to respond to your message. Stored submissions, along with your IP address and browser details used to limit spam, are automatically deleted after 180 days. This data is not sold or shared with any other third party.",
  },
  {
    title: "Hosting",
    body: "Like most hosted sites, the hosting provider may log standard technical information (IP address, browser type, request timestamps) for security and reliability purposes.",
  },
];

export function Component() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-28">
      <Seo title="Privacy Policy" description="How this site handles data." path="/privacy" />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        description="This site is a personal portfolio. It does not use tracking cookies, and does not sell or share visitor data with third parties beyond what's disclosed below."
      />

      <div className="divide-y divide-border">
        {sections.map((s) => (
          <section key={s.title} className="grid gap-3 py-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
            <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">{s.title}</h2>
            <p className="text-muted-foreground text-pretty">{s.body}</p>
          </section>
        ))}
        <section className="grid gap-3 py-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Contact</h2>
          <p className="text-muted-foreground text-pretty">
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:thanveerahd06@gmail.com"
              className="text-foreground underline decoration-primary underline-offset-4"
            >
              thanveerahd06@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
