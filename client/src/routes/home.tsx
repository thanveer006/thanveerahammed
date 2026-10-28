import { Seo } from "@/components/seo";
import { defaultDescription, siteName, siteUrl, startup } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ToolsMarquee } from "@/components/sections/tools-marquee";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Startup } from "@/components/sections/startup";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thanveer Ahammed N",
  alternateName: ["Thanveer Ahammed", "Thanveer"],
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  description: defaultDescription,
  jobTitle: "Software Developer",
  email: "mailto:thanveerahd06@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  worksFor: [
    { "@type": "Organization", name: "DOPA Coaching" },
    { "@type": "Organization", name: startup.name, url: startup.url },
  ],
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "MERN Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Web Application Development",
    "Enterprise Systems",
    "AI Automation",
    "Workflow Automation",
  ],
  knowsLanguage: ["en", "ml"],
  sameAs: [
    "https://www.linkedin.com/in/thanveer-ahammed-dev",
    "https://github.com/thanveer006",
  ],
};

const startupJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: startup.name,
  url: startup.url,
  description:
    "AI engineering team building AI agents, workflow automation, integrations, and custom software that fit into the way businesses already work.",
  founder: { "@type": "Person", name: "Thanveer Ahammed N", url: siteUrl },
  sameAs: [startup.instagram],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  author: { "@type": "Person", name: "Thanveer Ahammed N" },
};

export function Component() {
  return (
    <>
      <Seo path="/" jsonLd={[personJsonLd, startupJsonLd, siteJsonLd]} />
      <Hero />
      <ToolsMarquee />
      <About />
      <Experience />
      <ProjectsPreview />
      <Startup />
      <Skills />
      <Services />
      <Contact />
    </>
  );
}
