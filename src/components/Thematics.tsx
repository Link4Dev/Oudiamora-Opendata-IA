import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { THEMATICS, Thematic } from '../data/content';

export const Thematics: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<Thematic>(THEMATICS[0]);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
            05. Champs d'Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight">
            Thématiques Clés
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Un panorama complet des compétences et sujets couverts dans le programme Oudiamora. Cliquez sur un sujet pour explorer ses enjeux.
          </p>
        </div>

        {/* Thematic Tags Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {THEMATICS.map((item) => {
            const isSelected = selectedTag.name === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setSelectedTag(item)}
                className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between h-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-slate-50 text-slate-800 border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-500">
                  {item.tagCategory === 'data' && 'Données'}
                  {item.tagCategory === 'ai' && 'IA'}
                  {item.tagCategory === 'governance' && 'Droit'}
                  {item.tagCategory === 'skills' && 'Pratique'}
                </span>
                <span className="text-sm font-bold font-display leading-snug">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Focus Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Détails thématiques : {selectedTag.name}</span>
            </div>
            <p className="text-base sm:text-lg text-slate-800 font-medium max-w-3xl leading-relaxed">
              {selectedTag.description}
            </p>
          </div>

          <a
            href="#ressources"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-5 py-3 rounded-lg transition-colors whitespace-nowrap self-start md:self-center shrink-0"
          >
            <span>Ressources sur ce sujet</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
