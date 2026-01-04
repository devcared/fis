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
 * DESIGN-PHILOSOPHIE: Modernes, ansprechendes Design
 * - Extrem große Schrift für Stationsnamen
 * - Dezente Schatten für Tiefe
 * - Moderne Badge-Designs
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
    <div className="bg-gradient-to-b from-white to-[#fafafa] px-12 py-10 shadow-sm">
      <div className="flex items-start justify-between gap-16">
        {/* Linke Seite: Nächster Halt */}
        <div className="flex-1 min-w-0 max-w-5xl">
          <div className="text-2xl font-bold text-gray-600 -mb-3 tracking-tight whitespace-nowrap">Nächster Halt</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={nextStation}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-9xl font-black text-gray-900 leading-none tracking-tight break-words hyphens-auto drop-shadow-sm"
            >
              {nextStation}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rechte Seite: Geplante Ankunftszeit und Gleisanzeige */}
        <div className="flex items-center gap-40 flex-shrink-0">
          {/* Geplante Ankunftszeit - mit Card-Design */}
          <div className="flex flex-col items-end gap-3 bg-white rounded-xl px-6 py-4 shadow-md border border-[#e5e5e5]">
            <div className="text-lg font-semibold text-gray-600 whitespace-nowrap">Geplante Ankunftszeit</div>
            
            <div className="flex items-center gap-4">
              {/* Erste Zeit - immer angezeigt, bei Verspätung durchgestrichen */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`planned-${plannedArrival}-${delay}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`text-6xl font-black text-gray-700 leading-none whitespace-nowrap tabular-nums ${
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

          {/* Gleis-Badge - Modern mit Shadow */}
          {platformDisplay && (
            <AnimatePresence mode="wait">
              <motion.div
                key={platformDisplay}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-900 to-black text-white px-6 py-4 rounded-xl border border-gray-700 flex-shrink-0 shadow-lg"
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
