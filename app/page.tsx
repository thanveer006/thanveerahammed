import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ToolsMarquee } from "@/components/sections/tools-marquee";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ToolsMarquee />
      <About />
      <Experience />
      <ProjectsPreview />
      <Skills />
      <Services />
      <Stats />
      <Contact />
    </>
  );
}
