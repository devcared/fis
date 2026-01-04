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
 * DESIGN-PHILOSOPHIE: Modernes, ansprechendes Design
 * - Prominente Geschwindigkeitsanzeige mit Shadow
 * - Moderne, freundliche Darstellung
 * - Dezente Schatten für Tiefe
 */
export default function InfoPanel({
  speed,
  wifiAvailable,
  remainingTravelTime,
  carSequence
}: InfoPanelProps) {
  return (
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#f0f1f2] border-t border-[#e5e5e5] px-12 py-6 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-12">
        {/* Geschwindigkeit - Prominent mit Shadow */}
        {speed !== undefined && (
          <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-lg border border-[#e5e5e5]">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-md">
              <Train className="w-7 h-7 text-white flex-shrink-0" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Geschwindigkeit</span>
              <span className="text-4xl font-black text-gray-900 tabular-nums leading-none">{speed} <span className="text-2xl font-bold text-gray-500">km/h</span></span>
            </div>
          </div>
        )}

        {/* WLAN - Modern mit Shadow */}
        <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-md border border-[#e5e5e5]">
          {wifiAvailable ? (
            <>
              <div className="bg-green-100 p-2 rounded-lg">
                <Wifi className="w-5 h-5 text-green-600 flex-shrink-0" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-gray-900">WLAN verfügbar</span>
            </>
          ) : (
            <>
              <div className="bg-gray-100 p-2 rounded-lg">
                <WifiOff className="w-5 h-5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-gray-500">WLAN nicht verfügbar</span>
            </>
          )}
        </div>

        {/* Verbleibende Fahrtzeit - Modern mit Shadow */}
        {remainingTravelTime && (
          <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-md border border-[#e5e5e5]">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">Ankunft in</span>
              <span className="text-xl font-black text-gray-900">{remainingTravelTime}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
