import type { ReactNode } from "react";
import { RoleNav } from "@/components/RoleNav";
import { cn } from "@/lib/utils";

/**
 * Cadre commun : grand panneau « océan » (lac Kivu) aux coins arrondis,
 * posé sur un fond clair, avec la navigation entre les vues.
 */
export function AppShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-1 flex-col p-0 sm:p-4 lg:p-8">
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden bg-ocean-900 text-white",
          "sm:rounded-[2rem] sm:shadow-2xl sm:shadow-ocean-950/30",
        )}
      >
        {/* Halo décoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(163,230,53,0.10),transparent_50%)]"
        />
        <div
          className={cn(
            "relative flex flex-1 flex-col gap-6 px-4 pb-28 pt-4 sm:px-6 sm:pt-6 md:pb-8 lg:px-8",
            className,
          )}
        >
          <RoleNav />
          {children}
        </div>
      </div>
    </div>
  );
}
