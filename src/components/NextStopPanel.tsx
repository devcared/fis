"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NextStopPanelProps {
  nextStation: string;
  plannedArrival: string;
  delay: number;
  delayReason?: string;
  platformDisplay?: string;
}

/**
 * NextStopPanel-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Maximale Lesbarkeit aus 5-10 Metern
 * - Extrem große Schrift für Stationsnamen
 * - Klare, technische Typografie
 * - Präzise Abstände
 * - Animation beim Stationswechsel
 */
export default function NextStopPanel({
  nextStation,
  plannedArrival,
  delay,
  delayReason,
  platformDisplay
}: NextStopPanelProps) {
  // Berechne neue Ankunftszeit mit Verspätung
  const getDelayedArrival = (): string => {
    if (delay === 0) return plannedArrival;
    
    const [hours, minutes] = plannedArrival.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + delay, 0, 0);
    
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const delayedArrival = getDelayedArrival();

  return (
    <div className="bg-white px-12 py-10">
      <div className="flex items-start justify-between gap-16">
        {/* Linke Seite: Nächster Halt */}
        <div className="flex-1 min-w-0 max-w-5xl">
          <div className="text-2xl font-bold text-black -mb-3 tracking-tight whitespace-nowrap">Nächster Halt</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={nextStation}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-9xl font-black text-black leading-none tracking-tight break-words hyphens-auto"
            >
              {nextStation}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rechte Seite: Geplante Ankunftszeit und Gleisanzeige */}
        <div className="flex items-center gap-40 flex-shrink-0">
          {/* Geplante Ankunftszeit */}
          <div className="flex flex-col items-end gap-3">
            <div className="text-xl font-semibold text-black whitespace-nowrap">Geplante Ankunftszeit</div>
            
            <div className="flex items-center gap-4">
              {/* Erste Zeit - immer angezeigt, bei Verspätung durchgestrichen */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`planned-${plannedArrival}-${delay}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`text-6xl font-black text-black leading-none whitespace-nowrap tabular-nums ${
                    delay > 0 ? 'line-through decoration-3' : ''
                  }`}
                >
                  {plannedArrival}
                </motion.div>
              </AnimatePresence>
              
              {/* Zweite Zeit - grün bei pünktlich, rot bei Verspätung */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`arrival-${delayedArrival}-${delay}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`text-6xl font-black leading-none tracking-tight whitespace-nowrap tabular-nums ${
                    delay > 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {delayedArrival}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Gleis-Badge */}
          {platformDisplay && (
            <AnimatePresence mode="wait">
              <motion.div
                key={platformDisplay}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-black text-white px-6 py-4 border border-[#666666] flex-shrink-0"
              >
                <div className="text-3xl font-black leading-none whitespace-nowrap">{platformDisplay}</div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
