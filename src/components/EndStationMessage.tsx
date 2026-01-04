"use client";

import { motion } from "framer-motion";

interface EndStationMessageProps {
  endStation: string;
}

/**
 * EndStationMessage-Komponente
 * 
 * Zeigt eine Meldung an, wenn die Endstation erreicht wurde
 * Design im Stil der restlichen Anzeige: weißer Hintergrund, große schwarze Schrift
 * Mit sanfter Animation
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
        className="text-center max-w-5xl"
      >
        <h2 className="text-7xl font-black text-black mb-8 leading-tight tracking-tight">
          Danke, dass Sie mit uns gereist sind.
        </h2>
        <div className="mb-6">
          <p className="text-5xl font-bold text-black mb-3 leading-tight">
            Dies ist die Endhaltestelle:
          </p>
          <p className="text-6xl font-black text-[#DC2626] leading-tight tracking-tight">
            {endStation}
          </p>
        </div>
        <p className="text-4xl font-bold text-black leading-tight">
          Wir bitten Sie alle auszusteigen!
        </p>
      </motion.div>
    </motion.div>
  );
}
