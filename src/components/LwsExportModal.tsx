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
  
  <!-- OpenGraph -->
  <meta property="og:title" content="Oudiamora.net – Open Data, IA &amp; Société Civile">
  <meta property="og:description" content="Renforcer les capacités des organisations de la société civile pour mieux comprendre, utiliser et gouverner les données et l'intelligence artificielle.">
  <meta property="og:type" content="website">
  
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='24' fill='%230B2533'/%3E%3Cpath d='M 50 16 A 34 34 0 1 0 84 58' stroke='%232EC4B6' stroke-width='6' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='16' r='6' fill='%2338A3A5'/%3E%3Ccircle cx='18' cy='66' r='6' fill='%2352B788'/%3E%3Ccircle cx='84' cy='58' r='6' fill='%232EC4B6'/%3E%3Ccircle cx='50' cy='50' r='17' stroke='%23FFFFFF' stroke-width='5'/%3E%3Cpath d='M 39 52 Q 50 63 61 52' stroke='%23FFFFFF' stroke-width='4.5' stroke-linecap='round'/%3E%3C/svg%3E">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN (Permet au site de s'afficher parfaitement même en sous-répertoire LWS sans aucun fichier CSS externe requis) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            display: ['"Syne"', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    .font-display { font-family: 'Syne', sans-serif; }
    /* Protection stricte anti-débordement du logo */
    .brand-logo-svg { max-width: 220px !important; width: 100% !important; height: auto !important; display: block !important; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500/20 selection:text-teal-900 min-h-screen flex flex-col">

  <!-- Header Sticky -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo SVG vectoriel intégré et verrouillé en taille -->
        <a href="#hero" class="flex items-center focus:outline-none" style="max-width: 220px;">
          <svg class="brand-logo-svg" viewBox="0 0 520 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 220px; width: 100%; height: auto;">
            <g transform="translate(10, 8)">
              <path d="M 52 14 A 42 42 0 1 0 94 65" fill="none" stroke="#2EC4B6" stroke-width="5" stroke-linecap="round" />
              <circle cx="52" cy="14" r="7.5" fill="#38A3A5" stroke="#FFFFFF" stroke-width="2" />
              <circle cx="15" cy="74" r="7.5" fill="#52B788" stroke="#FFFFFF" stroke-width="2" />
              <circle cx="94" cy="65" r="8" fill="#13384A" stroke="#FFFFFF" stroke-width="2" />
              <circle cx="55" cy="52" r="21" fill="none" stroke="#0F3244" stroke-width="5.5" />
              <path d="M 41 55 Q 55 70 69 55" fill="none" stroke="#0F3244" stroke-width="5" stroke-linecap="round" />
            </g>
            <text x="125" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="44" font-weight="700" letter-spacing="-0.03em" fill="#0E3346">
              Oudiamora<tspan fill="#2EC4B6">.</tspan>net
            </text>
            <text x="128" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="500" letter-spacing="0.04em" fill="#5A6E7C">
              Open Data + IA
            </text>
          </svg>
        </a>

        <!-- Liens -->
        <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#hero" class="hover:text-teal-600 transition-colors">Accueil</a>
          <a href="#pourquoi" class="hover:text-teal-600 transition-colors">Pourquoi</a>
          <a href="#piliers" class="hover:text-teal-600 transition-colors">Piliers</a>
          <a href="#approche" class="hover:text-teal-600 transition-colors">Approche</a>
          <a href="#ressources" class="hover:text-teal-600 transition-colors">Ressources</a>
          <a href="#communaute" class="hover:text-teal-600 transition-colors">Communauté</a>
        </nav>

        <a href="#communaute" class="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-sm">
          <span>Rejoindre la communauté</span>
          <span>→</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-7">
          <div class="flex items-center gap-2 text-xs sm:text-sm font-medium text-teal-400 mb-4">
            <span>Open Data</span>
            <span>·</span>
            <span>Intelligence Artificielle</span>
            <span>·</span>
            <span>Compétences</span>
            <span>·</span>
            <span>Société Civile</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-tight mb-6">
            Données<span class="text-teal-400">.</span> IA<span class="text-teal-400">.</span> Compétences<span class="text-teal-400">.</span> Impact<span class="text-teal-400">.</span>
          </h1>

          <p class="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
            Renforcer les capacités des organisations de la société civile pour mieux comprendre, utiliser et gouverner les données et l'intelligence artificielle.
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <a href="#pourquoi" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/10">
              <span>Découvrir le projet</span>
              <span>↓</span>
            </a>
            <a href="#communaute" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors">
              <span>Rejoindre la communauté</span>
              <span>→</span>
            </a>
          </div>

          <div class="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
            <div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-white">100%</div>
              <div class="text-xs text-slate-400 mt-0.5">Contenus francophones</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-white">15+</div>
              <div class="text-xs text-slate-400 mt-0.5">Pays ciblés en Afrique</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-white">Libre</div>
              <div class="text-xs text-slate-400 mt-0.5">Ressources en libre accès</div>
            </div>
          </div>
        </div>

        <!-- Illustration Hero résiliente sans dépendance d'image -->
        <div class="lg:col-span-5">
          <div class="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative">
            <div class="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 flex flex-col items-center justify-center p-8 text-center">
              <svg viewBox="0 0 200 160" class="w-full h-auto max-h-48 text-teal-400 mb-4" fill="none">
                <path d="M 30 110 L 80 50 L 140 70 L 170 30 M 80 50 L 110 120 L 140 70 M 30 110 L 110 120" stroke="#2EC4B6" stroke-width="2" stroke-dasharray="3 3" opacity="0.6" />
                <circle cx="80" cy="50" r="10" fill="#0B2533" stroke="#2EC4B6" stroke-width="3" />
                <circle cx="140" cy="70" r="8" fill="#0B2533" stroke="#38A3A5" stroke-width="2.5" />
                <circle cx="110" cy="120" r="12" fill="#0B2533" stroke="#52B788" stroke-width="3.5" />
                <circle cx="30" cy="110" r="7" fill="#0B2533" stroke="#2EC4B6" stroke-width="2" />
                <circle cx="170" cy="30" r="6" fill="#0B2533" stroke="#52B788" stroke-width="2" />
                <circle cx="110" cy="120" r="4" fill="#2EC4B6" />
                <circle cx="80" cy="50" r="3.5" fill="#FFFFFF" />
              </svg>
              <div class="text-xs font-semibold text-teal-300 uppercase tracking-wider mb-1">Écosystème Oudiamora</div>
              <div class="text-sm font-bold text-white">Données souveraines &amp; Action citoyenne</div>
              <div class="text-[11px] text-slate-400 mt-1 max-w-xs">Gouvernance éthique, valorisation locale et inclusion des communautés d'Afrique francophone.</div>
            </div>
            <div class="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span class="text-teal-400 font-semibold">Société Civile 4.0</span>
              <span>Dakar · Abidjan · Cotonou · Bamako</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Section Pourquoi -->
  <section id="pourquoi" class="py-20 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <div class="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">01. Contexte &amp; Urgence</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 leading-tight">
          Les données et l'IA transforment déjà notre monde.
        </h2>
        <p class="mt-4 text-base sm:text-lg text-slate-600">
          Les données ouvertes et l'IA transforment le travail, les politiques publiques, les organisations, l'accès à l'information et la participation citoyenne.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">Le travail</h3>
          <p class="text-sm text-slate-600">Automatisation de la veille, analyse documentaire en temps record et émergence de profils data.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">Les politiques publiques</h3>
          <p class="text-sm text-slate-600">Décisions étayées par les indicateurs chiffrés et suivi citoyen des budgets municipaux.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">Les organisations</h3>
          <p class="text-sm text-slate-600">Modernisation des processus internes, fiabilisation des rapports et transparence envers les donateurs.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">L'accès à l'information</h3>
          <p class="text-sm text-slate-600">Transparence grâce aux portails ouverts et recul des asymétries d'information pour la société civile.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">La participation citoyenne</h3>
          <p class="text-sm text-slate-600">Mobilisation étayée par des données factuelles et plaidoyer constructif avec les décideurs.</p>
        </div>
        <div class="p-6 rounded-xl border border-teal-200 bg-teal-50/60 flex flex-col justify-between">
          <div>
            <div class="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">Urgence citoyenne</div>
            <h3 class="text-lg font-bold font-display text-slate-900 mb-2">Le pouvoir de la preuve</h3>
            <p class="text-sm text-slate-700">Sans données vérifiées, la voix citoyenne peine à se faire entendre dans les débats nationaux.</p>
          </div>
          <div class="mt-4 pt-3 border-t border-teal-200 text-xs font-semibold text-teal-900">Agir sur les compétences →</div>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800">
        <h3 class="text-2xl sm:text-3xl font-bold font-display leading-snug mb-3">
          Mais les OSC locales disposent encore de capacités limitées pour exploiter ces nouvelles opportunités.
        </h3>
        <p class="text-slate-300 text-base leading-relaxed">
          Le projet <strong>Oudiamora.net</strong> veut contribuer à réduire cette fracture en formant, en outillant et en fédérant les acteurs de terrain.
        </p>
      </div>
    </div>
  </section>

  <!-- Piliers -->
  <section id="piliers" class="py-20 bg-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <div class="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">02. Piliers d'Action</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 leading-tight">Nos 4 Piliers</h2>
        <p class="mt-4 text-base text-slate-600">Une approche intégrée pour agir concrètement sur le terrain.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-teal-700 uppercase block mb-1">01. Données</span>
          <h3 class="text-2xl font-bold font-display text-slate-900 mb-2">OPEN DATA</h3>
          <p class="text-sm text-slate-700 font-medium mb-3">Comprendre, rechercher, exploiter et valoriser les données ouvertes.</p>
          <p class="text-xs text-slate-500">Cartographie des portails de données en Afrique, nettoyage et structuration de données, plaidoyer étayé par des preuves statistiques.</p>
        </div>

        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-indigo-700 uppercase block mb-1">02. Intelligence Artificielle</span>
          <h3 class="text-2xl font-bold font-display text-slate-900 mb-2">INTELLIGENCE ARTIFICIELLE</h3>
          <p class="text-sm text-slate-700 font-medium mb-3">Découvrir les usages concrets de l'IA et de l'IA générative pour les OSC.</p>
          <p class="text-xs text-slate-500">Rédaction de notes conceptuelles et de rapports, synthèse documentaire, création de contenus multilingues et éthique algorithmique.</p>
        </div>

        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-purple-700 uppercase block mb-1">03. Droit &amp; Éthique</span>
          <h3 class="text-2xl font-bold font-display text-slate-900 mb-2">GOUVERNANCE DES DONNÉES</h3>
          <p class="text-sm text-slate-700 font-medium mb-3">Comprendre les enjeux de qualité, protection, responsabilité, partage et utilisation des données.</p>
          <p class="text-xs text-slate-500">Respect des cadres juridiques africains, protection de la vie privée des bénéficiaires et protocoles de confiance inter-associatifs.</p>
        </div>

        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-amber-700 uppercase block mb-1">04. Métiers &amp; Avenir</span>
          <h3 class="text-2xl font-bold font-display text-slate-900 mb-2">EMPLOYABILITÉ</h3>
          <p class="text-sm text-slate-700 font-medium mb-3">Développer des compétences pratiques en Data, IA et transformation numérique.</p>
          <p class="text-xs text-slate-500">Maîtrise des tableurs et logiciels de dataviz gratuits, compétences hybrides recherchées et valorisation des profils jeunes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Approche -->
  <section id="approche" class="py-20 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <div class="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">03. Méthode</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 leading-tight">Notre Approche</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <span class="text-xs font-bold text-teal-700 block mb-1">01. ÉTAPE</span>
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">APPRENDRE</h3>
          <p class="text-xs text-slate-600">Acquérir les fondamentaux en français sans jargon intimidant.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <span class="text-xs font-bold text-teal-700 block mb-1">02. ÉTAPE</span>
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">EXPÉRIMENTER</h3>
          <p class="text-xs text-slate-600">Manipuler des données concrètes et tester des outils simples.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <span class="text-xs font-bold text-teal-700 block mb-1">03. ÉTAPE</span>
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">APPLIQUER</h3>
          <p class="text-xs text-slate-600">Déployer les solutions dans les projets et rapports quotidiens.</p>
        </div>
        <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <span class="text-xs font-bold text-teal-700 block mb-1">04. ÉTAPE</span>
          <h3 class="text-lg font-bold font-display text-slate-900 mb-2">PARTAGER</h3>
          <p class="text-xs text-slate-600">Transmettre aux pairs et enrichir les biens communs numériques.</p>
        </div>
      </div>

      <div class="p-8 rounded-2xl bg-slate-900 text-white text-center">
        <blockquote class="text-lg sm:text-xl font-semibold font-display max-w-3xl mx-auto leading-relaxed">
          « Notre objectif n'est pas seulement de transmettre des connaissances, mais de permettre aux participants de les transformer en compétences et en actions concrètes. »
        </blockquote>
      </div>
    </div>
  </section>

  <!-- Pour les OSC locales -->
  <section class="py-20 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-10">
        <div class="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-2">04. Ancrage Local</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
          La transformation numérique doit aussi partir du terrain.
        </h2>
      </div>

      <div class="p-6 sm:p-8 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-4xl mb-12">
        <blockquote class="text-base sm:text-lg text-slate-200 italic">
          « Les OSC locales ne doivent pas seulement être utilisatrices des technologies. Elles doivent pouvoir comprendre les données, maîtriser les outils et participer aux décisions qui façonnent leur environnement numérique. »
        </blockquote>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
          <h3 class="text-sm font-bold font-display text-white mb-1.5">Approche locale</h3>
          <p class="text-xs text-slate-300">Ancrée dans les réalités associatives des pays francophones.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
          <h3 class="text-sm font-bold font-display text-white mb-1.5">Contenus francophones</h3>
          <p class="text-xs text-slate-300">100% en français pour éliminer la barrière linguistique.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
          <h3 class="text-sm font-bold font-display text-white mb-1.5">Cas d'usage africains</h3>
          <p class="text-xs text-slate-300">Exemples concrets : santé, budgets communaux et veille.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
          <h3 class="text-sm font-bold font-display text-white mb-1.5">Apprentissage pratique</h3>
          <p class="text-xs text-slate-300">Exercices concrets avec des outils gratuits ou abordables.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
          <h3 class="text-sm font-bold font-display text-white mb-1.5">Communauté d'entraide</h3>
          <p class="text-xs text-slate-300">Réseau solidaire entre pairs sans barrière financière.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Thématiques -->
  <section class="py-20 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-8">
        <div class="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">05. Thématiques</div>
        <h2 class="text-3xl sm:text-4xl font-bold font-display text-slate-900 leading-tight">Thématiques Clés</h2>
      </div>

      <div class="flex flex-wrap gap-2.5">
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Open Data</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Data Literacy</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">IA générative</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Gouvernance des données</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Protection des données</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Éthique de l'IA</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Data &amp; politiques publiques</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">OSINT</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Automatisation</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Visualisation des données</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Transformation numérique</span>
        <span class="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">Compétences numériques</span>
      </div>
    </div>
  </section>

  <!-- Ressources -->
  <section id="ressources" class="py-20 bg-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10">
        <div class="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">06. Ressources</div>
        <h2 class="text-3xl sm:text-4xl font-bold font-display text-slate-900 leading-tight">Ressources Pratiques</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-teal-700 uppercase block mb-1">Guides pratiques</span>
          <h3 class="text-base font-bold font-display text-slate-900 mb-2">Exploiter l'Open Data pour son plaidoyer</h3>
          <p class="text-xs text-slate-600">Méthodologie pour extraire des indicateurs chiffrés vérifiés et structurer une campagne de plaidoyer citoyen.</p>
        </div>

        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-indigo-700 uppercase block mb-1">Tutoriels</span>
          <h3 class="text-base font-bold font-display text-slate-900 mb-2">Prompts IA pour notes conceptuelles</h3>
          <p class="text-xs text-slate-600">Bibliothèque de requêtes francophones pour formaliser un cadre logique et accélérer la rédaction de projets.</p>
        </div>

        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-blue-700 uppercase block mb-1">Jeux de données</span>
          <h3 class="text-base font-bold font-display text-slate-900 mb-2">Annuaire des portails d'Afrique de l'Ouest</h3>
          <p class="text-xs text-slate-600">Répertoire de plus de 45 sources officielles ouvertes (instituts de statistiques, ministères et agences).</p>
        </div>

        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-amber-700 uppercase block mb-1">Outils numériques</span>
          <h3 class="text-base font-bold font-display text-slate-900 mb-2">10 logiciels no-code gratuits</h3>
          <p class="text-xs text-slate-600">Sélection commentée de solutions gratuites pour créer des graphiques et cartes percutantes sans abonnement.</p>
        </div>

        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-emerald-700 uppercase block mb-1">Études de cas</span>
          <h3 class="text-base font-bold font-display text-slate-900 mb-2">Cartographie citoyenne de la santé</h3>
          <p class="text-xs text-slate-600">Retour d'expérience documenté sur la cartographie participative des centres de santé en zone périurbaine.</p>
        </div>

        <div class="p-6 bg-white rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-purple-700 uppercase block mb-1">Webinaires</span>
          <h3 class="text-base font-bold font-display text-slate-900 mb-2">Protection des données bénéficiaires</h3>
          <p class="text-xs text-slate-600">Replay vidéo et fiches pratiques sur la sécurité numérique fondamentale des organisations de terrain.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Communauté -->
  <section id="communaute" class="py-20 bg-white border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-3xl sm:text-4xl font-bold font-display text-slate-900 mb-3">Construisons une communauté qui apprend ensemble.</h2>
        <p class="text-sm text-slate-600 italic">« Parce que la transformation numérique ne se décrète pas : elle se construit avec celles et ceux qui agissent sur le terrain. »</p>
      </div>

      <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200">
        <form id="standalone-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nom complet *</label>
              <input type="text" name="nom" required class="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Ex: Fatou Diop">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Organisation *</label>
              <input type="text" name="organisation" required class="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Ex: Réseau Citoyen Sahel">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Email professionnel *</label>
              <input type="email" name="email" required class="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="contact@association.org">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pays *</label>
              <select name="pays" class="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="Sénégal">Sénégal</option>
                <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                <option value="Bénin">Bénin</option>
                <option value="Togo">Togo</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Mali">Mali</option>
                <option value="Guinée">Guinée</option>
                <option value="Niger">Niger</option>
                <option value="Cameroun">Cameroun</option>
                <option value="RDC">RDC</option>
                <option value="Autre">Autre pays</option>
              </select>
            </div>
          </div>

          <button type="submit" class="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-md">
            Rejoindre la communauté
          </button>
        </form>

        <div id="standalone-success" class="hidden text-center py-6">
          <div class="text-teal-600 text-3xl font-bold mb-2">✓</div>
          <h3 class="text-xl font-bold font-display text-slate-900 mb-1">Inscription confirmée !</h3>
          <p class="text-xs text-slate-600">Merci de votre engagement. Vous recevrez nos invitations par e-mail.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Ambition -->
  <section class="py-20 bg-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <div class="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">08. Vision</div>
        <h2 class="text-3xl sm:text-4xl font-bold font-display text-slate-900 leading-tight">
          Une société civile capable d'agir dans l'économie des données et de l'IA.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-1">OSC PLUS AUTONOMES</h3>
          <p class="text-xs font-semibold text-teal-700 uppercase mb-2">Mieux utiliser les données et les technologies</p>
          <p class="text-xs text-slate-600">Autonomie dans la collecte et le traitement sans dépendre continuellement de financements d'audits externes.</p>
        </div>

        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-1">PROFESSIONNELS MIEUX PRÉPARÉS</h3>
          <p class="text-xs font-semibold text-indigo-700 uppercase mb-2">Développer des compétences adaptées aux nouveaux métiers</p>
          <p class="text-xs text-slate-600">Compétences hybrides en data literacy, gestion de projets numériques et utilisation critique de l'IA.</p>
        </div>

        <div class="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold font-display text-slate-900 mb-1">CITOYENS MIEUX INFORMÉS</h3>
          <p class="text-xs font-semibold text-purple-700 uppercase mb-2">Comprendre les enjeux liés aux données et à l'intelligence artificielle</p>
          <p class="text-xs text-slate-600">Compréhension des algorithmes, protection des libertés numériques et participation active aux débats de société.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Final -->
  <section class="py-20 bg-slate-950 text-white text-center">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-extrabold font-display leading-tight mb-4">
        Vous êtes une OSC, un professionnel ou un acteur engagé ?
      </h2>
      <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
        Rejoignez une communauté qui veut rendre les données et l'IA plus accessibles.
      </p>
      <a href="#communaute" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-xl text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-lg">
        Rejoindre la communauté
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <svg class="brand-logo-svg mb-3" viewBox="0 0 520 120" fill="none" style="max-width: 180px; width: 100%; height: auto;">
            <g transform="translate(10, 8)">
              <path d="M 52 14 A 42 42 0 1 0 94 65" fill="none" stroke="#2EC4B6" stroke-width="5" stroke-linecap="round" />
              <circle cx="52" cy="14" r="7.5" fill="#38A3A5" />
              <circle cx="15" cy="74" r="7.5" fill="#52B788" />
              <circle cx="94" cy="65" r="8" fill="#2EC4B6" />
              <circle cx="55" cy="52" r="21" fill="none" stroke="#FFFFFF" stroke-width="5.5" />
              <path d="M 41 55 Q 55 70 69 55" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" />
            </g>
            <text x="125" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="44" font-weight="700" fill="#FFFFFF">
              Oudiamora<tspan fill="#2EC4B6">.</tspan>net
            </text>
            <text x="128" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="500" fill="#94A3B8">
              Open Data + IA
            </text>
          </svg>
          <p class="text-slate-400 leading-relaxed">Open Data + IA + Compétences + Société civile en Afrique francophone.</p>
        </div>

        <div>
          <h4 class="font-semibold uppercase text-slate-200 mb-2">Navigation</h4>
          <ul class="space-y-1">
            <li><a href="#hero" class="hover:text-teal-400">Accueil</a></li>
            <li><a href="#pourquoi" class="hover:text-teal-400">Pourquoi ce projet ?</a></li>
            <li><a href="#piliers" class="hover:text-teal-400">Nos 4 piliers</a></li>
            <li><a href="#approche" class="hover:text-teal-400">Notre approche</a></li>
            <li><a href="#ressources" class="hover:text-teal-400">Ressources</a></li>
            <li><a href="#communaute" class="hover:text-teal-400">Communauté</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold uppercase text-slate-200 mb-2">Réseaux Sociaux</h4>
          <ul class="space-y-1">
            <li><a href="https://linkedin.com/company/oudiamora-africa" target="_blank" rel="noopener" class="hover:text-teal-400">LinkedIn</a></li>
            <li><a href="https://facebook.com/oudiamora.net" target="_blank" rel="noopener" class="hover:text-teal-400">Facebook</a></li>
            <li><a href="https://instagram.com/oudiamora_net" target="_blank" rel="noopener" class="hover:text-teal-400">Instagram</a></li>
            <li><a href="https://x.com/oudiamora_net" target="_blank" rel="noopener" class="hover:text-teal-400">X (Twitter)</a></li>
            <li><a href="https://tiktok.com/@oudiamora_net" target="_blank" rel="noopener" class="hover:text-teal-400">TikTok</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold uppercase text-slate-200 mb-2">Contact</h4>
          <p class="text-slate-400 mb-1">contact@oudiamora.net</p>
          <p class="text-slate-400">Hébergement 100% statique prêt pour LWS mutualisé.</p>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-800 text-center text-slate-500">
        © 2026 Oudiamora.net · Tous droits réservés.
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var form = document.getElementById('standalone-form');
      var success = document.getElementById('standalone-success');
      if (form && success) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          form.classList.add('hidden');
          success.classList.remove('hidden');
        });
      }
    });
  </script>
</body>
</html>
`;
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

          {/* Important note for subdirectories */}
          <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-xl text-amber-950 text-xs space-y-1.5">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <span>💡 Hébergement en sous-répertoire (ex: /oudiamora/)</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Cette nouvelle version de l'archive ZIP intègre directement tous les styles Tailwind et l'emblème vectoriel en mode <strong>100% autonome</strong>. Vous pouvez déposer le fichier <code className="bg-white px-1 border rounded">index.html</code> directement dans votre sous-dossier, l'affichage sera instantanément soigné et le logo verrouillé à sa taille normale, sans aucun risque de déformation ni de feuille de style manquante.
            </p>
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
