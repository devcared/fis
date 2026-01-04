/**
 * TypeScript-Typen für Zugdaten
 * Diese Struktur kann später gegen eine echte API ausgetauscht werden
 */

export interface Station {
  name: string;
  arrivalTime: string; // Format: "HH:mm"
  departureTime: string; // Format: "HH:mm"
  platform?: string;
  platformDisplay?: string; // Format: "GI 3" für Anzeige
}

export interface Connection {
  trainNumber: string;
  destination: string;
  platform: string;
  departureTime: string;
}

export interface TrainData {
  trainNumber: string;
  startStation: string;
  endStation: string;
  currentStation: string;
  currentStationIndex: number;
  stations: Station[];
  delay: number; // Verspätung in Minuten
  delayReason?: string; // Grund der Verspätung
  nextStation: string; // Nächster Halt
  nextStationIndex: number;
  nextStationPlannedArrival: string; // Geplante Ankunftszeit
  exitDirection?: string; // "Rechts" oder "Links"
  footerMessage?: string; // Lauftext in der Fußzeile
  specialMessages: string[]; // Sondermeldungen
  speed?: number; // Aktuelle Geschwindigkeit in km/h
  connections?: Connection[]; // Anschlussverbindungen am nächsten Halt
  welcomeMessage?: string; // Willkommensnachricht
  carSequence?: string; // Wagenreihung (z.B. "1-8")
  wifiAvailable?: boolean; // WLAN verfügbar
  remainingTravelTime?: string; // Verbleibende Fahrtzeit
}

