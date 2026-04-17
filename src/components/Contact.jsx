import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const formRef             = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => { setStatus('success'); setForm({ name: '', email: '', message: '' }); })
      .catch(() => setStatus('error'));
  };

  const inputCls = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-lelab-light text-sm font-medium placeholder:text-lelab-gray/40 focus:outline-none focus:border-lelab-yellow transition-colors duration-300";

  return (
    <section id="contact" className="relative w-full py-28 md:py-36 bg-lelab-charcoal text-lelab-light">
      <div className="lelab-container" ref={ref}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }} className="section-label mb-4"
          >
            07 — Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black uppercase leading-[0.9] tracking-tighter text-5xl md:text-6xl lg:text-7xl"
          >
            Let's Work<br /><span className="text-lelab-yellow">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lelab-gray text-base max-w-lg mx-auto"
          >
            Open to freelance projects, full-time roles, and collaboration. Drop me a message and I'll get back to you promptly.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-5xl mx-auto">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:w-2/5 bg-lelab-surface rounded-2xl p-8 flex flex-col justify-between gap-8"
          >
            <div className="flex flex-col gap-7">
              <a href="mailto:thanveerahd06@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-lelab-yellow/10 flex items-center justify-center text-lelab-yellow group-hover:bg-lelab-yellow group-hover:text-lelab-charcoal transition-all duration-300">
                  <FaEnvelope size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-lelab-gray mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-lelab-light group-hover:text-lelab-yellow transition-colors duration-300">
                    thanveerahd06@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-lelab-yellow/10 flex items-center justify-center text-lelab-yellow">
                  <FaMapMarkerAlt size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-lelab-gray mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-lelab-light">Calicut, Kerala, India</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-lelab-gray mb-4">Find me on</p>
              <div className="flex gap-3">
                <a href="https://github.com/thanveer006" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-lelab-gray border border-white/10 rounded-full px-4 py-2 hover:border-lelab-yellow hover:text-lelab-yellow transition-all duration-300">
                  <FaGithub size={13} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/thanveer-ahammed-dev" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-lelab-gray border border-white/10 rounded-full px-4 py-2 hover:border-lelab-yellow hover:text-lelab-yellow transition-all duration-300">
                  <FaLinkedin size={13} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:w-3/5"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  required placeholder="Your name" className={inputCls} />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  required placeholder="your@email.com" className={inputCls} />
              </div>
              <textarea rows="6" name="message" value={form.message} onChange={handleChange}
                required placeholder="Tell me about your project or idea..."
                className={`${inputCls} resize-none`} />

              <div className="flex items-center gap-4">
                <button type="submit" disabled={status === 'sending'}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>

                {status === 'success' && (
                  <p className="text-sm text-green-400 font-medium">✓ Sent! I'll reply soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-400 font-medium">Failed. Email me directly.</p>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
