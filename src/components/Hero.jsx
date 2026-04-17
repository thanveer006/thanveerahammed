import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen bg-lelab-charcoal text-lelab-light flex flex-col justify-between overflow-hidden">

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-24 pb-10 relative z-10">

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold uppercase leading-[0.88] tracking-tighter select-none text-lelab-light"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 13rem)' }}
          >
            THANVEER
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold uppercase text-lelab-gray leading-[0.88] tracking-tighter select-none"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 6rem)' }}
          >
            AHAMMED N
          </motion.h1>
        </div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 text-lelab-gray text-base md:text-lg font-medium max-w-lg"
        >
          MERN Full Stack Developer &amp; AI Automation Enthusiast
          <br className="hidden md:block" />
          based in Calicut, Kerala, India.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={() => scrollTo('projects')} className="btn-primary">
            View My Work
          </button>
          <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf" className="btn-secondary">
            Download Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex items-center gap-6"
        >
          <a href="https://github.com/thanveer006" target="_blank" rel="noopener noreferrer"
            className="text-lelab-gray hover:text-lelab-light transition-colors duration-300">
            <FaGithub size={18} />
          </a>
          <span className="w-px h-4 bg-lelab-light/10" />
          <a href="https://www.linkedin.com/in/thanveer-ahammed-dev" target="_blank" rel="noopener noreferrer"
            className="text-lelab-gray hover:text-lelab-light transition-colors duration-300">
            <FaLinkedin size={18} />
          </a>
          <span className="w-px h-4 bg-lelab-light/10" />
          <a href="mailto:thanveerahd06@gmail.com"
            className="text-lelab-gray hover:text-lelab-light transition-colors duration-300">
            <FaEnvelope size={18} />
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 border-t border-white/5 px-6 sm:px-10 md:px-16 lg:px-24 py-5 flex items-center justify-between"
      >
        <span className="text-xs text-lelab-gray uppercase tracking-widest font-medium">
          Calicut, Kerala · India
        </span>
        <button
          onClick={() => scrollTo('about')}
          className="flex items-center gap-2 text-xs text-lelab-gray hover:text-lelab-yellow transition-colors duration-300 uppercase tracking-widest font-medium group"
        >
          Scroll down
          <FaArrowDown size={11} className="group-hover:translate-y-1 transition-transform duration-300" />
        </button>
        <span className="text-xs text-lelab-gray uppercase tracking-widest font-medium">
          Currently exploring: AI Agents
        </span>
      </motion.div>

    </section>
  );
};

export default Hero;
