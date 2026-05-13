import { ImageSourcePropType } from "react-native";

export type Theme = {
  key: string;
  stone: ImageSourcePropType;
  bg: string;          // fond global
  cardBg: string;      // fond des cartes de tâches
  accent: string;      // numéros, badges, contours
  title: string;       // couleur du titre principal
  subtitle: string;    // couleur des sous-titres
  badge: string;       // fond des petites infos (date, durée…)
  badgeText: string;   // texte des badges
  keywords: string[];
};

// ─── Catalogue des thèmes ──────────────────────────────────────────
export const THEMES: Record<string, Theme> = {
  sport: {
    key: "sport",
    stone: require("@/assets/rockb2.png"),   // pietersite cœur orange/bleu — énergie
    bg: "#1a1410",
    cardBg: "#2d1f1a",
    accent: "#f59e0b",
    title: "#fef3c7",
    subtitle: "#fde68a",
    badge: "#1a1410",
    badgeText: "#fbbf24",
    keywords: ["sport", "fitness", "running", "cycling", "football", "gym", "workout", "cardio", "tennis", "energique", "actif", "active", "marche", "natation", "swim"],
  },
  music: {
    key: "music",
    stone: require("@/assets/rockb3.png"),    // opale arc-en-ciel — vibration
    bg: "#0a1f1c",
    cardBg: "#134e4a",
    accent: "#2dd4bf",
    title: "#ffffff",
    subtitle: "#5eead4",
    badge: "#0a1f1c",
    badgeText: "#5eead4",
    keywords: ["music", "musique", "concert", "festival", "party", "fete", "dance", "danse", "club", "ambiance"],
  },
  amour: {
    key: "amour",
    stone: require("@/assets/rockr.png"),    // cristal clair avec papillon doré — douceur
    bg: "#1c1410",
    cardBg: "#2d2519",
    accent: "#fbbf24",
    title: "#fef3c7",
    subtitle: "#fde68a",
    badge: "#1c1410",
    badgeText: "#fcd34d",
    keywords: ["amour", "romance", "romantic", "romantique", "couple", "love", "lover", "date", "saint valentin"],
  },
  decouverte: {
    key: "decouverte",
    stone: require("@/assets/999.png"), // améthyste avec silhouette qui marche — aventure
    bg: "#1a0d2e",
    cardBg: "#2d1b4e",
    accent: "#a78bfa",
    title: "#ffffff",
    subtitle: "#c4b5fd",
    badge: "#1a0d2e",
    badgeText: "#c4b5fd",
    keywords: ["adventure", "aventure", "hiking", "randonnee", "trekking", "discovery", "decouverte", "exploration", "mountain", "montagne", "camping", "explore", "voyage"],
  },
  chill: {
    key: "chill",
    stone: require("@/assets/rock3.png"), // labradorite bleue — calme
    bg: "#0a1929",
    cardBg: "#1e3a5f",
    accent: "#60a5fa",
    title: "#ffffff",
    subtitle: "#bfdbfe",
    badge: "#0a1929",
    badgeText: "#93c5fd",
    keywords: ["relax", "chill", "calm", "calme", "peaceful", "spa", "detente", "reposer", "tranquille", "lecture", "reading"],
  },
  mystic: {
    key: "mystic",
    stone: require("@/assets/rockp2.png"), // améthyste lune — spiritualité
    bg: "#1a0a2e",
    cardBg: "#2d1b54",
    accent: "#c084fc",
    title: "#ffffff",
    subtitle: "#e9d5ff",
    badge: "#1a0a2e",
    badgeText: "#d8b4fe",
    keywords: ["yoga", "meditation", "meditate", "spiritual", "spirituel", "zen", "mindful", "mindfulness", "nuit", "night"],
  },
  nature: {
    key: "nature",
    stone: require("@/assets/rockw1.png"),   // pierre corallienne orange/turquoise — terre
    bg: "#0c1f1a",
    cardBg: "#1a3329",
    accent: "#fb923c",
    title: "#ffffff",
    subtitle: "#fed7aa",
    badge: "#0c1f1a",
    badgeText: "#fdba74",
    keywords: ["nature", "forest", "foret", "garden", "jardin", "parc", "park", "tree", "arbre", "campagne"],
  },
  water: {
    key: "water",
    stone: require("@/assets/rockb.png"),    // opale fissurée bleue — océan
    bg: "#082f3f",
    cardBg: "#0e4a5f",
    accent: "#22d3ee",
    title: "#ffffff",
    subtitle: "#a5f3fc",
    badge: "#082f3f",
    badgeText: "#67e8f9",
    keywords: ["beach", "plage", "piscine", "mer", "sea", "ocean", "water", "eau", "diving", "plongee"],
  },
};

// Thème par défaut si aucun mot-clé ne matche
const DEFAULT_THEME = THEMES.decouverte;

// ─── Fonction de détection du thème ────────────────────────────────
export function getTheme(input: Record<string, any>): Theme {
  // Concatène toutes les valeurs textuelles en minuscules
  const text = Object.values(input)
    .filter((v): v is string => typeof v === "string")
    .join(" ")
    .toLowerCase();

  // Cherche le premier thème dont un mot-clé est présent
  for (const theme of Object.values(THEMES)) {
    if (theme.keywords.some((kw) => text.includes(kw))) {
      return theme;
    }
  }
  return DEFAULT_THEME;
}