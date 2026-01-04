"use client";

import { motion } from "framer-motion";

interface DelayBannerProps {
  delayReason?: string;
}

/**
 * DelayBanner-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Minimalistisches Warnbanner
 * - Warmes Gelb für Warnung
 * - Große, klare Schrift
 * - Keine verspielten Elemente
 */
export default function DelayBanner({ delayReason }: DelayBannerProps) {
  if (!delayReason) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#FFC107] px-12 py-6 flex items-center justify-center flex-shrink-0"
    >
      <span className="text-2xl font-bold text-white leading-tight">{delayReason}</span>
    </motion.div>
  );
}
