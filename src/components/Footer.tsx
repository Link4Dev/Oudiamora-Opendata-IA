import React from 'react';
import { SITE_CONFIG } from '../config';
import { Download, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenExportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenExportModal }) => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { name: 'LinkedIn', url: SITE_CONFIG.socialLinks.linkedin, key: 'linkedin' },
    { name: 'Facebook', url: SITE_CONFIG.socialLinks.facebook, key: 'facebook' },
    { name: 'Instagram', url: SITE_CONFIG.socialLinks.instagram, key: 'instagram' },
    { name: 'X (Twitter)', url: SITE_CONFIG.socialLinks.twitter, key: 'twitter' },
    { name: 'TikTok', url: SITE_CONFIG.socialLinks.tiktok, key: 'tiktok' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 p-1.5 flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <path d="M 50 16 A 34 34 0 1 0 84 58" fill="none" stroke="#2EC4B6" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="50" cy="16" r="6" fill="#38A3A5" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="18" cy="66" r="6" fill="#52B788" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="84" cy="58" r="6" fill="#2EC4B6" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="50" cy="50" r="17" fill="none" stroke="#FFFFFF" strokeWidth="5" />
                  <path d="M 39 52 Q 50 63 61 52" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display text-white">
                  Oudiamora<span className="text-teal-400">.</span>net
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Initiative dédiée au renforcement des compétences et à la souveraineté numérique des organisations de la société civile en Afrique francophone.
            </p>

            {/* LWS Export helper in footer */}
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-teal-400 hover:bg-slate-700 hover:text-teal-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pack d'hébergement LWS (Prêt à l'emploi)</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#hero" className="hover:text-teal-400 transition-colors">Accueil</a></li>
              <li><a href="#pourquoi" className="hover:text-teal-400 transition-colors">Pourquoi ce projet ?</a></li>
              <li><a href="#piliers" className="hover:text-teal-400 transition-colors">Nos 4 piliers</a></li>
              <li><a href="#approche" className="hover:text-teal-400 transition-colors">Notre approche</a></li>
              <li><a href="#ressources" className="hover:text-teal-400 transition-colors">Ressources &amp; Outils</a></li>
              <li><a href="#communaute" className="hover:text-teal-400 transition-colors">Rejoindre la communauté</a></li>
            </ul>
          </div>

          {/* Social Links (Explicit URLs from prompt) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Réseaux Sociaux
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {socialIcons.map((soc) => (
                <li key={soc.key}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-teal-400 transition-colors"
                    title={`Visiter ${soc.name} (modifiable dans src/config.ts)`}
                  >
                    <span>{soc.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-500 mt-4 leading-normal">
              Les liens ci-dessus sont configurables dans <code className="text-slate-400">src/config.ts</code>.
            </p>
          </div>

          {/* Legal, Privacy & Hosting */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Cadre &amp; Éthique
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Protection des données personnelles</span>
              </li>
              <li>Données hébergées dans le strict respect de la vie privée.</li>
              <li>Contenus publiés sous licence libre de partage.</li>
              <li className="pt-2">
                <span className="text-teal-400 font-medium">Contact direct :</span><br />
                <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:underline text-slate-300">
                  {SITE_CONFIG.contactEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Hosting Notice */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {currentYear} <strong>{SITE_CONFIG.name}</strong> · Tous droits réservés · Société civile, Open Data &amp; IA en Afrique francophone.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Hébergement 100% Statique optimisé LWS</span>
            <span aria-hidden="true">·</span>
            <a href="#hero" className="hover:text-slate-300 transition-colors">Haut de page ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
