import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config';

interface HeaderProps {
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExportModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "#hero" },
    { label: "Pourquoi", href: "#pourquoi" },
    { label: "Piliers", href: "#piliers" },
    { label: "Approche", href: "#approche" },
    { label: "Ressources", href: "#ressources" },
    { label: "Communauté", href: "#communaute" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-800 text-white'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Zone 1: Single Brand element */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
          >
            {/* Vector emblem based on user logo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform transition-transform group-hover:scale-105">
                <rect width="100" height="100" rx="22" fill={isScrolled ? "#112A38" : "#0D2B3D"} />
                <path d="M 50 16 A 34 34 0 1 0 84 58" fill="none" stroke="#2EC4B6" strokeWidth="6" strokeLinecap="round" />
                <circle cx="50" cy="16" r="6" fill="#38A3A5" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="18" cy="66" r="6" fill="#52B788" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="84" cy="58" r="6" fill="#2EC4B6" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="50" cy="50" r="17" fill="none" stroke="#FFFFFF" strokeWidth="5" />
                <path d="M 39 52 Q 50 63 61 52" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight font-display transition-colors ${
                isScrolled ? 'text-white' : 'text-slate-900'
              }`}>
                Oudiamora<span className="text-teal-500">.</span>net
              </span>
              <span className={`text-[11px] font-medium tracking-wider uppercase ${
                isScrolled ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Open Data + IA
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-teal-500 ${
                  isScrolled ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* LWS Export helper button */}
            <button
              onClick={onOpenExportModal}
              title="Exporter le site pour hébergement mutualisé LWS"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                isScrolled
                  ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-teal-500" />
              <span>Export LWS</span>
            </button>

            {/* Primary Action Button */}
            <a
              href="#communaute"
              className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-500 active:bg-teal-700 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 whitespace-nowrap"
            >
              <span>Rejoindre la communauté</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white text-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExportModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <Download className="w-4 h-4 text-teal-600" />
              <span>Pack Export LWS (HTML/CSS/JS)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
