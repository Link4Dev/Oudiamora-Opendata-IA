import React from 'react';
import { ShieldCheck, UserCheck, Eye, ArrowUpRight } from 'lucide-react';
import { AMBITION_BLOCKS } from '../data/content';

export const Ambition: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'osc':
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
      case 'pros':
        return <UserCheck className="w-6 h-6 text-indigo-600" />;
      case 'citizens':
        return <Eye className="w-6 h-6 text-violet-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
            08. Vision Stratégique
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight">
            Une société civile capable d'agir dans l'économie des données et de l'IA.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Notre ambition à long terme est d'ancrer une dynamique durable où les organisations communautaires sont des partenaires incontournables des politiques publiques et de l'innovation éthique.
          </p>
        </div>

        {/* 3 Large Ambition Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AMBITION_BLOCKS.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-xs font-bold font-display text-slate-400">
                    Axe 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-2">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-4">
                  {item.summary}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Indicateur d'impact</span>
                <span className="font-semibold text-slate-800">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
