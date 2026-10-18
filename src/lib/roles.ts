import { Camera, LayoutDashboard, Truck, type LucideIcon } from "lucide-react";
import type { Role } from "@/types";

export interface RoleConfig {
  id: Role;
  href: `/${Role}`;
  /** Libellé court (navigation) */
  label: string;
  /** Titre complet (cartes, en-têtes) */
  titre: string;
  sousTitre: string;
  description: string;
  icon: LucideIcon;
  /** Classes d'accent Tailwind pour l'icône */
  accent: string;
  fonctionnalites: string[];
}

export const ROLES: RoleConfig[] = [
  {
    id: "citoyen",
    href: "/citoyen",
    label: "Citoyen",
    titre: "Citoyen",
    sousTitre: "Signalement",
    description:
      "Prenez une photo d'un dépôt d'ordures : l'IA identifie le type de déchet et son urgence.",
    icon: Camera,
    accent: "bg-emerald-100 text-emerald-700",
    fonctionnalites: [
      "Photo du dépôt depuis le téléphone",
      "Position GPS automatique",
      "Analyse IA (Gemini Vision) : type de déchet, urgence 1 à 5, description",
      "Suivi de l'état de ses signalements",
    ],
  },
  {
    id: "collecteur",
    href: "/collecteur",
    label: "Collecteur",
    titre: "Collecteur",
    sousTitre: "Chauffeur",
    description:
      "Consultez les tickets de votre quartier, optimisez votre tournée et validez les nettoyages.",
    icon: Truck,
    accent: "bg-sky-100 text-sky-700",
    fonctionnalites: [
      "Tickets filtrés par quartier : Ibanda, Kadutu, Bagira",
      "Bouton « Optimiser l'itinéraire » selon l'urgence et la distance",
      "« Marquer comme nettoyé » avec photo après intervention",
      "Estimation du volume et du tonnage à charger",
    ],
  },
  {
    id: "mairie",
    href: "/mairie",
    label: "Mairie",
    titre: "Mairie",
    sousTitre: "Administration",
    description:
      "Pilotez la propreté de la ville : carte en temps réel, statistiques et alertes prédictives IA.",
    icon: LayoutDashboard,
    accent: "bg-teal-100 text-teal-700",
    fonctionnalites: [
      "Carte interactive de Bukavu (marqueurs rouge, jaune, vert)",
      "Filtres par quartier, type de déchet, statut et urgence",
      "Panneau « Alertes Prédictives IA » (ex. risque d'inondation)",
      "Statistiques par quartier et par organisation de collecte",
    ],
  },
];

export function getRole(id: Role): RoleConfig {
  const role = ROLES.find((r) => r.id === id);
  if (!role) throw new Error(`Rôle inconnu : ${id}`);
  return role;
}
