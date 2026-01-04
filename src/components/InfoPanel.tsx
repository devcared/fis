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
 * Zeigt typische Informationen wie Geschwindigkeit, WLAN, Wagenreihung
 * Zeigt auch an wenn WLAN nicht verfügbar ist
 */
export default function InfoPanel({
  speed,
  wifiAvailable,
  remainingTravelTime,
  carSequence
}: InfoPanelProps) {
  return (
    <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between gap-8 text-lg">
        {/* Geschwindigkeit */}
        {speed !== undefined && (
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-gray-600" strokeWidth={2} />
            <span className="font-semibold text-black">{speed} km/h</span>
          </div>
        )}

        {/* WLAN - zeigt Status an (verfügbar oder nicht verfügbar) */}
        <div className="flex items-center gap-2">
          {wifiAvailable ? (
            <>
              <Wifi className="w-5 h-5 text-green-600" strokeWidth={2} />
              <span className="font-medium text-black">WLAN verfügbar</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-gray-500" strokeWidth={2} />
              <span className="font-medium text-gray-600">WLAN nicht verfügbar</span>
            </>
          )}
        </div>

        {/* Verbleibende Fahrtzeit */}
        {remainingTravelTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" strokeWidth={2} />
            <span className="font-medium text-black">Ankunft in {remainingTravelTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
