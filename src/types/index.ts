export type Quartier = "Ibanda" | "Kadutu" | "Bagira";

export type TypeDechet = "Plastique" | "Organique" | "Métal/Gravats" | "Encombrant";

export type NiveauUrgence = 1 | 2 | 3 | 4 | 5;

export type StatutSignalement = "en_attente" | "en_cours" | "nettoye";

export interface Signalement {
  id: string;
  titre: string;
  quartier: Quartier;
  /** Lieu-dit ou repère connu (ex. « Place Mulamba ») */
  lieu: string;
  lat: number;
  lng: number;
  typeDechet: TypeDechet;
  urgence: NiveauUrgence;
  volumeEstimeM3: number;
  poidsEstimeTonnes: number;
  /** Description générée par l'analyse IA de la photo */
  descriptionIA: string;
  statut: StatutSignalement;
  photoAvant: string;
  photoApres?: string;
  /** Date ISO 8601 */
  dateSignalement: string;
  caniveauObstrue: boolean;
  /** Identifiant de l'organisation assignée, le cas échéant */
  organisationId?: string;
}

export interface Collecteur {
  id: string;
  nom: string;
  telephone: string;
  vehicule: string;
  organisationId: string;
}

export interface Organisation {
  id: string;
  nom: string;
  quartier: Quartier;
  responsable: string;
  telephone: string;
  nombreCamions: number;
  collecteurs: Collecteur[];
}

export type TypeAlerte = "inondation" | "sanitaire" | "saturation";

export type NiveauRisque = "faible" | "modere" | "eleve" | "critique";

export interface AlertePredictive {
  id: string;
  type: TypeAlerte;
  titre: string;
  quartier: Quartier;
  zone: string;
  niveau: NiveauRisque;
  /** Probabilité estimée par le modèle (0 à 1) */
  probabilite: number;
  message: string;
  recommandation: string;
  /** Signalements à l'origine de l'alerte */
  signalementsLies: string[];
  dateGeneration: string;
}

export type Role = "citoyen" | "collecteur" | "mairie";
