"use client";

import { Station } from "@/types/train";
import { useEffect, useState } from "react";

interface RouteDisplayProps {
  stations: Station[];
  currentStationIndex: number;
  currentStation: string;
  delay: number;
}

/**
 * RouteDisplay-Komponente im DB-Stil
 * Zeigt "Nächste Station" mit Ankunftszeit und "Ankunft in X min"
 */
export default function RouteDisplay({ 
  stations, 
  currentStationIndex, 
  currentStation,
  delay
}: RouteDisplayProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Bestimme den nächsten Halt
  const nextStationIndex = currentStationIndex + 1;
  const nextStation = nextStationIndex < stations.length 
    ? stations[nextStationIndex] 
    : null;

  // Berechne "Ankunft in X min"
  const calculateMinutesUntilArrival = (arrivalTime: string): number | null => {
    if (!arrivalTime) return null;
    
    const [hours, minutes] = arrivalTime.split(':').map(Number);
    const arrivalDate = new Date(currentTime);
    arrivalDate.setHours(hours, minutes, 0, 0);
    
    // Wenn die Zeit bereits heute vorbei ist, nimm morgen
    if (arrivalDate < currentTime) {
      arrivalDate.setDate(arrivalDate.getDate() + 1);
    }
    
    const diffMs = arrivalDate.getTime() - currentTime.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    return diffMinutes;
  };

  const minutesUntilArrival = nextStation 
    ? calculateMinutesUntilArrival(nextStation.arrivalTime)
    : null;

  // Berechne Ankunftszeit mit Verspätung
  const getArrivalTimeWithDelay = (arrivalTime: string): string => {
    if (!arrivalTime || delay === 0) return arrivalTime;
    
    const [hours, minutes] = arrivalTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + delay, 0, 0);
    
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  // Zeige kommende Stationen (kompakt)
  const upcomingStations = stations.slice(
    currentStationIndex + 1,
    Math.min(stations.length, currentStationIndex + 6)
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Nächste Station - prominent */}
      {nextStation && (
        <div className="bg-white text-red-900 px-6 py-4 border-2 border-red-300">
          <div className="text-2xl font-bold mb-3 text-red-800">Nächste Station</div>
          <div className="text-5xl font-bold mb-2 text-red-900">{nextStation.name}</div>
          
          <div className="flex items-center gap-4 text-3xl font-semibold mb-2 text-red-800">
            {minutesUntilArrival !== null && (
              <span>Ankunft in {minutesUntilArrival} min</span>
            )}
          </div>
          
          <div className="flex items-center gap-6 text-2xl">
            <span className={delay > 0 ? "text-red-700 font-bold" : "text-red-600 font-bold"}>
              {getArrivalTimeWithDelay(nextStation.arrivalTime)}
            </span>
            {nextStation.platform && (
              <span className="font-bold text-red-900">Gleis {nextStation.platform}</span>
            )}
          </div>
        </div>
      )}

      {/* Weitere Stationen - kompakt */}
      {upcomingStations.length > 0 && (
        <div className="bg-red-800 border-2 border-red-300 px-6 py-4">
          <div className="text-2xl font-bold text-white mb-3">Weitere Stationen</div>
          <div className="flex flex-col gap-2">
            {upcomingStations.map((station, index) => {
              const globalIndex = currentStationIndex + 1 + index;
              const minutes = calculateMinutesUntilArrival(station.arrivalTime);
              
              return (
                <div
                  key={globalIndex}
                  className="flex items-center justify-between text-white text-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-semibold min-w-[200px]">
                      {station.arrivalTime} {station.name}
                    </span>
                    {station.platform && (
                      <span className="text-lg">Gleis {station.platform}</span>
                    )}
                  </div>
                  {minutes !== null && minutes > 0 && (
                    <span className="text-lg text-gray-300">
                      in {minutes} min
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
