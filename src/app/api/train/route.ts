import { NextResponse } from "next/server";
import { TrainData } from "@/types/train";
import { getTrainData } from "@/lib/trainService";

/**
 * API Route für Zugdaten
 * 
 * GET /api/train
 * 
 * Gibt die aktuellen Zugdaten zurück.
 * 
 * Diese Route nutzt den trainService, der später gegen eine echte API
 * ausgetauscht werden kann. Die API Route bleibt als Proxy bestehen,
 * falls Client-Side Komponenten die Daten benötigen.
 */
export async function GET(): Promise<NextResponse<TrainData>> {
  try {
    const trainData = await getTrainData();
    return NextResponse.json(trainData);
  } catch (error) {
    console.error("Error fetching train data:", error);
    return NextResponse.json(
      { error: "Failed to fetch train data" } as any,
      { status: 500 }
    );
  }
}

