import React from 'react';
import { MapPin, Languages, Briefcase, CheckCircle2, Users, Quote } from 'lucide-react';
import { LOCAL_CSO_ELEMENTS } from '../data/content';

export const LocalCSO: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'local':
        return <MapPin className="w-5 h-5" />;
      case 'french':
        return <Languages className="w-5 h-5" />;
      case 'usecases':
        return <Briefcase className="w-5 h-5" />;
      case 'practice':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'community':
        return <Users className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">
            04. Ancrage &amp; Légitimité
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight text-balance leading-tight">
            La transformation numérique doit aussi partir du terrain.
          </h2>
        </div>

        {/* Central Manifest Quote with Visual Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          <div className="lg:col-span-6">
            <div className="relative p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm">
              <Quote className="w-10 h-10 text-teal-400/40 mb-4" />
              <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic text-balance">
                « Les OSC locales ne doivent pas seulement être utilisatrices des technologies. Elles doivent pouvoir comprendre les données, maîtriser les outils et participer aux décisions qui façonnent leur environnement numérique. »
              </blockquote>
              <div className="mt-6 pt-5 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-teal-400">Plaidoyer Oudiamora</span>
                <span>Société Civile &amp; Souveraineté</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-700/90 shadow-2xl relative group">
              <img
                src="./assets/images/community_civil_society_1791116644131.jpg"
                alt="Acteurs et actrices de la société civile africaine collaborant autour de données et d'outils numériques"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>Ateliers participatifs &amp; Co-construction</span>
                <span className="text-teal-400 font-medium">Dakar · Abidjan · Cotonou · Lomé</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Distinct Elements Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LOCAL_CSO_ELEMENTS.map((el, idx) => (
            <div
              key={el.id}
              className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-teal-500/50 hover:bg-slate-800 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4">
                  {getIcon(el.id)}
                </div>
                <h3 className="text-base font-bold font-display text-white mb-1.5">
                  {el.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-3">
                  {el.summary}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-700/50 leading-normal">
                {el.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
