import React from 'react';
import { ArrowDown, ArrowRight, Database, Cpu, ShieldCheck, Users, Sparkles } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
  onJoinClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onJoinClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background soft ambient gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-600/30 blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] rounded-full bg-indigo-700/25 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Positioning kicker (unboxed, clean typography) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-teal-400 mb-5">
              <span>Open Data</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Intelligence Artificielle</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Compétences</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Société Civile</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white text-balance leading-[1.1] mb-6">
              Données<span className="text-teal-400">.</span> IA<span className="text-teal-400">.</span> Compétences<span className="text-teal-400">.</span> Impact<span className="text-teal-400">.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed text-balance max-w-2xl mb-8">
              Renforcer les capacités des organisations de la société civile pour mieux comprendre, utiliser et gouverner les données et l'intelligence artificielle.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onDiscoverClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl text-slate-950 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 transition-all shadow-lg shadow-teal-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <span>Découvrir le projet</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onJoinClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Rejoindre la communauté</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Evidence & Impact Markers */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Contenus francophones</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">15+</div>
                <div className="text-xs text-slate-400 mt-0.5">Pays ciblés en Afrique</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">Libre</div>
                <div className="text-xs text-slate-400 mt-0.5">Ressources en libre accès</div>
              </div>
            </div>

          </div>

          {/* Right Column: Abstract Contemporary Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative ring border */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl shadow-teal-950/40">
                <img
                  src="./assets/images/hero_abstract_data_africa_1791116634035.jpg"
                  alt="Illustration abstraite symbolisant l'interconnexion des données ouvertes, de l'intelligence artificielle et de la société civile africaine"
                  className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[4/3] transform transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    // Fallback container in case file is viewed without asset pipeline
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Subtle scrim overlay with metadata footer */}
                <div className="p-4 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent border-t border-slate-800/70">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-teal-300">Écosystème Oudiamora</span>
                    <span className="text-slate-400">Afrique francophone</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Interconnexion des données souveraines, de la collaboration citoyenne et de la gouvernance éthique.
                  </p>
                </div>
              </div>

              {/* Floating thematic card (subtle, quiet anchor) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Gouvernance &amp; Open Data</div>
                  <div className="text-[11px] text-slate-400">Pour des OSC actrices de la donnée</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
