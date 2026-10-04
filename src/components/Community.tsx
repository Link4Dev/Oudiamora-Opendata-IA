import React, { useState } from 'react';
import { Send, CheckCircle2, HelpCircle, Code2, Copy, Check, Users } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export const Community: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    organisation: '',
    email: '',
    pays: 'Sénégal',
    domaine: SITE_CONFIG.domains[0],
    interet: SITE_CONFIG.interests[0],
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfigHelper, setShowConfigHelper] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If an external endpoint is configured in config.ts (e.g., Formspree, Zapier, Google Forms Webhook)
    if (SITE_CONFIG.formEndpoint && SITE_CONFIG.formEndpoint.trim() !== '') {
      try {
        await fetch(SITE_CONFIG.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.warn('Endpoint submission attempted:', err);
      }
    } else {
      // Standalone simulation mode: simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const copyConfigSnippet = () => {
    const snippet = `// Dans src/config.ts :
export const SITE_CONFIG = {
  // Remplacez par votre URL Formspree gratuite ou webhook :
  formEndpoint: "https://formspree.io/f/VOTRE_FORM_ID",
  ...
};`;
    navigator.clipboard?.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="communaute" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Manifest */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
              07. Mobilisation Citoyenne
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight text-balance leading-tight mb-6">
              Construisons une communauté qui apprend ensemble.
            </h2>

            <blockquote className="text-base sm:text-lg text-slate-700 italic border-l-2 border-teal-500 pl-4 mb-8 leading-relaxed">
              « Parce que la transformation numérique ne se décrète pas : elle se construit avec celles et ceux qui agissent sur le terrain. »
            </blockquote>

            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              En rejoignant le réseau Oudiamora, vous accédez aux sessions d'échange mensuelles, aux partages de jeux de données fiables, aux retours d'expérience entre pairs et aux alertes sur les opportunités de financements data en Afrique.
            </p>

            {/* Quick Community Highlights */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Réseau francophone bienveillant</span>
                  <span className="text-xs text-slate-500">Membres actifs dans plus de 15 pays</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Gratuit &amp; Sans engagement</span>
                  <span className="text-xs text-slate-500">Vos coordonnées restent strictement confidentielles</span>
                </div>
              </div>
            </div>

            {/* Config helper toggle for administrator / webmaster */}
            <div className="mt-10 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setShowConfigHelper(!showConfigHelper)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
              >
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-teal-600" />
                  <span>Connecter Formspree / Google Forms (Guide rapide)</span>
                </span>
                <span className="text-slate-400">{showConfigHelper ? 'Masquer' : 'Voir'}</span>
              </button>

              {showConfigHelper && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2">
                  <p>
                    Ce formulaire fonctionne sans backend obligatoire. Pour recevoir les soumissions dans votre boîte mail ou Google Sheets :
                  </p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Créez un formulaire gratuit sur <strong>Formspree.io</strong> (ou Tally / Google Form).</li>
                    <li>Ouvrez le fichier <code className="bg-white px-1 border rounded">src/config.ts</code>.</li>
                    <li>Renseignez la variable <code className="bg-white px-1 border rounded">formEndpoint</code> avec votre lien.</li>
                  </ol>
                  <button
                    onClick={copyConfigSnippet}
                    className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet ? 'Copié !' : 'Copier l\'exemple de code'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm relative">
              
              {submitted ? (
                <div className="py-12 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
                    Bienvenue dans la communauté !
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Merci <strong>{formData.nom}</strong>. Votre inscription pour l'organisation <strong>{formData.organisation}</strong> ({formData.pays}) a bien été enregistrée.
                  </p>
                  <p className="text-xs text-slate-500 mb-6">
                    Vous recevrez prochainement nos synthèses de veille et les invitations aux prochains ateliers pratiques.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nom: '',
                        organisation: '',
                        email: '',
                        pays: 'Sénégal',
                        domaine: SITE_CONFIG.domains[0],
                        interet: SITE_CONFIG.interests[0],
                      });
                    }}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Inscrire un autre membre
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-200/80 pb-4 mb-2">
                    <h3 className="text-xl font-bold font-display text-slate-900">
                      Formulaire d'Adhésion
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Réservé aux organisations de la société civile, chercheurs et praticiens engagés.
                    </p>
                  </div>

                  {/* Nom & Organisation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="nom">
                        Nom complet *
                      </label>
                      <input
                        id="nom"
                        type="text"
                        required
                        placeholder="Ex: Aïssatou Diallo"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="organisation">
                        Organisation / Association *
                      </label>
                      <input
                        id="organisation"
                        type="text"
                        required
                        placeholder="Ex: Réseau Citoyen Sahel"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Pays */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="email">
                        Adresse email professionnelle *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="nom@organisation.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="pays">
                        Pays d'intervention *
                      </label>
                      <select
                        id="pays"
                        value={formData.pays}
                        onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      >
                        {SITE_CONFIG.countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Domaine d'activité */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="domaine">
                      Domaine d'activité principal *
                    </label>
                    <select
                      id="domaine"
                      value={formData.domaine}
                      onChange={(e) => setFormData({ ...formData, domaine: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    >
                      {SITE_CONFIG.domains.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Centre d'intérêt */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="interet">
                      Centre d'intérêt prioritaire *
                    </label>
                    <select
                      id="interet"
                      value={formData.interet}
                      onChange={(e) => setFormData({ ...formData, interet: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    >
                      {SITE_CONFIG.interests.map((it) => (
                        <option key={it} value={it}>
                          {it}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 active:bg-teal-700 disabled:opacity-70 transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                      {isSubmitting ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <span>Rejoindre la communauté</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <div className="text-center text-[11px] text-slate-500 mt-3">
                      En soumettant ce formulaire, vous acceptez de recevoir les communications libres du projet Oudiamora.
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
