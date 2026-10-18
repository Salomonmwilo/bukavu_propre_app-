# Bukavu Propre

MVP de gestion intelligente des déchets pour la **Mairie de Bukavu** (Sud-Kivu, RDC).

Trois espaces :

- **Citoyen** – signalement d'un dépôt d'ordures (photo, GPS, analyse IA du type de déchet et de l'urgence).
- **Collecteur** – tickets par quartier (Ibanda, Kadutu, Bagira), optimisation de tournée, validation « nettoyé » avec photo.
- **Mairie** – tableau de bord : carte Leaflet, filtres, statistiques, alertes prédictives IA.

> Données de démonstration uniquement (mock data). Aucun paiement ni taxe.

## Installation

Prérequis : Node.js 20+ et npm.

```bash
npm install
cp .env.example .env.local   # puis renseigner GEMINI_API_KEY (étape IA)
npm run dev
```

Ouvrir <http://localhost:3000>.

## Scripts

| Commande        | Rôle                                   |
| --------------- | -------------------------------------- |
| `npm run dev`   | Serveur de développement               |
| `npm run build` | Build de production (avec vérif. types) |
| `npm run start` | Lance le build de production           |
| `npm run lint`  | ESLint                                 |

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · lucide-react · Leaflet / react-leaflet · clsx + tailwind-merge.

## Structure

```
src/
├── app/
│   ├── layout.tsx            # Layout racine (fr, police Inter)
│   ├── page.tsx              # Accueil : stats rapides + sélecteur de rôle
│   ├── citoyen/page.tsx      # Espace citoyen (placeholder)
│   ├── collecteur/page.tsx   # Espace collecteur (placeholder)
│   └── mairie/page.tsx       # Tableau de bord mairie (placeholder)
├── components/
│   ├── AppShell.tsx          # Cadre « océan » commun à toutes les vues
│   ├── RoleNav.tsx           # Navigation (pastilles en haut sur desktop, barre du bas sur mobile)
│   ├── RolePlaceholder.tsx   # Gabarit des pages « Bientôt disponible »
│   ├── DonutChart.tsx        # Jauge circulaire SVG
│   ├── KivuIllustration.tsx  # Illustration SVG du lac Kivu
│   ├── Logo.tsx
│   └── ui/                   # Button, Card, Badge (style shadcn)
├── data/mockSignalements.ts  # 20 signalements, 3 organisations, 4 alertes IA
├── lib/
│   ├── constants.ts          # Centre de Bukavu, quartiers, couleurs d'urgence
│   ├── roles.ts              # Configuration des 3 rôles
│   ├── stats.ts              # Statistiques globales et par quartier
│   └── utils.ts              # cn(), formatage fr-FR
└── types/index.ts            # Signalement, Organisation, Collecteur, AlertePredictive
```

## Design

Tableau de bord « lac Kivu » : grand panneau bleu océan aux coins arrondis, cartes en verre dépoli, cartes d'accent vert menthe et bleu ciel, boutons jaune soleil. Les couleurs sont définies dans `src/app/globals.css` (`ocean-*`, `lime-soft`, `mint-card`, `sky-card`, `sun`).

Code couleur des marqueurs : **rouge** urgence 4-5 · **jaune** urgence 1-3 · **vert** nettoyé.

## Prochaines étapes

1. **Citoyen** : formulaire de signalement (photo, géolocalisation) + route API d'analyse avec **Gemini Vision** (type de déchet, urgence 1-5, description).
2. **Collecteur** : liste des tickets filtrée par quartier, bouton « Optimiser l'itinéraire », « Marquer comme nettoyé » avec photo après.
3. **Mairie** : dashboard desktop avec carte **Leaflet** centrée sur Bukavu, filtres, panneau « Alertes Prédictives IA » et statistiques.
