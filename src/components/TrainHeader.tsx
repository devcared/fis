"use client";

interface TrainHeaderProps {
  trainNumber: string;
  startStation: string;
  endStation: string;
}

/**
 * TrainHeader-Komponente im DB-Stil
 * Kompakte Anzeige von Zugnummer und Route
 */
export default function TrainHeader({ trainNumber, startStation, endStation }: TrainHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="text-red-200 text-4xl font-bold tracking-wide">
        {trainNumber}
      </div>
      <div className="text-white text-2xl font-medium mt-1">
        {startStation} → {endStation}
      </div>
    </div>
  );
}
