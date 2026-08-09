import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Footer = ({ className = '' }) => {
  return (
    <footer className={`w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={true} />
          <span className="text-slate-400 font-normal">© 2026 StudentHub</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
          <a href="#help" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help</a>
          <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
