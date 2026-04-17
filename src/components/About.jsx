import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: '5+',   label: 'Projects Shipped' },
  { value: 'MERN', label: 'Stack'             },
  { value: '2',    label: 'Certifications'    },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const anim = (delay = 0) => ({
    initial:   { opacity: 0, y: 32 },
    animate:   inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="about" className="relative w-full py-32 md:py-40 bg-lelab-charcoal text-lelab-light">
      <div className="lelab-container" ref={ref}>

        {/* Top label */}
        <motion.p {...anim(0)} className="section-label mb-10">01 — About Me</motion.p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left: Heading */}
          <div className="lg:w-5/12">
            <motion.h2
              {...anim(0.1)}
              className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl lg:text-7xl"
            >
              Building the
              <br />
              <span className="text-lelab-yellow">Web of Tomorrow</span>
              <br />
              — Today.
            </motion.h2>

            {/* Stats */}
            <motion.div {...anim(0.25)} className="mt-12 grid grid-cols-3 gap-0 border border-white/8 rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <div key={i} className={`flex flex-col items-center py-6 px-4 ${i < stats.length - 1 ? 'border-r border-white/8' : ''}`}>
                  <span className="font-display text-3xl md:text-4xl font-black text-lelab-yellow leading-none">{s.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-lelab-gray mt-2 text-center">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...anim(0.35)} className="mt-8 flex flex-wrap gap-3">
              <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf" className="btn-primary">
                Download Resume
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* Right: Bio */}
          <div className="lg:w-7/12 flex flex-col justify-center">
            <motion.p {...anim(0.15)} className="text-base md:text-lg leading-[1.85] tracking-[0.015em] text-lelab-light/80 mb-6">
              I'm a <span className="text-lelab-light font-semibold">MERN Full Stack Developer</span> based in Calicut, Kerala — passionate about building fast, functional, and beautifully designed web applications.
            </motion.p>
            <motion.p {...anim(0.2)} className="text-sm md:text-base leading-[1.85] tracking-[0.015em] text-lelab-gray mb-6">
              My focus is on <span className="text-lelab-light/70">Generative AI and AI Automation</span>, working with tools like n8n and LLM APIs to build intelligent workflows that save time and scale effortlessly.
            </motion.p>
            <motion.p {...anim(0.25)} className="text-sm md:text-base leading-[1.85] tracking-[0.015em] text-lelab-gray">
              Beyond engineering, I bring a <span className="text-lelab-light/70">Graphic Design background</span> — typography, branding, and visual identity — which means my UIs aren't just functional, they're polished.
            </motion.p>

            {/* Tag list */}
            <motion.div {...anim(0.3)} className="mt-10 flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'Express', 'AI Automation', 'n8n', 'Graphic Design', 'Prompt Engineering'].map((tag) => (
                <span key={tag} className="text-xs font-semibold uppercase tracking-wider text-lelab-gray border border-white/10 rounded-full px-4 py-1.5 hover:border-lelab-yellow hover:text-lelab-yellow transition-colors duration-300 cursor-default">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
