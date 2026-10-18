import type { Metadata } from "next";
import { RolePlaceholder } from "@/components/RolePlaceholder";
import { mockSignalements } from "@/data/mockSignalements";
import { QUARTIERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Espace collecteur",
};

export default function CollecteurPage() {
  const parQuartier = QUARTIERS.map((quartier) => ({
    quartier,
    tickets: mockSignalements.filter(
      (s) => s.quartier === quartier && s.statut !== "nettoye",
    ).length,
  }));

  return (
    <RolePlaceholder role="collecteur">
      <section className="rounded-3xl bg-sky-card p-6 text-ocean-950 shadow-lg shadow-ocean-950/20">
        <h2 className="text-xl font-semibold tracking-tight">Tickets ouverts par quartier</h2>
        <p className="text-xs text-ocean-950/60">Données de démonstration</p>
        <dl className="mt-4 grid grid-cols-3 gap-3">
          {parQuartier.map(({ quartier, tickets }) => (
            <div key={quartier} className="rounded-2xl bg-white/60 p-4 text-center">
              <dt className="text-xs font-medium text-ocean-950/70">{quartier}</dt>
              <dd className="text-3xl font-semibold">{tickets}</dd>
            </div>
          ))}
        </dl>
      </section>
    </RolePlaceholder>
  );
}
