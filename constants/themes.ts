import { ImageSourcePropType } from "react-native";

export type Theme = {
  key:       string;
  stone:     ImageSourcePropType;
  bg:        string;
  cardBg:    string;
  accent:    string;
  title:     string;
  subtitle:  string;
  badge:     string;
  badgeText: string;
};

export const THEMES: Record<string, Theme> = {
  sport_fitness: {
    key: "sport_fitness", stone: require("@/assets/rockw.png"),
    bg: "#1a1410", cardBg: "#2d1f1a", accent: "#f59e0b",
    title: "#fef3c7", subtitle: "#fde68a", badge: "#1a1410", badgeText: "#fbbf24",
  },
  health: {
    key: "health", stone: require("@/assets/rockg.png"),
    bg: "#0d1f12", cardBg: "#1a3320", accent: "#4ade80",
    title: "#f0fdf4", subtitle: "#bbf7d0", badge: "#0d1f12", badgeText: "#86efac",
  },
  adventures: {
    key: "adventures", stone: require("@/assets/999.png"),
    bg: "#1a0d2e", cardBg: "#2d1b4e", accent: "#a78bfa",
    title: "#ffffff", subtitle: "#c4b5fd", badge: "#1a0d2e", badgeText: "#c4b5fd",
  },
  romance: {
    key: "romance", stone: require("@/assets/rockr1.png"),
    bg: "#1c0a14", cardBg: "#2d1520", accent: "#f43f5e",
    title: "#fff1f2", subtitle: "#fecdd3", badge: "#1c0a14", badgeText: "#fb7185",
  },
  culture_discovery: {
    key: "culture_discovery", stone: require("@/assets/rockp2.png"),
    bg: "#1a0a2e", cardBg: "#2d1b54", accent: "#c084fc",
    title: "#ffffff", subtitle: "#e9d5ff", badge: "#1a0a2e", badgeText: "#d8b4fe",
  },
  party_nightlife: {
    key: "party_nightlife", stone: require("@/assets/rockr.png"),
    bg: "#0a0a1f", cardBg: "#12124e", accent: "#818cf8",
    title: "#ffffff", subtitle: "#c7d2fe", badge: "#0a0a1f", badgeText: "#a5b4fc",
  },
  beach_water: {
    key: "beach_water", stone: require("@/assets/rockb3.png"),
    bg: "#082f3f", cardBg: "#0e4a5f", accent: "#22d3ee",
    title: "#ffffff", subtitle: "#a5f3fc", badge: "#082f3f", badgeText: "#67e8f9",
  },
  education_learning: {
    key: "education_learning", stone: require("@/assets/rockw1.png"),
    bg: "#0f172a", cardBg: "#1e293b", accent: "#38bdf8",
    title: "#f8fafc", subtitle: "#bae6fd", badge: "#0f172a", badgeText: "#7dd3fc",
  },
  relaxation_meditation: {
    key: "relaxation_meditation", stone: require("@/assets/rock4.png"),
    bg: "#0a1929", cardBg: "#1e3a5f", accent: "#60a5fa",
    title: "#ffffff", subtitle: "#bfdbfe", badge: "#0a1929", badgeText: "#93c5fd",
  },
  technology: {
    key: "technology", stone: require("@/assets/rockb2.png"),
    bg: "#050d1a", cardBg: "#0d1f3c", accent: "#06b6d4",
    title: "#e0f2fe", subtitle: "#7dd3fc", badge: "#050d1a", badgeText: "#38bdf8",
  },
  gaming: {
    key: "gaming", stone: require("@/assets/999.png"),
    bg: "#0d0d1a", cardBg: "#1a1a33", accent: "#7c3aed",
    title: "#ede9fe", subtitle: "#c4b5fd", badge: "#0d0d1a", badgeText: "#a78bfa",
  },
};

export const DEFAULT_THEME = THEMES.adventures;

export function getThemeFromKey(key: string): Theme {
  return THEMES[key] ?? DEFAULT_THEME;
}

export function getStoneFromKey(key: string): ImageSourcePropType {
  return THEMES[key]?.stone ?? DEFAULT_THEME.stone;
}