import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Full Stack",
    year: "2024",
    description: "A comprehensive MERN stack e-commerce solution with admin dashboards, secure payments, product management, and a responsive shopping experience.",
    tech: ["React.js", "Node.js", "MongoDB", "Redux", "Stripe"],
    github: "https://github.com/thanveer006",
    live: "",
  },
  {
    title: "Social Media App",
    category: "Full Stack",
    year: "2024",
    description: "Real-time social platform built with MERN + Socket.IO. Features posts, comments, likes, real-time chat, notifications, and user profiles.",
    tech: ["React.js", "Node.js", "Socket.IO", "MongoDB", "JWT"],
    github: "https://github.com/thanveer006",
    live: "",
  },
  {
    title: "Shopping Cart",
    category: "Full Stack",
    year: "2024",
    description: "Full-stack responsive e-commerce app with product pages, cart, checkout flow, authentication, and REST API integration.",
    tech: ["React.js", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/thanveer006",
    live: "",
  },
  {
    title: "Music Streaming App",
    category: "Frontend Dev",
    year: "2024",
    description: "UI-focused music player with playlists, search, audio controls, and smooth transitions built entirely in React.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/thanveer006",
    live: "",
  },
  {
    title: "Portfolio Website",
    category: "Design & Dev",
    year: "2025",
    description: "This portfolio — built with React, Vite, and Tailwind CSS. Features complex animations, a strict design system, and modern component architecture.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/thanveer006",
    live: "",
  },
];

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative w-full py-32 md:py-40 bg-lelab-charcoal text-lelab-light">
      <div className="lelab-container" ref={ref}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-10 border-b border-white/[0.06]">
          <div>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }} className="section-label mb-4"
            >
              03 — Selected Works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl"
            >
              Projects
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="https://github.com/thanveer006" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lelab-gray hover:text-lelab-yellow transition-colors duration-300"
          >
            All on GitHub <FaGithub size={13} />
          </motion.a>
        </div>

        {/* Card grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="h-44 bg-lelab-surface border-b border-white/[0.06] group-hover:bg-white/[0.03] transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
                {/* Subtle inner grid */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(239,185,9,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(239,185,9,0.4) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <span className="relative text-lelab-gray/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Preview
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-lelab-yellow/70">{p.category}</span>
                  <span className="text-[10px] text-lelab-gray/40 font-medium">{p.year}</span>
                </div>

                <h3 className="font-display text-xl font-black uppercase tracking-tight text-lelab-light mb-2 group-hover:text-lelab-yellow transition-colors duration-300">
                  {p.title}
                </h3>

                <p className="text-[13px] text-lelab-gray leading-[1.8] tracking-[0.01em] mb-5">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] font-semibold uppercase tracking-wider text-lelab-gray/50 border border-white/8 rounded-full px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                  <a href={p.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-lelab-gray hover:text-lelab-light transition-colors duration-300"
                  >
                    <FaGithub size={13} /> GitHub
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-lelab-gray hover:text-lelab-yellow transition-colors duration-300"
                    >
                      <FaExternalLinkAlt size={11} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
