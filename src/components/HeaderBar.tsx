"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface HeaderBarProps {
  exitDirection?: string;
}

/**
 * HeaderBar-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Modernes, freundliches Design
 * - Dunkler Hintergrund mit subtiler Tiefe
 * - Große, klare Schrift
 * - Dezente Schatten für moderne Optik
 */
export default function HeaderBar({ exitDirection = "Rechts" }: HeaderBarProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const formattedTime = currentTime.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const isRight = exitDirection === "Rechts";
  const ArrowIcon = isRight ? ArrowRight : ArrowLeft;

  return (
    <div className="bg-gradient-to-b from-[#1a1a1a] to-black text-white px-12 py-6 flex items-center justify-between h-24 shadow-lg">
      {/* Logo links - DB Logo mit Shadow */}
      <div className="flex items-center gap-4 flex-shrink-0 min-w-0">
        <div className="relative h-16 w-16 flex-shrink-0 bg-white rounded-lg p-2 shadow-md">
          <Image
            src="/logo.svg"
            alt="DB Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Ausstieg-Hinweis mittig - mit Badge-Style */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-2 text-3xl font-semibold whitespace-nowrap flex items-center gap-3 shadow-md border border-white/20">
        {!isRight && <ArrowIcon className="w-8 h-8 flex-shrink-0" strokeWidth={2.5} />}
        <span>Ausstieg {exitDirection}</span>
        {isRight && <ArrowIcon className="w-8 h-8 flex-shrink-0" strokeWidth={2.5} />}
      </div>

      {/* Datum & Uhrzeit rechts - mit Badge */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-3xl font-bold tabular-nums flex-shrink-0 whitespace-nowrap ml-auto flex items-center gap-10 shadow-md border border-white/20">
        <span>{formattedDate}</span>
        <span className="text-yellow-300">{formattedTime} Uhr</span>
      </div>
    </div>
  );
}
