import type { Quartier, Signalement } from "@/types";

export interface StatsGlobales {
  total: number;
  actifs: number;
  nettoyes: number;
  /** Pourcentage de signalements nettoyés (0-100) */
  tauxResolution: number;
  /** Tonnage estimé restant à collecter (signalements non nettoyés) */
  tonnesEnAttente: number;
  /** Tonnage estimé total signalé */
  tonnesTotales: number;
  caniveauxObstrues: number;
  urgents: number;
}

export function calculerStats(signalements: Signalement[]): StatsGlobales {
  const total = signalements.length;
  const nettoyes = signalements.filter((s) => s.statut === "nettoye").length;
  const actifsListe = signalements.filter((s) => s.statut !== "nettoye");
  const somme = (liste: Signalement[]) =>
    liste.reduce((acc, s) => acc + s.poidsEstimeTonnes, 0);

  return {
    total,
    actifs: actifsListe.length,
    nettoyes,
    tauxResolution: total === 0 ? 0 : Math.round((nettoyes / total) * 100),
    tonnesEnAttente: somme(actifsListe),
    tonnesTotales: somme(signalements),
    caniveauxObstrues: actifsListe.filter((s) => s.caniveauObstrue).length,
    urgents: actifsListe.filter((s) => s.urgence >= 4).length,
  };
}

export interface StatsQuartier {
  quartier: Quartier;
  /** Tonnage des sites déjà nettoyés */
  tonnesCollectees: number;
  /** Tonnage total signalé */
  tonnesSignalees: number;
  actifs: number;
}

export function calculerStatsParQuartier(
  signalements: Signalement[],
  quartiers: Quartier[],
): StatsQuartier[] {
  return quartiers.map((quartier) => {
    const liste = signalements.filter((s) => s.quartier === quartier);
    return {
      quartier,
      tonnesCollectees: liste
        .filter((s) => s.statut === "nettoye")
        .reduce((acc, s) => acc + s.poidsEstimeTonnes, 0),
      tonnesSignalees: liste.reduce((acc, s) => acc + s.poidsEstimeTonnes, 0),
      actifs: liste.filter((s) => s.statut !== "nettoye").length,
    };
  });
}
