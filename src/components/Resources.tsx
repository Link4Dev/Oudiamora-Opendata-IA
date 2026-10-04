import React, { useState } from 'react';
import { BookOpen, Video, FileText, Database, Wrench, FolderGit2, ArrowRight, ExternalLink } from 'lucide-react';
import { SAMPLE_RESOURCES, ResourceItem } from '../data/content';
import { ResourceModal } from './ResourceModal';

export const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Tous');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const categories = [
    'Tous',
    'Guides',
    'Tutoriels',
    'Jeux de données',
    'Outils',
    'Études de cas',
    'Webinaires',
  ];

  const filteredResources = activeTab === 'Tous'
    ? SAMPLE_RESOURCES
    : SAMPLE_RESOURCES.filter((r) => r.category === activeTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Guides':
        return <BookOpen className="w-4 h-4 text-teal-600" />;
      case 'Tutoriels':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'Jeux de données':
        return <Database className="w-4 h-4 text-blue-600" />;
      case 'Outils':
        return <Wrench className="w-4 h-4 text-amber-600" />;
      case 'Études de cas':
        return <FolderGit2 className="w-4 h-4 text-emerald-600" />;
      case 'Webinaires':
        return <Video className="w-4 h-4 text-violet-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <section id="ressources" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
              06. Boîte à Outils &amp; Savoirs
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight">
              Ressources Pratiques
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed text-balance">
              Des contenus opérationnels, rédigés en français, pour accompagner chaque étape de votre montée en compétences et vos projets de plaidoyer.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Mise à jour continue · Accès libre &amp; ouvert
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto mb-10 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                activeTab === cat
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top metadata line (clean unboxed text) */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(item.category)}
                    <span className="font-semibold text-slate-700">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>{item.durationOrPages}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.level}</span>
                  </div>
                </div>

                {/* Resource Title */}
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-2.5 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Tags (unboxed text) */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 mb-5 pt-3 border-t border-slate-100">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tag} className="text-slate-600">
                      #{tag}{tIdx < item.tags.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedResource(item)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Note for Maintainers & Future Contributors */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
            <span>
              <strong>Architecture évolutive :</strong> Vous pouvez enrichir ce catalogue en modifiant simplement le fichier structuré <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">src/data/content.ts</code>.
            </span>
          </div>
          <a
            href="#communaute"
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 shrink-0"
          >
            Proposer une ressource à la communauté →
          </a>
        </div>

      </div>

      {/* Detail Modal */}
      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </section>
  );
};
