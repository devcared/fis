"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface NextStopPanelProps {
  nextStation: string;
  plannedArrival: string;
  delay: number;
  delayReason?: string;
  platformDisplay?: string;
}

/**
 * NextStopPanel-Komponente
 * Zeigt den nächsten Halt sehr groß mit Verspätungsinformationen
 * Optimiert für maximale Lesbarkeit aus mehreren Metern
 * Mit Animation beim Stationswechsel
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
    <div className="bg-white px-10 py-8">
      <div className="flex items-start justify-between gap-12">
        {/* Linke Seite: Nächster Halt */}
        <div className="flex-1 min-w-0 max-w-4xl">
          <div className="text-3xl font-bold text-black -mb-4 tracking-tight whitespace-nowrap">Nächster Halt</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={nextStation}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-8xl font-bold text-black mb-6 leading-tight tracking-tight break-words hyphens-auto"
            >
              {nextStation}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rechte Seite: Geplante Ankunftszeit und Gleisanzeige */}
        <div className="flex items-center gap-32 flex-shrink-0">
          {/* Geplante Ankunftszeit */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-2xl font-semibold text-black whitespace-nowrap">Geplante Ankunftszeit</div>
            
            <div className="flex items-center gap-3">
              {/* Erste Zeit - immer angezeigt, bei Verspätung durchgestrichen */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`planned-${plannedArrival}-${delay}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`text-5xl font-bold text-black leading-none whitespace-nowrap ${
                    delay > 0 ? 'line-through decoration-2' : ''
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
                  className={`text-5xl font-bold leading-none tracking-tight whitespace-nowrap ${
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
                className="bg-black text-white px-5 py-3 border border-gray-400 flex-shrink-0"
              >
                <div className="text-2xl font-bold leading-none whitespace-nowrap">{platformDisplay}</div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
