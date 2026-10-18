"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CircleHelp, Home } from "lucide-react";
import { Logo } from "@/components/Logo";
import { mockAlertes } from "@/data/mockSignalements";
import { ROLES } from "@/lib/roles";
import { cn } from "@/lib/utils";

const LIENS = [
  { href: "/", label: "Vue d'ensemble", labelCourt: "Accueil", icon: Home },
  ...ROLES.map((r) => ({
    href: r.href,
    label: r.label,
    labelCourt: r.label,
    icon: r.icon,
  })),
];

const anneauFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-900";

/**
 * Navigation principale, posée sur le fond océan de l'AppShell.
 * – Desktop (md+) : pastilles centrées dans la barre du haut.
 * – Mobile : barre fixe en bas de l'écran (zone du pouce).
 */
export function RoleNav() {
  const pathname = usePathname();
  const estActif = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const nbAlertes = mockAlertes.filter(
    (a) => a.niveau === "critique" || a.niveau === "eleve",
  ).length;

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Bukavu Propre – accueil" className={cn("rounded-full", anneauFocus)}>
          <Logo taille="sm" sombre />
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full p-1">
            {LIENS.map((lien) => {
              const actif = estActif(lien.href);
              return (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    aria-current={actif ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      anneauFocus,
                      actif
                        ? "bg-cyan-200/90 text-ocean-950 shadow-[0_0_24px_rgba(165,243,252,0.35)]"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {lien.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 text-white/80">
          <span className="hidden h-9 w-9 place-items-center rounded-full sm:grid" aria-hidden="true">
            <CircleHelp className="h-5 w-5" />
          </span>
          <Link
            href="/mairie"
            className={cn(
              "relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10 hover:text-white",
              anneauFocus,
            )}
            aria-label={`${nbAlertes} alertes prioritaires`}
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-sun px-1 text-[10px] font-bold text-ocean-950">
              {nbAlertes}
            </span>
          </Link>
          <span
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-200 to-cyan-400 text-xs font-bold text-ocean-950 ring-2 ring-white/30"
            title="Mairie de Bukavu"
            aria-hidden="true"
          >
            MB
          </span>
        </div>
      </header>

      {/* Mobile : barre du bas */}
      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/15 bg-ocean-950/90 pb-[env(safe-area-inset-bottom)] shadow-2xl shadow-ocean-950/40 backdrop-blur-lg md:hidden"
      >
        <ul className="grid grid-cols-4 p-1">
          {LIENS.map((lien) => {
            const actif = estActif(lien.href);
            const Icon = lien.icon;
            return (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  aria-current={actif ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-soft",
                    actif ? "bg-cyan-200/90 text-ocean-950" : "text-white/70 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {lien.labelCourt}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
