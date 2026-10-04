import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onJoinClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onJoinClick }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agissons ensemble dès aujourd'hui</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-balance leading-tight mb-6">
          Vous êtes une OSC, un professionnel ou un acteur engagé ?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto text-balance font-normal leading-relaxed mb-10">
          Rejoignez une communauté qui veut rendre les données et l'IA plus accessibles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl text-slate-950 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 transition-all shadow-xl shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <span>Rejoindre la communauté</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Small trust signal */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Initiative à but non lucratif dédiée aux OSC d'Afrique francophone</span>
        </div>

      </div>
    </section>
  );
};
