"use client";

import { motion } from "framer-motion";

interface DelayBannerProps {
  delayReason?: string;
}

/**
 * DelayBanner-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Modernes Warnbanner
 * - Warmes Gelb mit Gradient
 * - Große, klare Schrift
 * - Subtile Schatten für Tiefe
 */
export default function DelayBanner({ delayReason }: DelayBannerProps) {
  if (!delayReason) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-[#FFC107] to-[#FFB300] px-12 py-6 flex items-center justify-center flex-shrink-0 shadow-lg border-b-2 border-[#FFA000]"
    >
      <span className="text-2xl font-bold text-white leading-tight drop-shadow-sm">{delayReason}</span>
    </motion.div>
  );
}
