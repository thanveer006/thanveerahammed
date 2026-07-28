import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPaletteProvider } from "@/components/command-palette-provider";
import { getAllPosts } from "@/lib/blog";
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
    "Software engineer building production-grade web applications, enterprise systems, workflow automation, and AI-powered products for real businesses.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Enterprise Software",
    "Workflow Automation",
    "AI Integration",
  ],
  authors: [{ name: "Thanveer Ahammed N" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Thanveer Ahammed N | Software Engineer",
    description:
      "Software engineer building production-grade web applications, enterprise systems, workflow automation, and AI-powered products for real businesses.",
    siteName: "Thanveer Ahammed N",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanveer Ahammed N | Software Engineer",
    description:
      "Software engineer building production-grade web applications, enterprise systems, workflow automation, and AI-powered products for real businesses.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
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
  const posts = getAllPosts();

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
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <CommandPaletteProvider posts={posts}>
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
            </CommandPaletteProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
