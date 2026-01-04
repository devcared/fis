"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface HeaderBarProps {
  exitDirection?: string;
}

/**
 * HeaderBar-Komponente
 * Zeigt Logo links, Ausstieg-Hinweis mittig, Datum & Uhrzeit rechts
 * Optimiert für maximale Lesbarkeit und präzise Abstände
 * Pfeil zeigt in die richtige Richtung und ist rechts/links vom Text positioniert
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
    <div className="bg-black text-white px-10 py-5 flex items-center justify-between h-20">
      {/* Logo links - DB Logo */}
      <div className="flex items-center gap-4 flex-shrink-0 min-w-0">
        <div className="relative h-14 w-14 flex-shrink-0">
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
      <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-medium whitespace-nowrap flex items-center gap-2">
        {!isRight && <ArrowIcon className="w-7 h-7 flex-shrink-0" strokeWidth={2.5} />}
        <span>Ausstieg {exitDirection}</span>
        {isRight && <ArrowIcon className="w-7 h-7 flex-shrink-0" strokeWidth={2.5} />}
      </div>

      {/* Datum & Uhrzeit rechts */}
      <div className="text-2xl font-bold tabular-nums flex-shrink-0 whitespace-nowrap ml-auto flex items-center gap-8">
        <span>{formattedDate}</span>
        <span>{formattedTime} Uhr</span>
      </div>
    </div>
  );
}
