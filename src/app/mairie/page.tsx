import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { RolePlaceholder } from "@/components/RolePlaceholder";
import { mockAlertes } from "@/data/mockSignalements";
import { RISQUE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tableau de bord Mairie",
};

export default function MairiePage() {
  const alertesPrioritaires = mockAlertes.filter(
    (a) => a.niveau === "critique" || a.niveau === "eleve",
  );

  return (
    <RolePlaceholder role="mairie">
      <section className="glass rounded-3xl p-6">
        <h2 className="flex items-center gap-2 text-lg font-medium">
          <AlertTriangle className="h-5 w-5 text-sun" aria-hidden="true" />
          Aperçu des alertes IA
          <span className="text-xs font-normal text-white/50">(démonstration)</span>
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {alertesPrioritaires.map((a) => (
            <li key={a.id} className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium">{a.titre}</p>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold text-ocean-950",
                    a.niveau === "critique" ? "bg-red-300" : "bg-orange-200",
                  )}
                >
                  {RISQUE_LABELS[a.niveau]}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/60">
                {a.quartier} · probabilité {Math.round(a.probabilite * 100)} %
              </p>
            </li>
          ))}
        </ul>
      </section>
    </RolePlaceholder>
  );
}
