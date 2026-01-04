"use client";

import { Connection } from "@/types/train";
import { useEffect, useState } from "react";

interface ConnectionsPanelProps {
  connections?: Connection[];
  plannedArrival?: string; // Geplante Ankunftszeit am nächsten Halt
  delay?: number; // Verspätung in Minuten
}

/**
 * ConnectionsPanel-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Minimalistisches, technisches Design
 * - Sehr große, klare Schrift
 * - Farbcodierte Zugnummern
 * - Professionelle Darstellung
 * - Maximale Lesbarkeit
 */
export default function ConnectionsPanel({ 
  connections, 
  plannedArrival,
  delay = 0
}: ConnectionsPanelProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!connections || connections.length === 0) {
      setShouldShow(false);
      return;
    }

    // Im Development-Modus immer anzeigen
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      setShouldShow(true);
      return;
    }

    // In Production: Nur in den letzten 2 Minuten anzeigen
    if (!plannedArrival) {
      setShouldShow(false);
      return;
    }

    // Berechne Ankunftszeit mit Verspätung
    const [hours, minutes] = plannedArrival.split(':').map(Number);
    const arrivalDate = new Date(currentTime);
    arrivalDate.setHours(hours, minutes + delay, 0, 0);
    
    // Wenn die Zeit bereits heute vorbei ist, nimm morgen
    if (arrivalDate < currentTime) {
      arrivalDate.setDate(arrivalDate.getDate() + 1);
    }
    
    const diffMs = arrivalDate.getTime() - currentTime.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    // Zeige nur in den letzten 2 Minuten
    setShouldShow(diffMinutes <= 2 && diffMinutes >= 0);
  }, [currentTime, plannedArrival, delay, connections]);

  if (!connections || connections.length === 0 || !shouldShow) return null;

  const getBadgeStyle = (trainNumber: string) => {
    const upper = trainNumber.toUpperCase();
    if (upper.startsWith("ICE") || upper.startsWith("IC") || upper.startsWith("EC")) {
      return "bg-white text-black border-2 border-[#cccccc]";
    } else if (upper.startsWith("S")) {
      return "bg-[#16a34a] text-white";
    } else if (upper.startsWith("U")) {
      return "bg-[#2563eb] text-white";
    }
    return "bg-[#f5f5f5] text-black border border-[#e5e5e5]";
  };

  return (
    <div className="bg-white border-t border-[#e5e5e5] px-12 py-8">
      <div className="text-3xl font-bold text-black mb-6 tracking-tight">Anschlüsse am nächsten Halt</div>
      <div className="space-y-5">
        {connections.map((connection, index) => (
          <div
            key={index}
            className="flex items-center gap-8"
          >
            {/* Zugnummer Badge */}
            <div className={`font-black text-2xl px-5 py-3 flex-shrink-0 ${getBadgeStyle(connection.trainNumber)}`}>
              {connection.trainNumber}
            </div>

            {/* Zielbahnhof */}
            <div className="flex-1 min-w-0">
              <div className="text-5xl font-black text-black leading-tight break-words tracking-tight">
                {connection.destination}
              </div>
            </div>

            {/* Gleis und Abfahrtszeit */}
            <div className="flex items-center gap-8 flex-shrink-0">
              {/* Gleis Badge */}
              <div className="bg-black text-white px-5 py-3 border border-[#666666]">
                <div className="text-2xl font-black leading-none whitespace-nowrap">{connection.platform}</div>
              </div>

              {/* Abfahrtszeit */}
              <div className="text-4xl font-black text-black tabular-nums leading-none whitespace-nowrap tracking-tight">
                {connection.departureTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
