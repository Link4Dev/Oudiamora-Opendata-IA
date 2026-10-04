export interface Pillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  icon: string;
  accentColor: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Guides' | 'Tutoriels' | 'Jeux de données' | 'Outils' | 'Études de cas' | 'Webinaires';
  typeLabel: string;
  description: string;
  durationOrPages: string;
  level: 'Débutant' | 'Intermédiaire' | 'Tous niveaux';
  tags: string[];
  badge?: string;
  linkText: string;
  linkUrl: string;
}

export interface Thematic {
  name: string;
  description: string;
  tagCategory: 'data' | 'ai' | 'governance' | 'skills';
}

export const PILLARS: Pillar[] = [
  {
    id: "open-data",
    title: "OPEN DATA",
    tagline: "Données ouvertes & Biens communs",
    description: "Comprendre, rechercher, exploiter et valoriser les données ouvertes.",
    points: [
      "Cartographie des portails de données ouvertes en Afrique",
      "Nettoyage, fiabilisation et structuration de jeux de données",
      "Plaidoyer étayé par des preuves statistiques (Evidence-based Advocacy)",
      "Publication responsable et respectueuse des standards ouverts",
    ],
    icon: "Database",
    accentColor: "from-teal-500/10 to-emerald-500/10 border-teal-500/30 text-teal-600",
  },
  {
    id: "ia",
    title: "INTELLIGENCE ARTIFICIELLE",
    tagline: "IA & IA Générative pour l'action citoyenne",
    description: "Découvrir les usages concrets de l'IA et de l'IA générative pour les OSC.",
    points: [
      "Rédaction accélérée de rapports d'activité et demandes de subvention",
      "Analyse sémantique et synthèse de documents volumineux",
      "Génération de contenus multilingues et accessibles aux communautés",
      "Sensibilisation critique aux biais algorithmiques et limites des modèles",
    ],
    icon: "Cpu",
    accentColor: "from-indigo-500/10 to-blue-500/10 border-indigo-500/30 text-indigo-600",
  },
  {
    id: "gouvernance",
    title: "GOUVERNANCE DES DONNÉES",
    tagline: "Éthique, protection et responsabilité",
    description: "Comprendre les enjeux de qualité, protection, responsabilité, partage et utilisation des données.",
    points: [
      "Conformité avec les législations africaines sur les données à caractère personnel",
      "Sécurisation des données sensibles de bénéficiaires et militants",
      "Pactes de confiance et protocoles de partage éthique inter-organisations",
      "Participation éclairée aux consultations publiques nationales et régionales",
    ],
    icon: "ShieldCheck",
    accentColor: "from-violet-500/10 to-purple-500/10 border-violet-500/30 text-violet-600",
  },
  {
    id: "employabilite",
    title: "EMPLOYABILITÉ",
    tagline: "Compétences numériques pérennes",
    description: "Développer des compétences pratiques en Data, IA et transformation numérique.",
    points: [
      "Parcours certifiants adaptés aux réalités opérationnelles des OSC",
      "Maîtrise des tableurs avancés, outils no-code et dashboards visuels",
      "Valorisation des profils de jeunes professionnels dans l'écosystème",
      "Réseau panafricain de mentorat et d'opportunités professionnelles",
    ],
    icon: "TrendingUp",
    accentColor: "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-600",
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "APPRENDRE",
    subtitle: "Acquisition des fondamentaux",
    description: "Des modules clairs, contextualisés en français, pour démystifier la data, l'IA et leurs règles juridiques sans jargon intimidant.",
    deliverable: "Concepts clés & Kits d'auto-formation",
  },
  {
    number: "02",
    title: "EXPÉRIMENTER",
    subtitle: "Pratique guidée en ateliers",
    description: "Manipulation directe d'outils simples et souverains sur des cas concrets de terrain issus du quotidien des associations locales.",
    deliverable: "Exercices pratiques & Prompts réutilisables",
  },
  {
    number: "03",
    title: "APPLIQUER",
    subtitle: "Déploiement dans vos projets",
    description: "Intégration opérationnelle dans les rapports, les campagnes de plaidoyer, les suivis de projets et la gestion quotidienne de votre organisation.",
    deliverable: "Feuille de route & Outils déployés",
  },
  {
    number: "04",
    title: "PARTAGER",
    subtitle: "Transmission & Rayonnement",
    description: "Restitution des apprentissages auprès des pairs, co-construction de guides libres et valorisation des succès régionaux.",
    deliverable: "Ressources libres & Communauté active",
  },
];

export const LOCAL_CSO_ELEMENTS = [
  {
    id: "local",
    title: "Approche locale",
    summary: "Ancrage profond dans les réalités associatives des villes et territoires d'Afrique.",
    desc: "Les solutions ne sont pas importées hors-sol : elles répondent aux contraintes de connectivité, d'équipements et de budgets locaux.",
    icon: "MapPin",
  },
  {
    id: "french",
    title: "Contenus francophones",
    summary: "100% de nos ressources, glossaires et formations pensés en français.",
    desc: "Combler le déficit historique de ressources de pointe en français sur l'Open Data et l'IA pour éliminer la barrière linguistique.",
    icon: "Languages",
  },
  {
    id: "usecases",
    title: "Cas d'usage africains",
    summary: "Exemples réels issus du Mali, du Sénégal, de Côte d'Ivoire, du Bénin, etc.",
    desc: "Études de cas concrètes : surveillance des budgets municipaux, santé communautaire, cartographie citoyenne et veille foncière.",
    icon: "Briefcase",
  },
  {
    id: "practice",
    title: "Apprentissage pratique",
    summary: "Focalisé sur l'action immédiate plutôt que la théorie abstraite.",
    desc: "Des tutoriels pas-à-pas réalisables en 30 minutes avec des outils gratuits ou abordables accessibles sur tout ordinateur.",
    icon: "CheckCircle2",
  },
  {
    id: "community",
    title: "Communauté d'entraide",
    summary: "Un réseau solidaire de pairs, mentors et praticiens bénévoles.",
    desc: "Un canal d'échange continu où poser ses questions, partager des offres, collaborer sur des jeux de données et s'entraider.",
    icon: "Users",
  },
];

export const THEMATICS: Thematic[] = [
  { name: "Open Data", description: "Collecte, standards et valorisation des données ouvertes gouvernementales et citoyennes.", tagCategory: "data" },
  { name: "Data Literacy", description: "Alphabétisation numérique pour comprendre, critiquer et interpréter les chiffres.", tagCategory: "skills" },
  { name: "IA générative", description: "Usages pragmatiques des LLMs (rédaction, synthèse, traduction et automatisation).", tagCategory: "ai" },
  { name: "Gouvernance des données", description: "Cadres institutionnels, souveraineté numérique et règles de gestion pérenne.", tagCategory: "governance" },
  { name: "Protection des données", description: "Respect de la vie privée, anonymisation et protection des bénéficiaires vulnérables.", tagCategory: "governance" },
  { name: "Éthique de l'IA", description: "Détection des biais, transparence algorithmique et responsabilité sociale.", tagCategory: "ai" },
  { name: "Data & politiques publiques", description: "Suivi budgétaire, contrôle citoyen de l'action publique et plaidoyer documenté.", tagCategory: "data" },
  { name: "OSINT", description: "Recherche et vérification d'informations d'intérêt public à partir de sources ouvertes.", tagCategory: "data" },
  { name: "Automatisation", description: "Workflows no-code pour libérer du temps sur les tâches administratives répétitives.", tagCategory: "skills" },
  { name: "Visualisation des données", description: "Création de graphiques, cartes interactives et infographies impactantes.", tagCategory: "data" },
  { name: "Transformation numérique", description: "Accompagnement méthodologique de la transition numérique des équipes associatives.", tagCategory: "skills" },
  { name: "Compétences numériques", description: "Parcours de montée en compétences pour l'employabilité des jeunes engagés.", tagCategory: "skills" },
];

export const SAMPLE_RESOURCES: ResourceItem[] = [
  {
    id: "guide-open-data-cso",
    title: "Guide pratique : Exploiter l'Open Data pour son plaidoyer associatif",
    category: "Guides",
    typeLabel: "Guide PDF & Fiche outil",
    description: "Méthode pas-à-pas pour identifier les portails nationaux, extraire des données fiables et construire un argumentaire percutant.",
    durationOrPages: "32 pages",
    level: "Débutant",
    tags: ["Open Data", "Plaidoyer", "Méthode"],
    badge: "Recommandé",
    linkText: "Consulter la fiche",
    linkUrl: "#",
  },
  {
    id: "tuto-chatgpt-subvention",
    title: "Tutoriel : Utiliser l'IA générative pour rédiger des notes conceptuelles",
    category: "Tutoriels",
    typeLabel: "Tutoriel interactif",
    description: "Bibliothèque de prompts francophones testés pour structurer un cadre logique, formuler des indicateurs et synthétiser un budget.",
    durationOrPages: "15 min de lecture",
    level: "Tous niveaux",
    tags: ["IA générative", "Financements", "Productivité"],
    linkText: "Voir les prompts",
    linkUrl: "#",
  },
  {
    id: "dataset-education-sahel",
    title: "Répertoire : Annuaire des portails de données ouvertes d'Afrique de l'Ouest",
    category: "Jeux de données",
    typeLabel: "Catalogue de données",
    description: "Plus de 45 sources officielles vérifiées (statistiques nationales, santé, éducation, marchés publics et climat) prêtes à l'emploi.",
    durationOrPages: "45 sources référencées",
    level: "Tous niveaux",
    tags: ["Open Data", "Afrique", "Portails"],
    badge: "Essentiel",
    linkText: "Explorer le catalogue",
    linkUrl: "#",
  },
  {
    id: "outils-visualisation-gratuits",
    title: "Boîte à outils : 10 logiciels gratuits pour visualiser vos données d'enquête",
    category: "Outils",
    typeLabel: "Boîte à outils",
    description: "Comparatif des solutions no-code (Datawrapper, RAWGraphs, Flourish, KoboToolbox) sans nécessiter de serveur ni d'abonnement coûteux.",
    durationOrPages: "Fiches comparatives",
    level: "Débutant",
    tags: ["Visualisation", "No-Code", "Enquêtes"],
    linkText: "Découvrir la sélection",
    linkUrl: "#",
  },
  {
    id: "etude-cas-sante-civile",
    title: "Étude de cas : Comment une OSC dakaroise a cartographié l'accès aux soins",
    category: "Études de cas",
    typeLabel: "Retour d'expérience",
    description: "Analyse détaillée d'une initiative citoyenne ayant croisé données ministérielles et retours de quartier pour appuyer un dialogue avec les élus.",
    durationOrPages: "18 pages illustrées",
    level: "Intermédiaire",
    tags: ["Santé", "Cartographie", "Impact local"],
    linkText: "Lire l'étude de cas",
    linkUrl: "#",
  },
  {
    id: "webinaire-protection-donnees",
    title: "Webinaire : Protection des données des bénéficiaires et cybersécurité de base",
    category: "Webinaires",
    typeLabel: "Replay vidéo & Kit support",
    description: "Session animée avec des juristes et praticiens de la société civile sur les bonnes pratiques de conservation et de chiffrement.",
    durationOrPages: "55 minutes",
    level: "Tous niveaux",
    tags: ["Gouvernance", "Sécurité", "Webinaire"],
    badge: "Replay disponible",
    linkText: "Regarder le replay",
    linkUrl: "#",
  },
];

export const AMBITION_BLOCKS = [
  {
    id: "osc",
    title: "OSC PLUS AUTONOMES",
    summary: "Mieux utiliser les données et les technologies.",
    description: "Donner aux équipes associatives la capacité de collecter, analyser et valoriser leurs propres données sans dépendre perpétuellement d'audits externes coûteux.",
    icon: "ShieldAlert",
    metric: "Autonomie d'action",
  },
  {
    id: "pros",
    title: "PROFESSIONNELS MIEUX PRÉPARÉS",
    summary: "Développer des compétences adaptées aux nouveaux métiers.",
    description: "Préparer la jeunesse et les animateurs associatifs aux compétences hybrides les plus recherchées : data literacy, pilotage d'outils d'IA et gestion de projets numériques.",
    icon: "Award",
    metric: "Employabilité pérenne",
  },
  {
    id: "citizens",
    title: "CITOYENS MIEUX INFORMÉS",
    summary: "Comprendre les enjeux liés aux données et à l'intelligence artificielle.",
    description: "Permettre aux communautés de questionner les algorithmes, de défendre leurs droits numériques et de participer activement aux débats de société.",
    icon: "Vote",
    metric: "Démocratie participative",
  },
];
