"use client";

import { Wifi, Clock, Train, WifiOff } from "lucide-react";

interface InfoPanelProps {
  speed?: number;
  wifiAvailable?: boolean;
  remainingTravelTime?: string;
  carSequence?: string;
}

/**
 * InfoPanel-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Technische Zusatzinformationen
 * - Große, klare Schrift
 * - Minimale Icons
 * - Professionelle Darstellung
 */
export default function InfoPanel({
  speed,
  wifiAvailable,
  remainingTravelTime,
  carSequence
}: InfoPanelProps) {
  return (
    <div className="bg-[#f5f5f5] border-t border-[#e5e5e5] px-12 py-5">
      <div className="flex items-center justify-between gap-12">
        {/* Geschwindigkeit */}
        {speed !== undefined && (
          <div className="flex items-center gap-3">
            <Train className="w-6 h-6 text-[#666666] flex-shrink-0" strokeWidth={2.5} />
            <span className="text-2xl font-black text-black tabular-nums">{speed} km/h</span>
          </div>
        )}

        {/* WLAN - zeigt Status an (verfügbar oder nicht verfügbar) */}
        <div className="flex items-center gap-3">
          {wifiAvailable ? (
            <>
              <Wifi className="w-6 h-6 text-green-600 flex-shrink-0" strokeWidth={2.5} />
              <span className="text-2xl font-bold text-black">WLAN verfügbar</span>
            </>
          ) : (
            <>
              <WifiOff className="w-6 h-6 text-[#666666] flex-shrink-0" strokeWidth={2.5} />
              <span className="text-2xl font-bold text-[#666666]">WLAN nicht verfügbar</span>
            </>
          )}
        </div>

        {/* Verbleibende Fahrtzeit */}
        {remainingTravelTime && (
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#666666] flex-shrink-0" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-black">Ankunft in {remainingTravelTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
