/**
 * Configuration centralisée pour Oudiamora.net
 * Facilement modifiable pour connecter vos services tiers et vos comptes.
 */

export const SITE_CONFIG = {
  name: "Oudiamora.net",
  tagline: "Open Data + IA",
  slogan: "Données. IA. Compétences. Impact.",
  description:
    "Renforcer les capacités des organisations de la société civile pour mieux comprendre, utiliser et gouverner les données et l'intelligence artificielle.",
  contactEmail: "contact@oudiamora.net",
  domain: "https://oudiamora.net",

  /**
   * POINT DE CONNEXION DU FORMULAIRE :
   * Pour envoyer les soumissions vers un service tiers sans backend :
   * - Formspree : "https://formspree.io/f/VOTRE_CODE"
   * - Google Forms : Insérez l'URL de votre Google Form ou Webhook Make/Zapier
   * - Laisser vide ("") pour activer le mode démo interactif avec simulation instantanée
   */
  formEndpoint: "", // ex: "https://formspree.io/f/mzblvypk" ou webhook Make

  // Réseaux sociaux (remplacez par vos URLs réelles)
  socialLinks: {
    linkedin: "https://linkedin.com/company/oudiamora-africa",
    facebook: "https://facebook.com/oudiamora.net",
    instagram: "https://instagram.com/oudiamora_net",
    twitter: "https://x.com/oudiamora_net",
    tiktok: "https://tiktok.com/@oudiamora_net",
  },

  // Pays francophones prioritaires pour le formulaire
  countries: [
    "Sénégal",
    "Côte d'Ivoire",
    "Bénin",
    "Togo",
    "Burkina Faso",
    "Mali",
    "Guinée",
    "Niger",
    "Cameroun",
    "République Démocratique du Congo (RDC)",
    "République du Congo",
    "Gabon",
    "Tchad",
    "Madagascar",
    "Rwanda",
    "Burundi",
    "Mauritanie",
    "Autre pays d'Afrique",
    "Autre pays (Diaspora / International)",
  ],

  // Domaines d'activité des OSC
  domains: [
    "Droits humains & Libertés fondamentales",
    "Gouvernance, Démocratie & Transparence",
    "Santé communautaire & Accès aux soins",
    "Éducation & Alphabétisation numérique",
    "Environnement, Climat & Agriculture durable",
    "Genre & Autonomisation des femmes",
    "Jeunesse, Emploi & Entrepreneuriat",
    "Média, Journalisme de données & Fact-checking",
    "Recherche & Politiques publiques",
    "Autre",
  ],

  // Centres d'intérêt
  interests: [
    "Open Data & Recherche de jeux de données",
    "Intelligence Artificielle générative (ChatGPT, Claude, etc.)",
    "Gouvernance et éthique des données",
    "Visualisation de données & Infographies",
    "Protection des données personnelles (RGPD/Lois locales)",
    "Automatisation des tâches de l'OSC",
    "Plaidoyer basé sur les données (Evidence-based)",
    "Formation d'équipe & Compétences numériques",
  ],
};
