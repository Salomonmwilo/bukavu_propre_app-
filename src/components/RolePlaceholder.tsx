import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

/** Page provisoire d'un rôle, en attendant la vue détaillée. */
export function RolePlaceholder({
  role: roleId,
  children,
}: {
  role: Role;
  /** Contenu contextuel optionnel (aperçu des données du rôle) */
  children?: ReactNode;
}) {
  const role = getRole(roleId);
  const Icon = role.icon;

  return (
    <AppShell>
      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-500/60 via-slate-600/50 to-ocean-950/60 p-6 ring-1 ring-white/15 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span
              className="grid h-14 w-14 place-items-center rounded-2xl bg-lime-soft text-ocean-950"
              aria-hidden="true"
            >
              <Icon className="h-7 w-7" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-xs font-semibold text-ocean-950">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Bientôt disponible
            </span>
          </div>
          <div>
            <h1 className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-light leading-tight tracking-tight text-transparent sm:text-5xl">
              Espace {role.titre}
              <span className="block text-white/50">{role.sousTitre}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/75 sm:text-base">{role.description}</p>
          </div>
        </div>

        <article className="rounded-3xl bg-mint-card p-6 text-ocean-950 shadow-lg shadow-ocean-950/20">
          <h2 className="text-xl font-semibold tracking-tight">Fonctionnalités prévues</h2>
          <ul className="mt-4 space-y-3">
            {role.fonctionnalites.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {children}

      <Link
        href="/"
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ocean-950 shadow-sm transition hover:bg-cyan-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-900",
        )}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Retour à l&apos;accueil
      </Link>
    </AppShell>
  );
}
