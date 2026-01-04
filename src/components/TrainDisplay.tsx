"use client";

import { useState, useEffect } from "react";
import { TrainData } from "@/types/train";
import HeaderBar from "@/components/HeaderBar";
import NextStopPanel from "@/components/NextStopPanel";
import DelayBanner from "@/components/DelayBanner";
import RouteList from "@/components/RouteList";
import FooterTicker from "@/components/FooterTicker";
import WelcomeMessage from "@/components/WelcomeMessage";
import InfoPanel from "@/components/InfoPanel";
import ConnectionsPanel from "@/components/ConnectionsPanel";
import EndStationMessage from "@/components/EndStationMessage";
import DevMenu from "@/components/DevMenu";
import { motion } from "framer-motion";

interface TrainDisplayProps {
  initialData: TrainData;
}

/**
 * TrainDisplay-Komponente
 * 
 * Client-Component-Wrapper für die gesamte Anzeige
 * Verwaltet den State der TrainData für das Dev-Menü
 * Erkennt Endstation und zeigt entsprechende Meldung im RouteList-Bereich
 * Passt sich an, wenn Dev-Menü geöffnet ist - wie eine Sidebar
 */
export default function TrainDisplay({ initialData }: TrainDisplayProps) {
  const [trainData, setTrainData] = useState<TrainData>(initialData);
  const [isEndStation, setIsEndStation] = useState(false);
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);

  // Update trainData wenn initialData sich ändert (z.B. bei Server-Refresh)
  useEffect(() => {
    setTrainData(initialData);
  }, [initialData]);

  // Prüfe ob Endstation erreicht wurde
  useEffect(() => {
    const isEnd = trainData.currentStationIndex >= trainData.stations.length - 1;
    setIsEndStation(isEnd);
  }, [trainData.currentStationIndex, trainData.stations.length]);

  const handleDataUpdate = (updatedData: TrainData) => {
    setTrainData(updatedData);
  };

  const handleMenuToggle = (isOpen: boolean) => {
    setIsDevMenuOpen(isOpen);
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-100">
      {/* Dev-Menü - nur im Development-Modus */}
      <DevMenu 
        trainData={trainData} 
        onUpdate={handleDataUpdate}
        onMenuToggle={handleMenuToggle}
      />

      {/* Main Content - wird nach rechts gedrückt wenn Menü offen ist */}
      <motion.div
        initial={false}
        animate={{
          width: isDevMenuOpen ? 'calc(100% - 384px)' : '100%',
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="flex-shrink-0 bg-white flex flex-col overflow-hidden"
        style={{ 
          aspectRatio: '16/9',
          height: '100vh',
          maxHeight: '100vh'
        }}
      >
        {/* Rote Akzentlinie oben - präzise 2px */}
        <div className="h-0.5 bg-red-600 flex-shrink-0"></div>
        
        {/* Header - feste Höhe */}
        <div className="flex-shrink-0 relative">
          <HeaderBar exitDirection={trainData.exitDirection} />
        </div>
        
        {/* Hauptbereich - weißer Hintergrund, flexibel */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-0">
          {/* Willkommensnachricht */}
          {trainData.welcomeMessage && (
            <div className="flex-shrink-0">
              <WelcomeMessage message={trainData.welcomeMessage} />
            </div>
          )}

          {/* Nächster Halt Panel - flex-shrink-0 für statisches Layout */}
          {!isEndStation && (
            <div className="flex-shrink-0">
              <NextStopPanel
                nextStation={trainData.nextStation}
                plannedArrival={trainData.nextStationPlannedArrival}
                delay={trainData.delay}
                delayReason={trainData.delayReason}
                platformDisplay={trainData.stations[trainData.nextStationIndex]?.platformDisplay}
              />
            </div>
          )}

          {/* Verspätungsbanner - separater Container */}
          {!isEndStation && trainData.delay > 0 && trainData.delayReason && (
            <div className="flex-shrink-0">
              <DelayBanner delayReason={trainData.delayReason} />
            </div>
          )}

          {/* Anschlussverbindungen - wird nur in den letzten 2 Minuten angezeigt */}
          {!isEndStation && trainData.connections && trainData.connections.length > 0 && (
            <div className="flex-shrink-0">
              <ConnectionsPanel 
                connections={trainData.connections}
                plannedArrival={trainData.nextStationPlannedArrival}
                delay={trainData.delay}
              />
            </div>
          )}
          
          {/* Rote Trennlinie - präzise 2px */}
          <div className="h-0.5 bg-red-600 flex-shrink-0"></div>
          
          {/* Streckenliste ODER Endstation-Meldung - Auto-Scroll Container */}
          <div className="flex-1 overflow-hidden min-h-0">
            {isEndStation ? (
              <EndStationMessage endStation={trainData.endStation} />
            ) : (
              <RouteList
                stations={trainData.stations}
                currentStationIndex={trainData.currentStationIndex}
                nextStationIndex={trainData.nextStationIndex}
              />
            )}
          </div>

          {/* Info-Panel (Geschwindigkeit, WLAN, etc.) */}
          {!isEndStation && (
            <div className="flex-shrink-0">
              <InfoPanel
                speed={trainData.speed}
                wifiAvailable={trainData.wifiAvailable}
                remainingTravelTime={trainData.remainingTravelTime}
                carSequence={trainData.carSequence}
              />
            </div>
          )}
        </div>
        
        {/* Rote Akzentlinie unten - präzise 2px */}
        <div className="h-0.5 bg-red-600 flex-shrink-0"></div>
        
        {/* Footer - feste Höhe */}
        <div className="flex-shrink-0">
          <FooterTicker message={trainData.footerMessage} />
        </div>
      </motion.div>
    </div>
  );
}
