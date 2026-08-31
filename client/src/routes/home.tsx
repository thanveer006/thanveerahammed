import { Seo } from "@/components/seo";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ToolsMarquee } from "@/components/sections/tools-marquee";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Contact } from "@/components/sections/contact";
import { SnapContainer } from "@/components/motion/snap-container";

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
  worksFor: { "@type": "Organization", name: "DOPA Coaching" },
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
      <Seo path="/" jsonLd={[personJsonLd, siteJsonLd]} />
      <SnapContainer>
        <Hero />
        <ToolsMarquee />
        <About />
        <Experience />
        <ProjectsPreview />
        <Skills />
        <Services />
        <Stats />
        <Contact />
      </SnapContainer>
    </>
  );
}
