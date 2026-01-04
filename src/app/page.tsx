import TrainDisplay from "@/components/TrainDisplay";
import { getTrainData } from "@/lib/trainService";

/**
 * Hauptseite der Fahrgastinformationsanzeige
 * 
 * DESIGN nach Screenshot - optimiert für 16:9 Full-HD (1920×1080):
 * - Weißer Hauptbereich
 * - Dunkler Header & Footer
 * - Rote Akzentlinien oben & unten (präzise 2px)
 * - Sehr große, fette Schrift für nächsten Halt und Uhrzeiten
 * - Klare, sachliche Typografie (Industrie-/DB-Stil)
 * - Viel Weißraum, keine verspielten Effekte
 * - Kontrastreich, gut lesbar aus mehreren Metern
 * - Statisches Layout ohne Layout-Shifts
 * 
 * API-INTEGRATION:
 * Die Daten werden aktuell über getTrainData() geladen (Mock-Daten).
 * 
 * Für die Integration einer echten API:
 * 
 * Option 1: REST-API
 * - Ändere src/lib/trainService.ts
 * - fetch('https://api.example.com/train/current')
 * 
 * Option 2: WebSocket (für Live-Updates)
 * - Client-Side: useEffect mit WebSocket
 * - Oder: Server-Sent Events (SSE) in separater Route
 * 
 * Option 3: MQTT
 * - Client-Side MQTT-Client (z.B. mqtt.js)
 * - Subscribe auf Topic für Zugdaten
 * 
 * Die Datenstruktur (TrainData) bleibt gleich, nur die Quelle ändert sich.
 */
export default async function Home() {
  const trainData = await getTrainData();

  return <TrainDisplay initialData={trainData} />;
}
