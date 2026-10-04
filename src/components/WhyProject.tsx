import React from 'react';
import { Briefcase, Landmark, Building2, Globe2, MessageSquare, AlertCircle, ArrowUpRight } from 'lucide-react';

export const WhyProject: React.FC = () => {
  const transformations = [
    {
      title: "Le travail",
      desc: "Automatisation de la veille, analyse documentaire en temps record et émergence de profils data au sein des équipes de terrain.",
      icon: Briefcase,
    },
    {
      title: "Les politiques publiques",
      desc: "Élaboration de décisions publiques guidées par les indicateurs chiffrés et suivi accru des budgets alloués aux services de base.",
      icon: Landmark,
    },
    {
      title: "Les organisations",
      desc: "Modernisation des flux internes, fiabilisation des rapports de subvention et renforcement de la redevabilité envers les donateurs.",
      icon: Building2,
    },
    {
      title: "L'accès à l'information",
      desc: "Transparence accrue grâce aux portails ouverts, croisement de statistiques territoriales et recul des asymétries d'information.",
      icon: Globe2,
    },
    {
      title: "La participation citoyenne",
      desc: "Mobilisation citoyenne étayée par des données factuelles, plaidoyer documenté et dialogue constructif avec les décideurs.",
      icon: MessageSquare,
    },
  ];

  return (
    <section id="pourquoi" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
            01. Contexte &amp; Urgence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight">
            Les données et l'IA transforment déjà notre monde.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            À travers le continent et à l'échelle mondiale, la révolution des données ouvertes et de l'intelligence artificielle redéfinit les équilibres démocratiques, économiques et associatifs.
          </p>
        </div>

        {/* 5 Transformation Vectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {transformations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}

          {/* Synthesis Card */}
          <div className="p-6 rounded-xl border border-teal-200 bg-teal-50/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                Un constat indéniable
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Le rôle central de la preuve
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Sans données et sans compréhension des outils numériques, les voix citoyennes risquent d'être exclues des tables de décision où s'orientent les priorités nationales.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-teal-200/60 flex items-center gap-2 text-xs font-semibold text-teal-800">
              <span>Nécessité d'un sursaut capacitaire</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* The Core Challenge & Project Response Banner */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-semibold mb-3">
                <AlertCircle className="w-4 h-4" />
                <span>La fracture à combler d'urgence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white text-balance leading-snug mb-4">
                Mais les OSC locales disposent encore de capacités limitées pour exploiter ces nouvelles opportunités.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-balance">
                Manque de formations pratiques francophones, contraintes d'équipement, formats fermés des données publiques et appréhension légitime face à l'IA : les organisations de terrain font face à de multiples obstacles.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
                Notre mission
              </div>
              <p className="text-sm text-white font-medium leading-relaxed">
                Oudiamora.net veut contribuer directement à <strong>réduire cette fracture</strong> en armant les associations africaines d'outils concrets, d'analyses rigoureuses et d'une voix souveraine dans le débat public.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                <span>Terrain &amp; Pratique</span>
                <span className="text-teal-400 font-semibold">Zéro coût caché</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
