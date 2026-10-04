import React, { useState } from 'react';
import { Database, Cpu, ShieldCheck, TrendingUp, Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { PILLARS, Pillar } from '../data/content';

export const FourPillars: React.FC = () => {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Database':
        return <Database className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Database className="w-6 h-6" />;
    }
  };

  const togglePillar = (id: string) => {
    setExpandedPillar(expandedPillar === id ? null : id);
  };

  return (
    <section id="piliers" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
            02. Cadre d'Intervention
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight">
            Nos 4 Piliers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Une approche globale et articulée pour faire passer les organisations de la société civile de spectatrices passives à actrices souveraines de la transition numérique.
          </p>
        </div>

        {/* 4 Large Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {PILLARS.map((pillar, idx) => {
            const isExpanded = expandedPillar === pillar.id;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-8">
                  {/* Top bar with icon and index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center shadow-inner">
                      {getIcon(pillar.icon)}
                    </div>
                    <span className="text-sm font-bold font-display text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-4">
                    {pillar.tagline}
                  </div>

                  {/* Core Description from User Brief */}
                  <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                    {pillar.description}
                  </p>

                  {/* Points list */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {pillar.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action / view curriculum */}
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Adapté au contexte local
                  </span>
                  <a
                    href="#ressources"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <span>Voir les ressources associées</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Positioning Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 text-center max-w-4xl mx-auto shadow-sm">
          <p className="text-sm sm:text-base font-semibold text-slate-800">
            Le positionnement central d'Oudiamora :
          </p>
          <div className="mt-2 text-base sm:text-xl font-bold font-display text-slate-900 text-balance">
            Open Data + IA + Compétences + Société Civile
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Chaque pilier s'alimente mutuellement pour créer un impact mesurable sur la gouvernance locale et la transparence démocratique.
          </p>
        </div>

      </div>
    </section>
  );
};
