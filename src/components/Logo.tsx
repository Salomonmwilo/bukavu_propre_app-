import { Recycle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  taille = "md",
  sombre = false,
  avecTexte = true,
}: {
  className?: string;
  taille?: "sm" | "md";
  /** Version claire pour un fond sombre (océan) */
  sombre?: boolean;
  avecTexte?: boolean;
}) {
  const petit = taille === "sm";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-ocean-950 shadow-sm",
          petit ? "h-9 w-9" : "h-11 w-11",
        )}
        aria-hidden="true"
      >
        <Recycle className={petit ? "h-[18px] w-[18px]" : "h-6 w-6"} strokeWidth={2.4} />
      </span>
      {avecTexte && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            sombre ? "text-white" : "text-slate-900",
            petit ? "text-base" : "text-xl",
          )}
        >
          Bukavu{" "}
          <span className={sombre ? "text-lime-soft" : "text-emerald-600"}>Propre</span>
        </span>
      )}
    </span>
  );
}
