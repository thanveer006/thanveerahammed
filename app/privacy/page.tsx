import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this site handles data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />

      <div className="space-y-6 text-sm text-muted-foreground">
        <p className="text-pretty">
          This site is a personal portfolio. It does not use tracking cookies, and does not sell
          or share visitor data with third parties beyond what&apos;s disclosed below.
        </p>
        <div>
          <h2 className="mb-2 text-sm font-medium text-foreground">Analytics</h2>
          <p className="text-pretty">
            This site uses Vercel Analytics to measure aggregate traffic (page views, referrers,
            approximate location from IP). It&apos;s cookie-free and doesn&apos;t track individual
            visitors across other sites.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-foreground">Contact form</h2>
          <p className="text-pretty">
            If you submit the contact form, your name, email address, and message are sent via
            email (through Resend) directly to the site owner, solely to respond to your
            message. This data is not stored in a database, sold, or shared with any other
            third party.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-foreground">Hosting</h2>
          <p className="text-pretty">
            Like most hosted sites, the hosting provider may log standard technical information
            (IP address, browser type, request timestamps) for security and reliability
            purposes.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-foreground">Contact</h2>
          <p className="text-pretty">
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:thanveerahd06@gmail.com"
              className="text-primary underline underline-offset-4"
            >
              thanveerahd06@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
