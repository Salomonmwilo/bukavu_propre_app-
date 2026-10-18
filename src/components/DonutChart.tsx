/** Jauge circulaire (anneau) pour un pourcentage, rendue en SVG pur. */
export function DonutChart({
  valeur,
  label,
  detail,
  taille = 200,
}: {
  /** Pourcentage de 0 à 100 */
  valeur: number;
  label: string;
  detail?: string;
  taille?: number;
}) {
  const epaisseur = 13;
  const rayon = (100 - epaisseur) / 2 - 2;
  const circonference = 2 * Math.PI * rayon;
  const pct = Math.min(100, Math.max(0, valeur));
  // Petit espace entre les deux arcs, comme sur la maquette
  const ecart = pct > 0 && pct < 100 ? 3 : 0;
  const longueurValeur = Math.max(0, (pct / 100) * circonference - ecart);
  const longueurReste = Math.max(0, circonference - longueurValeur - 2 * ecart);

  return (
    <figure
      className="relative grid place-items-center"
      style={{ width: taille, height: taille }}
      aria-label={`${label} : ${Math.round(pct)} %${detail ? `, ${detail}` : ""}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="donut-valeur" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ecfccb" />
            <stop offset="100%" stopColor="#bef264" />
          </linearGradient>
        </defs>
        {/* Reste */}
        <circle
          cx="50"
          cy="50"
          r={rayon}
          fill="none"
          stroke="#34b39a"
          strokeWidth={epaisseur}
          strokeDasharray={`${longueurReste} ${circonference}`}
          strokeDashoffset={-(longueurValeur + ecart)}
        />
        {/* Valeur */}
        <circle
          cx="50"
          cy="50"
          r={rayon}
          fill="none"
          stroke="url(#donut-valeur)"
          strokeWidth={epaisseur}
          strokeDasharray={`${longueurValeur} ${circonference}`}
        />
      </svg>
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] text-white/70">{label}</span>
        <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {Math.round(pct)}%
        </span>
        {detail && <span className="mt-1 text-[11px] text-white/70">{detail}</span>}
      </figcaption>
    </figure>
  );
}
