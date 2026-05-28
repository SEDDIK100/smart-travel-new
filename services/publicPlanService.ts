// ═══════════════════════════════════════════════════════════════
// Venus Smart Travel — Écriture public_plans enrichi
// À intégrer dans PlanRes.tsx et ActivityRes.tsx
// ═══════════════════════════════════════════════════════════════

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserProfile {
  uid:             string;
  age:             number;
  ageGroup:        string;
  gender:          string;
  nationality:     string;
  language:        string;
  interests:       string[];
  travelStyle:     string;
  preferredBudget: string;
  isPremium:       boolean;
  residenceCountry:string;
}

interface TripChoices {
  destination:  string;
  country:      string;
  continent:    string;
  mood:         string;
  budget:       string;
  durationDays: number;
  travelStyle:  string;
  interests:    string[];
  numTasks:     number;
}

interface ActivityChoices {
  activityTheme: string;
  priority:      string;
  rhythm:        string;
  durationHours: number;
  interests:     string[];
  numTasks:      number;
}

// ─── Helper : données d'engagement ────────────────────────────────────────────

const getEngagementData = () => {
  const now       = new Date();
  const days      = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months    = ["January","February","March","April","May","June",
                     "July","August","September","October","November","December"];
  return {
    device:           "ios" as const,  // ou "android" selon Platform.OS
    hourOfDay:        now.getHours(),
    dayOfWeek:        days[now.getDay()],
    month:            months[now.getMonth()],
    year:             now.getFullYear(),
    timeToComplete:   null,
    regenerated:      false,
    sharedWithFriend: false,
  };
};

// ─── Écriture plan VOYAGE ─────────────────────────────────────────────────────

export const savePublicTripPlan = async (
  user:    UserProfile,
  choices: TripChoices,
) => {
  const countryMap: Record<string, string> = {
    "France":"Europe","Italie":"Europe","Espagne":"Europe",
    "EAU":"Asie","Japon":"Asie","USA":"Amérique",
    "Maroc":"Afrique","Tunisie":"Afrique","Égypte":"Afrique",
  };

  await addDoc(collection(db, "public_plans"), {
    // ── Identifiant & type ───────────────────────────────────────────────────
    sessionId: crypto.randomUUID(),
    planType:  "trip",
    theme:     choices.destination.split(",")[0],
    status:    "active",
    createdAt: serverTimestamp(),
    completedAt: null,

    // ══ BLOC 1 : Choix de génération ════════════════════════════════════════
    choices: {
      destination:  choices.destination,
      country:      choices.country,
      continent:    countryMap[choices.country] ?? "Autre",
      mood:         choices.mood,
      budget:       choices.budget,
      durationDays: choices.durationDays,
      travelStyle:  choices.travelStyle,
      interests:    choices.interests,
      numTasks:     choices.numTasks,
    },

    // ══ BLOC 2 : Résultats (initiaux) ═══════════════════════════════════════
    results: {
      completionRate: 0,
      overallRating:  0,
      numTasksDone:   0,
      numTasksTotal:  choices.numTasks,
    },

    // ══ BLOC 3 : Profil utilisateur anonymisé ═══════════════════════════════
    userProfile: {
      ageGroup:        user.ageGroup,
      age:             user.age,
      gender:          user.gender,
      nationality:     user.nationality,
      language:        user.language,
      interests:       user.interests,
      travelStyle:     user.travelStyle,
      preferredBudget: user.preferredBudget,
      isPremium:       user.isPremium,
      residenceCountry:user.residenceCountry,
    },

    // ══ BLOC 4 : Engagement ═════════════════════════════════════════════════
    engagement: getEngagementData(),
  });
};

// ─── Écriture plan ACTIVITÉ ───────────────────────────────────────────────────

export const savePublicActivityPlan = async (
  user:    UserProfile,
  choices: ActivityChoices,
) => {
  await addDoc(collection(db, "public_plans"), {
    sessionId:   crypto.randomUUID(),
    planType:    "activity",
    theme:       choices.activityTheme,
    status:      "active",
    createdAt:   serverTimestamp(),
    completedAt: null,

    // ══ BLOC 1 : Choix de génération ════════════════════════════════════════
    choices: {
      activityTheme: choices.activityTheme,
      priority:      choices.priority,
      rhythm:        choices.rhythm,
      durationHours: choices.durationHours,
      interests:     choices.interests,
      numTasks:      choices.numTasks,
    },

    // ══ BLOC 2 : Résultats (initiaux) ═══════════════════════════════════════
    results: {
      completionRate: 0,
      overallRating:  0,
      numTasksDone:   0,
      numTasksTotal:  choices.numTasks,
    },

    // ══ BLOC 3 : Profil utilisateur anonymisé ═══════════════════════════════
    userProfile: {
      ageGroup:        user.ageGroup,
      age:             user.age,
      gender:          user.gender,
      nationality:     user.nationality,
      language:        user.language,
      interests:       user.interests,
      travelStyle:     user.travelStyle,
      preferredBudget: user.preferredBudget,
      isPremium:       user.isPremium,
      residenceCountry:user.residenceCountry,
    },

    // ══ BLOC 4 : Engagement ═════════════════════════════════════════════════
    engagement: getEngagementData(),
  });
};

// ─── Mise à jour à la complétion du plan ─────────────────────────────────────

export const completePublicPlan = async (
  publicPlanId:   string,
  completionRate: number,
  overallRating:  number,
  numTasksDone:   number,
  timeToComplete: number,   // nb de jours
) => {
  const { doc, updateDoc } = await import("firebase/firestore");
  await updateDoc(doc(db, "public_plans", publicPlanId), {
    status:             "completed",
    completedAt:        serverTimestamp(),
    "results.completionRate": completionRate,
    "results.overallRating":  overallRating,
    "results.numTasksDone":   numTasksDone,
    "engagement.timeToComplete": timeToComplete,
  });
};