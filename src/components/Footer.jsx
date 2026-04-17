import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-lelab-charcoal border-t border-white/[0.06]">
      <div className="lelab-container py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        <p className="text-xs text-lelab-gray uppercase tracking-widest font-medium">
          © {year} Thanveer Ahammed N
        </p>

        <div className="flex items-center gap-5">
          <a href="https://github.com/thanveer006" target="_blank" rel="noopener noreferrer"
            className="text-lelab-gray hover:text-lelab-yellow transition-colors duration-300">
            <FaGithub size={16} />
          </a>
          <a href="https://www.linkedin.com/in/thanveer-ahammed-dev" target="_blank" rel="noopener noreferrer"
            className="text-lelab-gray hover:text-lelab-yellow transition-colors duration-300">
            <FaLinkedin size={16} />
          </a>
          <a href="mailto:thanveerahd06@gmail.com"
            className="text-lelab-gray hover:text-lelab-yellow transition-colors duration-300">
            <FaEnvelope size={16} />
          </a>
        </div>

        <p className="text-xs text-lelab-gray uppercase tracking-widest font-medium">
          Built with React + Vite
        </p>

      </div>
    </footer>
  );
};

export default Footer;
