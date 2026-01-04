/**
 * Mock-Daten für Zuginformationen
 * 
 * HINWEIS: Diese Datei wird später durch einen API-Call ersetzt.
 * Die API sollte die gleiche Datenstruktur (TrainData) zurückgeben.
 * 
 * Beispiel-Integration:
 * - Erstelle eine API-Route unter /app/api/train/route.ts
 * - Oder verwende Server Actions in /app/actions/train.ts
 * - Oder fetch direkt in der Komponente mit useEffect/SWR/React Query
 */

import { TrainData } from "@/types/train";

export const mockTrainData: TrainData = {
  trainNumber: "ICE 621",
  startStation: "Köln Messe/Deutz",
  endStation: "München Hbf",
  currentStation: "Butzbach Bahnhof",
  currentStationIndex: 0,
  nextStation: "Langgöns",
  nextStationIndex: 1,
  nextStationPlannedArrival: "17:03",
  delay: 10,
  delayReason: "Verspätung: Weichenstörung",
  exitDirection: "Rechts",
  footerMessage: "++ Bitte beachten Sie die geltenden Beförderungsbedingungen und halten Sie Ihre Fahrkarte bereit ++",
  specialMessages: [],
  speed: 187,
  wifiAvailable: true,
  remainingTravelTime: "6 Std. 45 Min.",
  connections: [
    {
      trainNumber: "ICE 698",
      destination: "Berlin-Gesundbrunnen",
      platform: "11",
      departureTime: "20:15"
    },
    {
      trainNumber: "U5",
      destination: "Preungesheim, Frankfurt a.",
      platform: "A",
      departureTime: "20:18"
    },
    {
      trainNumber: "S2",
      destination: "Niederhausen (Taunus)",
      platform: "103",
      departureTime: "20:22"
    }
  ],
  stations: [
    {
      name: "Butzbach Bahnhof",
      arrivalTime: "16:55",
      departureTime: "16:57",
      platform: "1",
      platformDisplay: "GI 1"
    },
    {
      name: "Langgöns",
      arrivalTime: "17:18",
      departureTime: "17:19",
      platform: "8",
      platformDisplay: "GI 8"
    },
    {
      name: "Wetzlar",
      arrivalTime: "17:28",
      departureTime: "17:30",
      platform: "2",
      platformDisplay: "GI 2"
    },
    {
      name: "Gießen Bahnhof",
      arrivalTime: "17:42",
      departureTime: "17:44",
      platform: "5",
      platformDisplay: "GI 5"
    },
    {
      name: "Marburg (Lahn)",
      arrivalTime: "17:58",
      departureTime: "18:00",
      platform: "3",
      platformDisplay: "GI 3"
    },
    {
      name: "Kassel-Wilhelmshöhe",
      arrivalTime: "18:25",
      departureTime: "18:28",
      platform: "7",
      platformDisplay: "GI 7"
    },
    {
      name: "Fulda",
      arrivalTime: "18:55",
      departureTime: "18:57",
      platform: "4",
      platformDisplay: "GI 4"
    },
    {
      name: "Aschaffenburg Hbf",
      arrivalTime: "19:35",
      departureTime: "19:37",
      platform: "3",
      platformDisplay: "GI 3"
    },
    {
      name: "Hanau Hbf",
      arrivalTime: "19:52",
      departureTime: "19:54",
      platform: "6",
      platformDisplay: "GI 6"
    },
    {
      name: "Frankfurt Hbf",
      arrivalTime: "20:05",
      departureTime: "20:10",
      platform: "9",
      platformDisplay: "GI 9"
    },
    {
      name: "Frankfurt(M)Flughafen",
      arrivalTime: "20:25",
      departureTime: "20:27",
      platform: "4",
      platformDisplay: "GI 4"
    },
    {
      name: "Mannheim Hbf",
      arrivalTime: "21:05",
      departureTime: "21:08",
      platform: "12",
      platformDisplay: "GI 12"
    },
    {
      name: "Heidelberg Hbf",
      arrivalTime: "21:22",
      departureTime: "21:24",
      platform: "2",
      platformDisplay: "GI 2"
    },
    {
      name: "Stuttgart Hbf",
      arrivalTime: "22:05",
      departureTime: "22:10",
      platform: "15",
      platformDisplay: "GI 15"
    },
    {
      name: "Ulm Hbf",
      arrivalTime: "22:48",
      departureTime: "22:50",
      platform: "8",
      platformDisplay: "GI 8"
    },
    {
      name: "Augsburg Hbf",
      arrivalTime: "23:18",
      departureTime: "23:20",
      platform: "5",
      platformDisplay: "GI 5"
    },
    {
      name: "München Hbf",
      arrivalTime: "23:55",
      departureTime: "23:55",
      platform: "18",
      platformDisplay: "GI 18"
    }
  ]
};

