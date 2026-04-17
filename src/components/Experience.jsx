import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experience = [
  {
    role: "Freelance AI Mentor & Web Developer",
    company: "Self-Employed",
    year: "2025 – Present",
    type: "Freelance",
    description: "Mentoring students and professionals in Applied AI, AI Automation, and modern web development. Delivering hands-on sessions in AI tools, prompt engineering, and workflow automation while building web projects for clients.",
    skills: ["Applied AI", "AI Automation", "Prompt Engineering", "React", "Node.js"],
  },
  {
    role: "Freelance Graphic Designer",
    company: "Self-Employed",
    year: "2023 – 2025",
    type: "Freelance",
    description: "Created visual identities, social media content, marketing materials, and UI mockups for various clients. Delivered creative design solutions across digital and print media.",
    skills: ["Brand Identity", "UI Design", "Social Media", "Print Design", "Adobe Suite"],
  },
];

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative w-full py-28 md:py-36 bg-lelab-surface text-lelab-light">
      <div className="lelab-container" ref={ref}>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }} className="section-label mb-10"
        >
          04 — Experience
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl"
            >
              Work<br /><span className="text-lelab-yellow">History</span>
            </motion.h2>
          </div>

          <div className="lg:w-2/3 flex flex-col divide-y divide-white/[0.06]">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                className="py-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-lelab-yellow">{exp.type}</span>
                  <span className="text-xs font-medium text-lelab-gray">{exp.year}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-lelab-light mb-1">{exp.role}</h3>
                <p className="text-sm font-medium text-lelab-gray mb-5">{exp.company}</p>
                <p className="text-sm text-lelab-gray/80 leading-relaxed mb-6">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s) => (
                    <span key={s} className="text-[10px] font-semibold uppercase tracking-wider text-lelab-gray/70 border border-white/10 rounded-full px-3 py-1">
                      {s}
                    </span>
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

export default Experience;
