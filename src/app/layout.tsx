import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Bukavu Propre",
    template: "%s · Bukavu Propre",
  },
  description:
    "Gestion intelligente des déchets – Mairie de Bukavu. Signalement citoyen, collecte optimisée et tableau de bord municipal.",
  applicationName: "Bukavu Propre",
};

export const viewport: Viewport = {
  themeColor: "#0d4152",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-dvh flex-col bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-50 font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
