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
 * DESIGN-PHILOSOPHIE: Technisches Bahn-System
 * - Sehr dunkler Hintergrund (schwarz)
 * - Große, klare Schrift für maximale Lesbarkeit
 * - Präzise Abstände, keine Schatten
 * - Pfeil zeigt in die richtige Richtung
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
    <div className="bg-black text-white px-12 py-6 flex items-center justify-between h-24">
      {/* Logo links - DB Logo */}
      <div className="flex items-center gap-4 flex-shrink-0 min-w-0">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="DB Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Ausstieg-Hinweis mittig - absolut zentriert, Pfeil rechts oder links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold whitespace-nowrap flex items-center gap-3">
        {!isRight && <ArrowIcon className="w-8 h-8 flex-shrink-0" strokeWidth={2.5} />}
        <span>Ausstieg {exitDirection}</span>
        {isRight && <ArrowIcon className="w-8 h-8 flex-shrink-0" strokeWidth={2.5} />}
      </div>

      {/* Datum & Uhrzeit rechts */}
      <div className="text-3xl font-bold tabular-nums flex-shrink-0 whitespace-nowrap ml-auto flex items-center gap-10">
        <span>{formattedDate}</span>
        <span>{formattedTime} Uhr</span>
      </div>
    </div>
  );
}
