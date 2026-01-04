import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // React Compiler kann bei Vercel-Builds Probleme verursachen - optional deaktivieren
  // reactCompiler: true,
  // Turbopack-Cache-Konfiguration für Pfade mit Leerzeichen
  experimental: {
    turbo: {
      // Persistenz deaktivieren, um Probleme mit Pfaden zu vermeiden
      // Dies kann die Performance leicht beeinträchtigen, behebt aber den Fehler
    },
  },
  // Image-Konfiguration für Vercel
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
