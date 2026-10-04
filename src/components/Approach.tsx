import React from 'react';
import { ArrowRight, BookOpen, FlaskConical, Rocket, Share2 } from 'lucide-react';
import { APPROACH_STEPS } from '../data/content';

export const Approach: React.FC = () => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="w-5 h-5" />;
      case 1:
        return <FlaskConical className="w-5 h-5" />;
      case 2:
        return <Rocket className="w-5 h-5" />;
      case 3:
        return <Share2 className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <section id="approche" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
            03. Méthodologie d'Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight">
            Notre Approche
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Une trajectoire pédagogique active conçue pour produire des résultats tangibles au sein des organisations participantes.
          </p>
        </div>

        {/* Horizontal Pipeline Representation */}
        <div className="relative mb-16">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {APPROACH_STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold font-display text-sm">
                      {step.number}
                    </span>
                    <div className="text-slate-400">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold font-display text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-medium text-teal-600 mb-3">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Deliverable result badge (unboxed quiet text) */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Résultat concret
                  </div>
                  <div className="text-xs font-medium text-slate-800">
                    {step.deliverable}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick horizontal diagram for mobile / visual flow */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold font-display text-slate-800 bg-slate-50 py-3.5 px-4 rounded-xl border border-slate-200">
            <span className="text-teal-700">APPRENDRE</span>
            <span className="text-slate-400">→</span>
            <span className="text-teal-700">EXPÉRIMENTER</span>
            <span className="text-slate-400">→</span>
            <span className="text-teal-700">APPLIQUER</span>
            <span className="text-slate-400">→</span>
            <span className="text-teal-700">PARTAGER</span>
          </div>

        </div>

        {/* Core Methodology Manifesto Callout */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white p-8 sm:p-10 border border-slate-800 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
              Notre engagement
            </div>
            <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold font-display text-balance leading-snug">
              « Notre objectif n'est pas seulement de transmettre des connaissances, mais de permettre aux participants de les transformer en compétences et en actions concrètes. »
            </blockquote>
            <p className="mt-4 text-xs sm:text-sm text-slate-400">
              Chaque atelier, guide ou session est adossé à un cas réel d'intérêt public.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
