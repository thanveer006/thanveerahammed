import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Thanveer Ahammed N | Software Engineer",
    template: "%s | Thanveer Ahammed N",
  },
  description:
    "Software engineer in Kozhikode, Kerala, India building production-grade web applications, enterprise systems, workflow automation, and AI-powered products for real businesses.",
  keywords: [
    "Thanveer Ahammed",
    "Software Engineer",
    "Software Engineer Kerala",
    "Software Developer Kozhikode",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "AI Automation Specialist",
    "n8n Developer",
    "Enterprise Software",
    "Workflow Automation",
    "AI Integration",
    "React Developer India",
  ],
  authors: [{ name: "Thanveer Ahammed N" }],
  creator: "Thanveer Ahammed N",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Thanveer Ahammed N | Software Engineer",
    description:
      "Software engineer in Kozhikode, Kerala, India building production-grade web applications, enterprise systems, workflow automation, and AI-powered products for real businesses.",
    siteName: "Thanveer Ahammed N",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanveer Ahammed N | Software Engineer",
    description:
      "Software engineer in Kozhikode, Kerala, India building production-grade web applications, enterprise systems, workflow automation, and AI-powered products for real businesses.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thanveer Ahammed N",
  url: siteUrl,
  jobTitle: "Software Engineer",
  email: "mailto:thanveerahd06@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "DOPA Coaching",
  },
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Next.js",
    "TypeScript",
    "AI Automation",
    "Workflow Automation",
    "n8n",
  ],
  sameAs: [
    "https://www.linkedin.com/in/thanveer-ahammed-dev",
    "https://github.com/thanveer006",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <Nav />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
