import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: 'About',          id: 'about' },
  { title: 'Skills',         id: 'skills' },
  { title: 'Projects',       id: 'projects' },
  { title: 'Experience',     id: 'experience' },
  { title: 'Education',      id: 'education' },
  { title: 'Certifications', id: 'certifications' },
];

const Navbar = () => {
  const [active, setActive]           = useState('hero');
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  useEffect(() => {
    const ids = ['hero', ...navLinks.map(l => l.id), 'contact'];

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + 140;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= pos) { setActive(ids[i]); break; }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    setActive(id);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md border-b ${scrolled ? 'py-3 bg-lelab-charcoal/90 border-white/8' : 'py-5 bg-lelab-charcoal/60 border-white/5'}`}>
        <div className="lelab-container flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => go('hero')}
            className="w-10 h-10 rounded-full border border-lelab-yellow/40 flex items-center justify-center font-display font-black text-sm text-lelab-yellow hover:bg-lelab-yellow hover:text-lelab-charcoal transition-all duration-300"
          >
            TA
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  active === link.id ? 'text-lelab-yellow' : 'text-lelab-light/40 hover:text-lelab-light'
                }`}
              >
                {link.title}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={() => go('contact')}
            className="hidden lg:flex btn-primary"
          >
            Contact Me
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-lelab-light transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-lelab-light transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-lelab-light transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-lelab-charcoal z-40 lg:hidden flex flex-col justify-center items-center gap-6 px-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`text-3xl font-display font-bold uppercase tracking-tight transition-colors duration-200 ${
                  active === link.id ? 'text-lelab-yellow' : 'text-lelab-light/50 hover:text-lelab-light'
                }`}
              >
                {link.title}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="mt-6 btn-primary text-sm"
            >
              Let's Work Together
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
