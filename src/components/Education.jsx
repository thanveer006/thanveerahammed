import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const education = [
  {
    degree: "MERN Stack Development",
    institution: "Tech School by HACA",
    year: "Apr 2025 – Mar 2026",
    description: "Full-time immersive program covering MongoDB, Express.js, React, and Node.js. Built real-world applications including an E-commerce platform, Social Media App, and Music Streaming App.",
    highlights: ["MongoDB", "Express.js", "React", "Node.js", "Socket.IO", "REST APIs"],
  },
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="relative w-full py-28 md:py-36 bg-lelab-charcoal text-lelab-light">
      <div className="lelab-container" ref={ref}>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }} className="section-label mb-10"
        >
          05 — Education
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl"
            >
              My<br /><span className="text-lelab-yellow">Education</span>
            </motion.h2>
          </div>

          <div className="lg:w-2/3">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="border border-white/[0.07] rounded-2xl p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-lelab-light">{edu.degree}</h3>
                    <p className="text-sm font-medium text-lelab-yellow mt-1">{edu.institution}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-lelab-gray border border-white/10 rounded-full px-4 py-2 self-start">
                    {edu.year}
                  </span>
                </div>
                <p className="text-sm text-lelab-gray/80 leading-relaxed mb-6">{edu.description}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h) => (
                    <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-lelab-gray/70 border border-white/10 rounded-full px-3 py-1">
                      {h}
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

export default Education;
