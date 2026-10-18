import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  info: "bg-sky-50 text-sky-700 ring-sky-600/20",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  warning: "bg-amber-50 text-amber-800 ring-amber-600/20",
  success: "bg-green-50 text-green-700 ring-green-600/20",
  neutral: "bg-slate-100 text-slate-700 ring-slate-500/20",
} as const;

export type BadgeVariant = keyof typeof variants;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
