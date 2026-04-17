import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const certifications = [
  {
    title: "MERN Stack Development with AI",
    subtitle: "Full-Stack Web Development Program",
    issuer: "Tech School by HACA",
    date: "2025",
  },
  {
    title: "AI For All Program",
    subtitle: "AI Aware & Appreciate Stages",
    issuer: "Intel & CBSE",
    date: "June 2025",
  },
];

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="relative w-full py-28 md:py-36 bg-lelab-surface text-lelab-light">
      <div className="lelab-container" ref={ref}>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }} className="section-label mb-10"
        >
          06 — Certifications
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl"
            >
              I'm<br /><span className="text-lelab-yellow">Certified</span>
            </motion.h2>
          </div>

          <div className="lg:w-2/3 flex flex-col divide-y divide-white/[0.06]">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-lelab-light">{cert.title}</h3>
                  <p className="text-sm text-lelab-gray mt-1">{cert.subtitle}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-lelab-yellow mt-2">{cert.issuer}</p>
                </div>
                <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-lelab-gray border border-white/10 rounded-full px-5 py-2.5 self-start sm:self-center">
                  {cert.date}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certifications;
