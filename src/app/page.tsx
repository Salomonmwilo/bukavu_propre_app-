import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  MapPin,
  Plus,
  Scale,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DonutChart } from "@/components/DonutChart";
import { KivuIllustration } from "@/components/KivuIllustration";
import { mockAlertes, mockOrganisations, mockSignalements } from "@/data/mockSignalements";
import {
  QUARTIERS,
  RISQUE_LABELS,
  STATUT_LABELS,
  couleurSignalement,
} from "@/lib/constants";
import { ROLES } from "@/lib/roles";
import { calculerStats, calculerStatsParQuartier } from "@/lib/stats";
import { cn, formatNombre } from "@/lib/utils";
import type { NiveauRisque, TypeAlerte } from "@/types";

const formatJour = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Lubumbashi",
});

const PASTILLE_URGENCE = {
  rouge: "bg-red-500",
  jaune: "bg-amber-400",
  vert: "bg-emerald-400",
} as const;

const BARRE_QUARTIER = ["bg-emerald-500", "bg-teal-400", "bg-amber-400"];

const BARRE_RISQUE: Record<NiveauRisque, string> = {
  critique: "bg-red-400",
  eleve: "bg-orange-300",
  modere: "bg-amber-300",
  faible: "bg-emerald-400",
};

const TYPE_ALERTE: Record<TypeAlerte, string> = {
  inondation: "Risque d'inondation",
  sanitaire: "Risque sanitaire",
  saturation: "Saturation",
};

const ROLE_STYLE = [
  "bg-lime-soft text-ocean-950 hover:bg-lime-200",
  "bg-white text-ocean-950 hover:bg-cyan-50",
  "glass text-white hover:bg-white/15",
];

const anneauFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-900";

export default function AccueilPage() {
  const stats = calculerStats(mockSignalements);
  const parQuartier = calculerStatsParQuartier(mockSignalements, QUARTIERS);
  const derniereMaj = mockSignalements.reduce((max, s) =>
    s.dateSignalement > max.dateSignalement ? s : max,
  ).dateSignalement;

  const recents = [...mockSignalements]
    .sort((a, b) => b.dateSignalement.localeCompare(a.dateSignalement))
    .slice(0, 8);

  const alertes = mockAlertes.slice(0, 3);

  return (
    <AppShell>
      {/* Barre de contexte */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-3 py-1 text-xs font-medium text-ocean-950">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Mis à jour le {formatJour.format(new Date(derniereMaj))}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Bukavu, Sud-Kivu
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Scale className="h-4 w-4" aria-hidden="true" />
            {formatNombre(stats.tonnesEnAttente)} t à collecter
          </span>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Link
            href="/mairie"
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ocean-950 shadow-sm transition hover:bg-cyan-50 sm:flex-none",
              anneauFocus,
            )}
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            Tableau de bord
          </Link>
          <Link
            href="/citoyen"
            aria-label="Signaler un dépôt"
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sun px-4 py-2.5 text-sm font-semibold text-ocean-950 shadow-sm transition hover:brightness-105 sm:flex-none",
              anneauFocus,
            )}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="whitespace-nowrap">
              Signaler<span className="hidden min-[400px]:inline"> un dépôt</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Héros : titre, jauge, illustration */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1.1fr] lg:items-center">
        <div className="relative flex min-h-60 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-slate-500/60 via-slate-600/50 to-ocean-950/60 p-6 ring-1 ring-white/15 lg:min-h-64">
          <h1 className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-5xl font-light leading-[0.95] tracking-tight text-transparent sm:text-6xl">
            Bukavu
            <br />
            Propre
          </h1>
          <div className="mt-6 flex items-end justify-between gap-3 text-sm">
            <div>
              <p className="text-[11px] text-white/60">Gestion intelligente des déchets</p>
              <p className="font-medium text-white">Mairie de Bukavu</p>
            </div>
            <Link
              href="/collecteur"
              className={cn(
                "inline-flex items-center gap-1 rounded-full text-xs text-white/75 transition hover:text-white",
                anneauFocus,
              )}
            >
              {mockOrganisations.length} organisations
              <span className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-white/50">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-2 md:order-last md:col-span-2 lg:order-none lg:col-span-1">
          <DonutChart
            valeur={stats.tauxResolution}
            label="Sites nettoyés"
            detail={`${stats.nettoyes} / ${stats.total} signalements`}
            taille={220}
          />
        </div>

        <div className="relative min-h-60 overflow-hidden rounded-3xl ring-1 ring-white/15 lg:min-h-64">
          <KivuIllustration className="absolute inset-0" />
          <span className="absolute bottom-4 left-4 rounded-full bg-ocean-950/60 px-3 py-1 text-xs text-white backdrop-blur">
            Lac Kivu · {QUARTIERS.join(", ")}
          </span>
        </div>
      </section>

      {/* Signalements récents (rangée défilante) */}
      <section aria-labelledby="titre-signalements" className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex items-end justify-between gap-4 lg:block lg:w-60">
          <h2 id="titre-signalements" className="text-3xl font-light tracking-tight sm:text-4xl">
            Signalements
          </h2>
          <Link
            href="/citoyen"
            className={cn(
              "mt-2 inline-flex items-center gap-1.5 rounded-full text-sm text-lime-soft transition hover:text-lime-200",
              anneauFocus,
            )}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-lime-soft">
              <Plus className="h-3 w-3" aria-hidden="true" />
            </span>
            Nouveau
          </Link>
        </div>

        <ul className="scrollbar-none -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {recents.map((s, i) => {
            const couleur = couleurSignalement(s);
            const premier = i === 0;
            return (
              <li
                key={s.id}
                className={cn(
                  "w-52 shrink-0 snap-start rounded-2xl p-4 transition",
                  premier ? "bg-white text-ocean-950 shadow-lg" : "glass text-white hover:bg-white/15",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium" title={s.lieu}>
                    {s.lieu}
                  </p>
                  <span
                    className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", PASTILLE_URGENCE[couleur])}
                    title={`Urgence ${s.urgence}/5`}
                  />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-3 text-[11px]">
                  <dt className={premier ? "text-slate-500" : "text-white/55"}>
                    {formatJour.format(new Date(s.dateSignalement))}
                  </dt>
                  <dt className={premier ? "text-slate-500" : "text-white/55"}>Poids estimé</dt>
                  <dd className="text-xs font-medium">{STATUT_LABELS[s.statut]}</dd>
                  <dd className="text-xs font-medium">{formatNombre(s.poidsEstimeTonnes, 2)} t</dd>
                </dl>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Cartes du bas */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* Tonnage par quartier */}
        <article className="rounded-3xl bg-mint-card p-5 text-ocean-950 shadow-lg shadow-ocean-950/20">
          <header className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Tonnage par quartier</h2>
            <Link
              href="/mairie"
              className="inline-flex items-center gap-1 rounded-full text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-900"
            >
              Détails
              <span className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-ocean-950/60">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </header>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] text-ocean-950/60">
                <th scope="col" className="pb-2 font-normal">Quartier</th>
                <th scope="col" className="pb-2 font-normal">Collecté</th>
                <th scope="col" className="pb-2 font-normal"><span className="sr-only">Progression</span></th>
                <th scope="col" className="pb-2 text-right font-normal">Signalé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-950/10">
              {parQuartier.map((q, i) => (
                <tr key={q.quartier}>
                  <th scope="row" className="py-2.5 text-left font-medium">{q.quartier}</th>
                  <td className="py-2.5">{formatNombre(q.tonnesCollectees)} t</td>
                  <td className="w-1/4 py-2.5 pr-3">
                    <div className="h-2 rounded-full bg-ocean-950/10">
                      <div
                        className={cn("h-2 rounded-full", BARRE_QUARTIER[i % BARRE_QUARTIER.length])}
                        style={{ width: `${q.tonnesSignalees ? (q.tonnesCollectees / q.tonnesSignalees) * 100 : 0}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 text-right">{formatNombre(q.tonnesSignalees)} t</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <th scope="row" className="pt-3 text-left">Total</th>
                <td className="pt-3">{formatNombre(stats.tonnesTotales - stats.tonnesEnAttente)} t</td>
                <td className="pt-3 pr-3">
                  <div className="h-2 rounded-full bg-ocean-950/10">
                    <div
                      className="h-2 rounded-full bg-red-400"
                      style={{ width: `${((stats.tonnesTotales - stats.tonnesEnAttente) / stats.tonnesTotales) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="pt-3 text-right">{formatNombre(stats.tonnesTotales)} t</td>
              </tr>
            </tbody>
          </table>
        </article>

        {/* Sélecteur de rôle */}
        <nav aria-labelledby="titre-espaces" className="glass rounded-3xl p-5">
          <header className="flex items-center justify-between gap-2 text-sm">
            <h2 id="titre-espaces" className="font-medium">Choisissez votre espace</h2>
            <span className="rounded-full bg-sun px-2 py-0.5 text-[11px] font-semibold text-ocean-950">
              {ROLES.length} rôles
            </span>
          </header>
          <ul className="mt-4 space-y-2.5">
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <li key={role.id}>
                  <Link
                    href={role.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl p-3 transition",
                      ROLE_STYLE[i % ROLE_STYLE.length],
                      anneauFocus,
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                        i === 2 ? "bg-white/15" : "bg-ocean-900/10",
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {role.titre}
                        <span className="font-normal opacity-60"> / {role.sousTitre}</span>
                      </span>
                      <span className="line-clamp-1 text-xs opacity-70">{role.description}</span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Alertes prédictives IA */}
        <article className="rounded-3xl bg-sky-card p-5 text-ocean-950 shadow-lg shadow-ocean-950/20">
          <header className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Alertes Prédictives IA</h2>
            <Link
              href="/mairie"
              className="inline-flex items-center gap-1 rounded-full text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-900"
            >
              Détails
              <span className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-ocean-950/60">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </header>
          <ul className="mt-4 space-y-4">
            {alertes.map((a) => (
              <li key={a.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[11px] text-ocean-950/60">{TYPE_ALERTE[a.type]}</p>
                  <p className="text-sm font-semibold">{Math.round(a.probabilite * 100)} %</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium" title={a.zone}>
                    {a.zone}
                  </p>
                  <div className="h-2 w-1/3 shrink-0 rounded-full bg-ocean-950/10">
                    <div
                      className={cn("h-2 rounded-full", BARRE_RISQUE[a.niveau])}
                      style={{ width: `${a.probabilite * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-ocean-950/60">
                  {a.quartier} · risque {RISQUE_LABELS[a.niveau].toLowerCase()}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <footer className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4 text-xs text-white/50 sm:flex-row sm:justify-between">
        <p>© Mairie de Bukavu · Sud-Kivu, RDC</p>
        <p>Prototype MVP – données de démonstration</p>
      </footer>
    </AppShell>
  );
}
