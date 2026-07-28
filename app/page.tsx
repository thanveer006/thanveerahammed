import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Skills } from "@/components/sections/skills";
import { Philosophy } from "@/components/sections/philosophy";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <ProjectsPreview />
      <Skills />
      <Philosophy />
      <Process />
      <Stats />
      <Contact />
    </>
  );
}
