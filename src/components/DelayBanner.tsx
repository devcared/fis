"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface DelayBannerProps {
  delayReason?: string;
}

/**
 * DelayBanner-Komponente
 * 
 * Separater Container für Verspätungsmeldungen
 * Gelbes Banner mit Warnsymbol und Text
 */
export default function DelayBanner({ delayReason }: DelayBannerProps) {
  if (!delayReason) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#FFC107] px-12 py-5 flex items-center gap-3 flex-shrink-0"
    >
      <AlertCircle className="w-6 h-6 text-white flex-shrink-0" strokeWidth={2.5} fill="white" />
      <span className="text-xl font-semibold text-white leading-tight">{delayReason}</span>
    </motion.div>
  );
}

