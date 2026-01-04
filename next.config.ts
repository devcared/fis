import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // React Compiler kann bei Vercel-Builds Probleme verursachen - optional deaktivieren
  // reactCompiler: true,
  // Image-Konfiguration für Vercel
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
