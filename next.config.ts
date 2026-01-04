import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopack-Cache-Konfiguration für Pfade mit Leerzeichen
  experimental: {
    turbo: {
      // Persistenz deaktivieren, um Probleme mit Pfaden zu vermeiden
      // Dies kann die Performance leicht beeinträchtigen, behebt aber den Fehler
    },
  },
};

export default nextConfig;
