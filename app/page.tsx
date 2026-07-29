import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ToolsMarquee } from "@/components/sections/tools-marquee";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Skills } from "@/components/sections/skills";
import { Philosophy } from "@/components/sections/philosophy";
import { Stats } from "@/components/sections/stats";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ToolsMarquee />
      <Experience />
      <ProjectsPreview />
      <Skills />
      <Philosophy />
      <Stats />
      <Contact />
    </>
  );
}
