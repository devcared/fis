"use client";

import { motion } from "framer-motion";

interface EndStationMessageProps {
  endStation: string;
}

/**
 * EndStationMessage-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Autoritative Endstation-Meldung
 * - Extrem große, klare Schrift
 * - Zentrierte Darstellung
 * - Rote Akzentuierung für Stationsname
 * - Professionelles Bahn-System-Design
 */
export default function EndStationMessage({ endStation }: EndStationMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white h-full flex items-center justify-center px-12"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-center max-w-6xl"
      >
        <h2 className="text-8xl font-black text-black mb-10 leading-tight tracking-tight">
          Danke, dass Sie mit uns gereist sind.
        </h2>
        <div className="mb-8">
          <p className="text-6xl font-bold text-black mb-4 leading-tight tracking-tight">
            Dies ist die Endhaltestelle:
          </p>
          <p className="text-9xl font-black text-[#DC2626] leading-none tracking-tight">
            {endStation}
          </p>
        </div>
        <p className="text-5xl font-black text-black leading-tight tracking-tight">
          Wir bitten Sie alle auszusteigen!
        </p>
      </motion.div>
    </motion.div>
  );
}
