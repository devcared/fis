import { TrainData } from "@/types/train";
import { mockTrainData } from "@/data/trainData";

/**
 * Service-Funktion zum Laden von Zugdaten
 * 
 * Diese Funktion kann später gegen eine echte API ausgetauscht werden.
 * 
 * Beispiel für echte API:
 * 
 * export async function getTrainData(): Promise<TrainData> {
 *   const response = await fetch('https://api.example.com/train/current', {
 *     headers: {
 *       'Authorization': `Bearer ${process.env.API_KEY}`,
 *       'Content-Type': 'application/json',
 *     },
 *     cache: 'no-store', // Für Live-Daten
 *   });
 * 
 *   if (!response.ok) {
 *     throw new Error(`Failed to fetch train data: ${response.statusText}`);
 *   }
 * 
 *   return response.json();
 * }
 */
export async function getTrainData(): Promise<TrainData> {
  // TODO: Hier später echte API einbinden
  // const response = await fetch('https://api.example.com/train/current');
  // return response.json();
  
  // Aktuell: Mock-Daten zurückgeben
  // In Production: Diese Funktion würde die echte API aufrufen
  return mockTrainData;
}

