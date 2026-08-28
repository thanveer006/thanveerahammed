import { Seo } from "@/components/seo";
import { siteUrl } from "@/lib/site";
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
  url: siteUrl,
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
    "Next.js",
    "TypeScript",
    "AI Automation",
    "Workflow Automation",
  ],
  sameAs: [
    "https://www.linkedin.com/in/thanveer-ahammed-dev",
    "https://github.com/thanveer006",
  ],
};

export function Component() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
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
