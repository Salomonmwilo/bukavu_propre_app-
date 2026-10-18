import { cn } from "@/lib/utils";

/**
 * Illustration vectorielle de Bukavu : collines vertes, presqu'îles
 * et lac Kivu au coucher du soleil. Remplace une photo pour le MVP.
 */
export function KivuIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Illustration des collines de Bukavu au bord du lac Kivu"
    >
      <defs>
        <linearGradient id="kivu-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="55%" stopColor="#67b8c9" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="kivu-lac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <radialGradient id="kivu-soleil" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#kivu-ciel)" />
      <circle cx="300" cy="118" r="60" fill="url(#kivu-soleil)" />
      <circle cx="300" cy="118" r="16" fill="#fef3c7" />
      {/* Montagnes lointaines (Rwanda) */}
      <path d="M0 130 L60 98 L120 120 L190 86 L260 118 L330 92 L400 116 L400 150 L0 150Z" fill="#4b8fa3" opacity="0.7" />
      {/* Lac */}
      <rect y="140" width="400" height="100" fill="url(#kivu-lac)" />
      <path d="M220 168 h60 M250 184 h80 M40 200 h70 M300 214 h60" stroke="#e0f2fe" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      {/* Collines de Bukavu et presqu'îles */}
      <path d="M0 150 C40 108 90 104 130 132 C160 150 180 160 210 158 C180 176 120 190 60 186 L0 190Z" fill="#15803d" />
      <path d="M0 176 C50 150 110 152 160 176 C130 196 70 214 0 222Z" fill="#166534" />
      <path d="M150 170 C190 150 230 156 250 172 C225 182 190 186 150 180Z" fill="#22a052" />
      {/* Maisons */}
      <g fill="#fef3c7">
        <rect x="40" y="150" width="6" height="5" />
        <rect x="58" y="142" width="7" height="5" />
        <rect x="80" y="138" width="6" height="5" />
        <rect x="100" y="146" width="7" height="5" />
        <rect x="24" y="180" width="7" height="5" />
        <rect x="70" y="174" width="6" height="5" />
        <rect x="190" y="164" width="6" height="4" />
      </g>
      <g fill="#fb7185">
        <rect x="48" y="160" width="6" height="5" />
        <rect x="90" y="156" width="7" height="5" />
        <rect x="120" y="168" width="6" height="5" />
      </g>
    </svg>
  );
}
