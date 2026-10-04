import React from 'react';
import { X, Download, ExternalLink, BookOpen, Clock, Tag, Share2, Check } from 'lucide-react';
import { ResourceItem } from '../data/content';

interface ResourceModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!resource) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 mb-1">
              <span>{resource.category}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>{resource.typeLabel}</span>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 leading-snug">
              {resource.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Présentation de la ressource
            </h4>
            <p className="text-base text-slate-800 leading-relaxed font-normal">
              {resource.description}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Format / Volume</span>
              <span className="font-semibold text-slate-800">{resource.durationOrPages}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Niveau requis</span>
              <span className="font-semibold text-slate-800">{resource.level}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Licence</span>
              <span className="font-semibold text-teal-700">Libre (Creative Commons)</span>
            </div>
          </div>

          {/* Tags list (clean unboxed text) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Mots-clés associés
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              {resource.tags.map((t, i) => (
                <React.Fragment key={t}>
                  <span className="font-medium text-slate-800">{t}</span>
                  {i < resource.tags.length - 1 && <span aria-hidden="true" className="text-slate-400">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Practical takeaway */}
          <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-xl text-teal-950">
            <h5 className="font-semibold text-xs text-teal-900 mb-1">Ce que vous apprendrez à faire :</h5>
            <p className="text-xs text-teal-800 leading-relaxed">
              Mettre en œuvre les recommandations immédiatement au sein de votre association, adapter les modèles de documents à vos projets et partager les bonnes pratiques avec vos collègues.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Lien copié !</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Partager cette ressource</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              alert(`Téléchargement de la ressource "${resource.title}" initié. Les fichiers sont en accès libre et gratuit.`);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Accéder au document complet</span>
          </button>
        </div>

      </div>
    </div>
  );
};
