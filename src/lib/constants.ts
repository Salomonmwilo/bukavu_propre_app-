import type {
  NiveauRisque,
  Quartier,
  Signalement,
  StatutSignalement,
  TypeDechet,
} from "@/types";

/** Centre de la carte : ville de Bukavu (Sud-Kivu, RDC) */
export const BUKAVU_CENTER: [number, number] = [-2.5083, 28.8608];
export const BUKAVU_ZOOM = 14;

export const QUARTIERS: Quartier[] = ["Ibanda", "Kadutu", "Bagira"];

export const QUARTIER_INFO: Record<
  Quartier,
  { description: string; centre: [number, number] }
> = {
  Ibanda: {
    description: "Centre administratif, Nyawera, Labotte, Panzi, Nguba, Muhumba",
    centre: [-2.5045, 28.8585],
  },
  Kadutu: {
    description: "Grand marché, Cimpunda, zones denses et caniveaux sensibles",
    centre: [-2.5155, 28.8475],
  },
  Bagira: {
    description: "Nord de la ville, Bagira centre, Kasha, route d'Uvira",
    centre: [-2.4735, 28.8525],
  },
};

export const TYPES_DECHET: TypeDechet[] = [
  "Plastique",
  "Organique",
  "Métal/Gravats",
  "Encombrant",
];

export const STATUT_LABELS: Record<StatutSignalement, string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  nettoye: "Nettoyé",
};

/** Couleurs des marqueurs et badges (hex pour Leaflet, classes pour Tailwind) */
export const COULEURS = {
  rouge: { hex: "#dc2626", label: "Urgent (4-5)" },
  jaune: { hex: "#eab308", label: "Modéré (1-3)" },
  vert: { hex: "#16a34a", label: "Nettoyé" },
} as const;

export type CouleurMarqueur = keyof typeof COULEURS;

/**
 * Règle de couleur : vert si nettoyé, sinon rouge pour une urgence 4-5,
 * jaune pour une urgence 1-3.
 */
export function couleurSignalement(
  s: Pick<Signalement, "urgence" | "statut">,
): CouleurMarqueur {
  if (s.statut === "nettoye") return "vert";
  return s.urgence >= 4 ? "rouge" : "jaune";
}

export const URGENCE_LABELS: Record<number, string> = {
  1: "Très faible",
  2: "Faible",
  3: "Moyenne",
  4: "Élevée",
  5: "Critique",
};

export const RISQUE_LABELS: Record<NiveauRisque, string> = {
  faible: "Faible",
  modere: "Modéré",
  eleve: "Élevé",
  critique: "Critique",
};
