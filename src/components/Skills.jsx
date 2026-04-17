import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: "Web Development",
    skills: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.IO", "Responsive Design"],
  },
  {
    title: "AI Tools",
    skills: ["ChatGPT", "Gemini", "Google AI Studio", "Claude", "Manus", "Antigravity", "Bolt", "Lovable", "Zapier", "n8n"],
  },
  {
    title: "Graphic Design",
    skills: ["Typography", "Logo Design", "Poster Design", "Branding", "Adobe Photoshop", "Adobe Illustrator"],
  },
  {
    title: "Dev Tools",
    skills: ["VS Code", "Git & GitHub", "Postman", "Vite", "npm"],
  },
  {
    title: "Languages",
    skills: ["English", "Arabic", "Malayalam", "Tamil", "Hindi"],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="relative w-full py-32 md:py-40 bg-lelab-surface text-lelab-light">
      <div className="lelab-container" ref={ref}>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left sticky header */}
          <div className="lg:w-1/3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="section-label mb-6"
            >
              02 — Tech Stack
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl"
            >
              What I<br />
              <span className="text-lelab-yellow">Work</span><br />
              With
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lelab-gray text-sm leading-[1.85] tracking-[0.015em]"
            >
              A curated set of tools and technologies I use to design, build, and ship production-ready projects.
            </motion.p>
          </div>

          {/* Right: card grid per category */}
          <div className="lg:w-2/3 flex flex-col divide-y divide-white/[0.06]">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07 }}
                className="py-8"
              >
                <span className="block text-[10px] font-bold uppercase tracking-widest text-lelab-gray mb-5">
                  {cat.title}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="border border-white/10 rounded-lg px-4 py-3 text-xs font-semibold text-lelab-light/60 hover:bg-white/[0.04] hover:border-white/20 hover:text-lelab-light transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
