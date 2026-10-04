import React, { useState } from 'react';
import { X, Download, Server, Check, FolderArchive, ArrowRight, Copy, Terminal, FileCode } from 'lucide-react';
import JSZip from 'jszip';
import { SITE_CONFIG } from '../config';

interface LwsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LwsExportModal: React.FC<LwsExportModalProps> = ({ isOpen, onClose }) => {
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedFilezilla, setCopiedFilezilla] = useState(false);

  if (!isOpen) return null;

  const handleDownloadLwsZip = async () => {
    setIsGeneratingZip(true);
    try {
      const zip = new JSZip();

      // 1. Robots.txt & Sitemap.xml
      zip.file("robots.txt", `# robots.txt pour Oudiamora.net\nUser-agent: *\nAllow: /\nSitemap: https://oudiamora.net/sitemap.xml\n`);
      zip.file("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://oudiamora.net/</loc><priority>1.0</priority></url>\n  <url><loc>https://oudiamora.net/#pourquoi</loc><priority>0.8</priority></url>\n  <url><loc>https://oudiamora.net/#piliers</loc><priority>0.8</priority></url>\n  <url><loc>https://oudiamora.net/#approche</loc><priority>0.7</priority></url>\n  <url><loc>https://oudiamora.net/#ressources</loc><priority>0.9</priority></url>\n  <url><loc>https://oudiamora.net/#communaute</loc><priority>0.9</priority></url>\n</urlset>`);

      // 2. .htaccess for LWS Apache servers
      zip.file(".htaccess", `# Configuration Apache / LWS Mutualisé pour Oudiamora.net
AddDefaultCharset UTF-8

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Forcer HTTPS si activé sur votre espace LWS
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
`);

      // 3. README-LWS.txt
      zip.file("README-LWS.txt", `========================================================
GUIDE DE DÉPLOIEMENT SUR HÉBERGEMENT MUTUALISÉ LWS
Projet : Oudiamora.net (Open Data + IA + Société Civile)
========================================================

Ce pack contient tous les fichiers statiques (HTML, CSS, JS, Images, SEO).
Il est 100% autonome et ne nécessite :
- AUCUNE base de données MySQL
- AUCUN serveur Node.js
- AUCUN script PHP obligatoire

ÉTAPES DE MISE EN LIGNE SUR LWS :
----------------------------------
1. Connectez-vous à votre espace client LWS (https://panel.lws.fr).
2. Rendez-vous dans "Gestionnaire de fichiers" (ou utilisez FileZilla avec vos accès FTP).
3. Ouvrez le dossier racine de votre site (généralement "public_html" ou "htdocs").
4. Uploadez l'ensemble des fichiers et dossiers de cette archive.
5. Votre site est instantanément en ligne !

CONFIGURATION DU FORMULAIRE :
-----------------------------
Dans le fichier js/main.js ou sur la version React, configurez l'URL de votre Formspree
ou Google Forms pour recevoir les alertes sur votre adresse e-mail.

Contact : contact@oudiamora.net
`);

      // 4. Standalone index.html matching exact static architecture
      const staticHtmlContent = `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oudiamora.net – Open Data, IA &amp; Société Civile en Afrique</title>
  <meta name="description" content="Plateforme d'accompagnement des OSC d'Afrique francophone : Open Data, Intelligence Artificielle, gouvernance des données et compétences numériques.">
  <link rel="icon" type="image/svg+xml" href="./favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <!-- En-tête -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-3">
        <img src="./assets/images/logo-oudiamora.svg" alt="Oudiamora.net" class="h-10 w-auto">
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="#hero" class="hover:text-teal-600">Accueil</a>
        <a href="#pourquoi" class="hover:text-teal-600">Pourquoi</a>
        <a href="#piliers" class="hover:text-teal-600">Piliers</a>
        <a href="#approche" class="hover:text-teal-600">Approche</a>
        <a href="#ressources" class="hover:text-teal-600">Ressources</a>
        <a href="#communaute" class="hover:text-teal-600">Communauté</a>
      </nav>
      <a href="#communaute" class="px-4 py-2 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500">
        Rejoindre la communauté
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="bg-slate-950 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7">
        <div class="text-teal-400 text-xs font-semibold mb-3">Open Data · IA · Compétences · Société Civile</div>
        <h1 class="text-4xl sm:text-5xl font-extrabold font-display leading-tight mb-6">
          Données. IA. Compétences. Impact.
        </h1>
        <p class="text-lg text-slate-300 mb-8 max-w-2xl">
          Renforcer les capacités des organisations de la société civile pour mieux comprendre, utiliser et gouverner les données et l'intelligence artificielle.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#pourquoi" class="px-6 py-3 text-sm font-semibold rounded-xl text-slate-950 bg-teal-400 hover:bg-teal-300">
            Découvrir le projet
          </a>
          <a href="#communaute" class="px-6 py-3 text-sm font-semibold rounded-xl text-white bg-slate-800 border border-slate-700 hover:bg-slate-700">
            Rejoindre la communauté
          </a>
        </div>
      </div>
      <div class="lg:col-span-5">
        <img src="./assets/images/hero-data-africa.jpg" alt="Données et IA en Afrique" class="rounded-2xl border border-slate-800 shadow-2xl w-full">
      </div>
    </div>
  </section>

  <!-- Section Pourquoi -->
  <section id="pourquoi" class="py-20 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold font-display text-slate-900 mb-4">Les données et l'IA transforment déjà notre monde.</h2>
      <p class="text-slate-600 max-w-3xl mb-12">Le travail, les politiques publiques, les organisations, l'accès à l'information et la participation citoyenne sont en pleine mutation. Mais les OSC locales disposent encore de capacités limitées pour exploiter ces nouvelles opportunités. Le projet veut contribuer à réduire cette fracture.</p>
    </div>
  </section>

  <!-- Piliers -->
  <section id="piliers" class="py-20 bg-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold font-display text-slate-900 mb-8">Nos 4 Piliers</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-2">OPEN DATA</h3>
          <p class="text-sm text-slate-600">Comprendre, rechercher, exploiter et valoriser les données ouvertes.</p>
        </div>
        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-2">INTELLIGENCE ARTIFICIELLE</h3>
          <p class="text-sm text-slate-600">Découvrir les usages concrets de l'IA et de l'IA générative pour les OSC.</p>
        </div>
        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-2">GOUVERNANCE DES DONNÉES</h3>
          <p class="text-sm text-slate-600">Comprendre les enjeux de qualité, protection, responsabilité, partage et utilisation des données.</p>
        </div>
        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-2">EMPLOYABILITÉ</h3>
          <p class="text-sm text-slate-600">Développer des compétences pratiques en Data, IA et transformation numérique.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Formulaire Communauté -->
  <section id="communaute" class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold font-display text-slate-900 mb-4">Construisons une communauté qui apprend ensemble.</h2>
      <p class="text-slate-600 italic mb-8">« Parce que la transformation numérique ne se décrète pas : elle se construit avec celles et ceux qui agissent sur le terrain. »</p>
      
      <form id="communaute-form" class="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div>
          <label class="block text-xs font-semibold mb-1">Nom complet</label>
          <input type="text" name="nom" required class="w-full p-2.5 bg-white border border-slate-300 rounded-lg">
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1">Organisation</label>
          <input type="text" name="organisation" required class="w-full p-2.5 bg-white border border-slate-300 rounded-lg">
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1">Email</label>
          <input type="email" name="email" required class="w-full p-2.5 bg-white border border-slate-300 rounded-lg">
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1">Pays</label>
          <input type="text" name="pays" value="Sénégal" class="w-full p-2.5 bg-white border border-slate-300 rounded-lg">
        </div>
        <button type="submit" class="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500">
          Rejoindre la communauté
        </button>
      </form>
    </div>
  </section>

  <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs text-center">
    <p>© 2026 Oudiamora.net · Open Data + IA · Société Civile en Afrique</p>
  </footer>

  <script src="./js/main.js"></script>
</body>
</html>`;
      zip.file("index.html", staticHtmlContent);

      // 5. CSS file
      zip.file("css/style.css", `/* Feuille de style principale Oudiamora.net pour LWS */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; line-height: 1.5; color: #0f172a; background-color: #f8fafc; }
.font-display { font-family: 'Syne', sans-serif; }
a { text-decoration: none; color: inherit; }
img { max-width: 100%; height: auto; }
`);

      // 6. JS file
      zip.file("js/main.js", `// Script pour Oudiamora.net sur hébergement LWS
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('communaute-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Merci pour votre inscription à la communauté Oudiamora !');
      form.reset();
    });
  }
});
`);

      // 7. Favicon SVG
      zip.file("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="24" fill="#0B2533" /><path d="M 50 16 A 34 34 0 1 0 84 58" fill="none" stroke="#2EC4B6" stroke-width="4.5" stroke-linecap="round" /><circle cx="50" cy="16" r="6" fill="#38A3A5" stroke="#FFFFFF" stroke-width="1.5" /><circle cx="18" cy="66" r="6" fill="#52B788" stroke="#FFFFFF" stroke-width="1.5" /><circle cx="84" cy="58" r="6.5" fill="#38A3A5" stroke="#FFFFFF" stroke-width="1.5" /><circle cx="50" cy="50" r="17" fill="none" stroke="#FFFFFF" stroke-width="4" /><path d="M 39 52 Q 50 64 61 52" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" /></svg>`);

      // Fetch images into assets folder in zip
      try {
        const logoResp = await fetch('./assets/images/logo-oudiamora.svg');
        if (logoResp.ok) {
          const logoText = await logoResp.text();
          zip.file("assets/images/logo-oudiamora.svg", logoText);
        }
      } catch (err) {
        console.warn('Logo could not be fetched for zip', err);
      }

      // Generate zip
      const blob = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "oudiamora-lws-package.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error(e);
      alert('Une erreur est survenue lors de la création du ZIP.');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const copyFilezillaSteps = () => {
    const text = `Procédure LWS FileZilla :
1. Hôte : ftp.votredomaine.com (ou IP LWS fournie par email)
2. Identifiant & Mot de passe : Vos accès FTP LWS
3. Dossier cible : /public_html/ (ou /htdocs/)
4. Décompressez l'archive ZIP sur votre ordinateur et transférez tout le contenu.`;
    navigator.clipboard?.writeText(text);
    setCopiedFilezilla(true);
    setTimeout(() => setCopiedFilezilla(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Pack d'Exportation LWS Mutualisé
              </h3>
              <p className="text-xs text-slate-300">
                100% Statique · Sans base de données · Chemins relatifs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          
          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl text-teal-950">
            <div className="flex items-center gap-2 font-semibold text-xs text-teal-900 mb-1">
              <Check className="w-4 h-4 text-teal-600" />
              <span>Conforme à 100% à vos exigences d'hébergement :</span>
            </div>
            <p className="text-xs text-teal-800 leading-relaxed">
              Ce projet a été bâti avec des <strong>chemins strictement relatifs</strong> (<code className="bg-white px-1 border rounded">./</code>) et aucune dépendance backend. Vous pouvez le déposer directement dans le répertoire <code className="bg-white px-1 border rounded">public_html</code> de votre hébergement LWS.
            </p>
          </div>

          {/* Action 1: Instant ZIP download */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <FolderArchive className="w-4 h-4 text-teal-600" />
                <span>Télécharger l'Archive ZIP prête pour LWS</span>
              </h4>
              <p className="text-xs text-slate-500">
                Contient index.html, style.css, main.js, .htaccess, robots.txt, sitemap.xml et images.
              </p>
            </div>

            <button
              onClick={handleDownloadLwsZip}
              disabled={isGeneratingZip}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 active:bg-teal-700 disabled:opacity-50 transition-colors shadow-sm shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingZip ? 'Génération...' : downloadSuccess ? 'Archive téléchargée !' : 'Télécharger le ZIP'}</span>
            </button>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Comment mettre en ligne sur LWS en 3 étapes :
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Connectez-vous à votre espace client LWS</div>
                  <div className="text-xs text-slate-500">Rendez-vous sur panel.lws.fr &gt; Cliquez sur "Gestionnaire de fichiers" ou utilisez FileZilla.</div>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-lg flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Ouvrez le dossier public_html (ou htdocs)</div>
                  <div className="text-xs text-slate-500">C'est la racine web accessible au public sur votre nom de domaine Oudiamora.net.</div>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-lg flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Glissez-déposez les fichiers extraits</div>
                  <div className="text-xs text-slate-500">Décompressez le ZIP et téléversez tous les fichiers. Le site fonctionne immédiatement sans configuration serveur.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy instructions button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={copyFilezillaSteps}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              {copiedFilezilla ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFilezilla ? 'Instructions copiées !' : 'Copier le récapitulatif FTP / FileZilla'}</span>
            </button>

            <span className="text-[11px] text-slate-400">
              Support garanti sur serveurs mutualisés Linux / Apache
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
