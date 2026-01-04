"use client";

import { TrainData } from "@/types/train";
import { useState, useEffect } from "react";
import { Settings, ArrowRight, ArrowLeft, Clock, Zap, Wifi, MessageSquare, Navigation, RotateCcw, X, AlertTriangle, Train, MapPin, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DevMenuProps {
  trainData: TrainData;
  onUpdate: (updatedData: TrainData) => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

/**
 * DevMenu-Komponente
 * 
 * Nur im Development-Modus sichtbar
 * Erweiterte Test-Funktionen für alle Aspekte der Anzeige
 * Positioniert links außerhalb des Displays
 */
export default function DevMenu({ trainData, onUpdate, onMenuToggle }: DevMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [delayInput, setDelayInput] = useState(trainData.delay.toString());
  const [speedInput, setSpeedInput] = useState(trainData.speed?.toString() || "0");
  const [footerMessageInput, setFooterMessageInput] = useState(trainData.footerMessage || "");
  const [remainingTimeInput, setRemainingTimeInput] = useState(trainData.remainingTravelTime || "");
  const [exitDirectionInput, setExitDirectionInput] = useState(trainData.exitDirection || "Rechts");
  const [selectedStationIndex, setSelectedStationIndex] = useState(trainData.currentStationIndex);
  const [delayReasonInput, setDelayReasonInput] = useState(trainData.delayReason || "");
  const [trainNumberInput, setTrainNumberInput] = useState(trainData.trainNumber || "");
  const [welcomeMessageInput, setWelcomeMessageInput] = useState(trainData.welcomeMessage || "");
  const [platformInput, setPlatformInput] = useState(trainData.stations[trainData.nextStationIndex]?.platformDisplay || "");

  // Update inputs when trainData changes
  useEffect(() => {
    setDelayInput(trainData.delay.toString());
    setSpeedInput(trainData.speed?.toString() || "0");
    setFooterMessageInput(trainData.footerMessage || "");
    setRemainingTimeInput(trainData.remainingTravelTime || "");
    setExitDirectionInput(trainData.exitDirection || "Rechts");
    setSelectedStationIndex(trainData.currentStationIndex);
    setDelayReasonInput(trainData.delayReason || "");
    setTrainNumberInput(trainData.trainNumber || "");
    setWelcomeMessageInput(trainData.welcomeMessage || "");
    setPlatformInput(trainData.stations[trainData.nextStationIndex]?.platformDisplay || "");
  }, [trainData]);

  // Notify parent about menu state
  useEffect(() => {
    onMenuToggle?.(isOpen);
  }, [isOpen, onMenuToggle]);

  // Nur im Development-Modus anzeigen
  // Verwende typeof window !== 'undefined' als zusätzliche Prüfung für Client-Side
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return null;
  }

  const handleNextStation = () => {
    if (trainData.currentStationIndex < trainData.stations.length - 1) {
      const newIndex = trainData.currentStationIndex + 1;
      const newNextIndex = newIndex + 1 < trainData.stations.length ? newIndex + 1 : newIndex;
      
      onUpdate({
        ...trainData,
        currentStationIndex: newIndex,
        currentStation: trainData.stations[newIndex].name,
        nextStationIndex: newNextIndex,
        nextStation: trainData.stations[newNextIndex]?.name || trainData.stations[newIndex].name,
        nextStationPlannedArrival: trainData.stations[newNextIndex]?.arrivalTime || trainData.stations[newIndex].arrivalTime,
      });
    }
  };

  const handlePreviousStation = () => {
    if (trainData.currentStationIndex > 0) {
      const newIndex = trainData.currentStationIndex - 1;
      const newNextIndex = newIndex + 1;
      
      onUpdate({
        ...trainData,
        currentStationIndex: newIndex,
        currentStation: trainData.stations[newIndex].name,
        nextStationIndex: newNextIndex,
        nextStation: trainData.stations[newNextIndex]?.name || trainData.stations[newIndex].name,
        nextStationPlannedArrival: trainData.stations[newNextIndex]?.arrivalTime || trainData.stations[newIndex].arrivalTime,
      });
    }
  };

  const handleJumpToStation = () => {
    if (selectedStationIndex >= 0 && selectedStationIndex < trainData.stations.length) {
      const newNextIndex = selectedStationIndex + 1 < trainData.stations.length ? selectedStationIndex + 1 : selectedStationIndex;
      
      onUpdate({
        ...trainData,
        currentStationIndex: selectedStationIndex,
        currentStation: trainData.stations[selectedStationIndex].name,
        nextStationIndex: newNextIndex,
        nextStation: trainData.stations[newNextIndex]?.name || trainData.stations[selectedStationIndex].name,
        nextStationPlannedArrival: trainData.stations[newNextIndex]?.arrivalTime || trainData.stations[selectedStationIndex].arrivalTime,
      });
    }
  };

  const handleDelayChange = () => {
    const newDelay = parseInt(delayInput) || 0;
    onUpdate({
      ...trainData,
      delay: newDelay,
      delayReason: newDelay > 0 && delayReasonInput ? delayReasonInput : (newDelay > 0 ? "Verspätung: Weichenstörung" : undefined),
    });
  };

  const handleQuickDelay = (minutes: number) => {
    onUpdate({
      ...trainData,
      delay: minutes,
      delayReason: minutes > 0 ? "Verspätung: Weichenstörung" : undefined,
    });
    setDelayInput(minutes.toString());
  };

  const handleJumpToEndStation = () => {
    const lastIndex = trainData.stations.length - 1;
    onUpdate({
      ...trainData,
      currentStationIndex: lastIndex,
      currentStation: trainData.stations[lastIndex].name,
      nextStationIndex: lastIndex,
      nextStation: trainData.stations[lastIndex].name,
      nextStationPlannedArrival: trainData.stations[lastIndex].arrivalTime,
    });
  };

  const handleDelayReasonChange = () => {
    onUpdate({
      ...trainData,
      delayReason: delayReasonInput || undefined,
    });
  };

  const handleTrainNumberChange = () => {
    onUpdate({
      ...trainData,
      trainNumber: trainNumberInput,
    });
  };

  const handleWelcomeMessageTextChange = () => {
    onUpdate({
      ...trainData,
      welcomeMessage: welcomeMessageInput || undefined,
    });
  };

  const handlePlatformChange = () => {
    if (trainData.nextStationIndex < trainData.stations.length) {
      const updatedStations = [...trainData.stations];
      updatedStations[trainData.nextStationIndex] = {
        ...updatedStations[trainData.nextStationIndex],
        platformDisplay: platformInput,
      };
      onUpdate({
        ...trainData,
        stations: updatedStations,
      });
    }
  };

  const handleFooterTemplate = (template: string) => {
    setFooterMessageInput(template);
    onUpdate({
      ...trainData,
      footerMessage: template,
    });
  };

  const handleSpeedChange = () => {
    const newSpeed = parseInt(speedInput) || 0;
    onUpdate({
      ...trainData,
      speed: newSpeed,
    });
  };

  const handleFooterMessageChange = () => {
    onUpdate({
      ...trainData,
      footerMessage: footerMessageInput,
    });
  };

  const handleRemainingTimeChange = () => {
    onUpdate({
      ...trainData,
      remainingTravelTime: remainingTimeInput,
    });
  };

  const handleExitDirectionChange = () => {
    onUpdate({
      ...trainData,
      exitDirection: exitDirectionInput,
    });
  };

  const handleToggleWifi = () => {
    onUpdate({
      ...trainData,
      wifiAvailable: !trainData.wifiAvailable,
    });
  };

  const handleToggleWelcomeMessage = () => {
    onUpdate({
      ...trainData,
      welcomeMessage: trainData.welcomeMessage ? undefined : "Willkommen an Bord. Die Deutsche Bahn wünscht Ihnen eine angenehme Reise.",
    });
  };

  const handleToggleConnections = () => {
    if (trainData.connections && trainData.connections.length > 0) {
      onUpdate({
        ...trainData,
        connections: undefined,
      });
    } else {
      onUpdate({
        ...trainData,
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
          }
        ],
      });
    }
  };

  const handleReset = () => {
    onUpdate({
      ...trainData,
      currentStationIndex: 0,
      currentStation: trainData.stations[0].name,
      nextStationIndex: 1,
      nextStation: trainData.stations[1]?.name || trainData.stations[0].name,
      nextStationPlannedArrival: trainData.stations[1]?.arrivalTime || trainData.stations[0].arrivalTime,
      delay: 0,
      delayReason: undefined,
      speed: 187,
      wifiAvailable: true,
      remainingTravelTime: "6 Std. 45 Min.",
      exitDirection: "Rechts",
      footerMessage: "++ Bitte beachten Sie die geltenden Beförderungsbedingungen und halten Sie Ihre Fahrkarte bereit ++",
      welcomeMessage: undefined,
      connections: [],
    });
    setDelayInput("0");
    setSpeedInput("187");
    setFooterMessageInput("++ Bitte beachten Sie die geltenden Beförderungsbedingungen und halten Sie Ihre Fahrkarte bereit ++");
    setRemainingTimeInput("6 Std. 45 Min.");
    setExitDirectionInput("Rechts");
    setDelayReasonInput("");
    setTrainNumberInput(trainData.trainNumber);
    setWelcomeMessageInput("");
    setPlatformInput(trainData.stations[1]?.platformDisplay || "");
  };

  return (
    <>
      {/* Toggle-Button - links unten, fixed über dem Menü */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-gray-800/80 hover:bg-gray-800 text-white p-2 rounded transition-colors"
        title="Dev-Menü öffnen/schließen"
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* Dev-Menü Panel - im normalen Flow, drückt Content nach rechts */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 384, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex-shrink-0 h-screen bg-white border-r-2 border-gray-300 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Dev-Menü</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Aktuelle Station Info */}
                <div className="bg-gray-100 p-3 rounded">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Aktueller Status</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Aktuelle Station: <strong>{trainData.currentStation}</strong></div>
                    <div>Index: {trainData.currentStationIndex} / {trainData.stations.length - 1}</div>
                    <div>Nächster Halt: <strong>{trainData.nextStation}</strong></div>
                    <div>Verspätung: {trainData.delay} Min.</div>
                    <div>Geschwindigkeit: {trainData.speed || 0} km/h</div>
                    <div>WLAN: {trainData.wifiAvailable ? "✓" : "✗"}</div>
                  </div>
                </div>

                {/* Stationswechsel */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Stationswechsel</div>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={handlePreviousStation}
                      disabled={trainData.currentStationIndex === 0}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-800 px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Zurück</span>
                    </button>
                    <button
                      onClick={handleNextStation}
                      disabled={trainData.currentStationIndex >= trainData.stations.length - 1}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-800 px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <span>Weiter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <select
                      value={selectedStationIndex}
                      onChange={(e) => setSelectedStationIndex(parseInt(e.target.value))}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      {trainData.stations.map((station, index) => (
                        <option key={index} value={index}>
                          {station.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleJumpToStation}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Springen</span>
                    </button>
                  </div>
                  <button
                    onClick={handleJumpToEndStation}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Zu Endstation springen</span>
                  </button>
                </div>

                {/* Verspätung */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Verspätung</div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      value={delayInput}
                      onChange={(e) => setDelayInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Minuten"
                      min="0"
                    />
                    <button
                      onClick={handleDelayChange}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Setzen</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1 mb-2">
                    <button onClick={() => handleQuickDelay(0)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs">0 Min</button>
                    <button onClick={() => handleQuickDelay(5)} className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 px-2 py-1 rounded text-xs">5 Min</button>
                    <button onClick={() => handleQuickDelay(10)} className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-2 py-1 rounded text-xs">10 Min</button>
                    <button onClick={() => handleQuickDelay(15)} className="bg-orange-300 hover:bg-orange-400 text-gray-800 px-2 py-1 rounded text-xs">15 Min</button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={delayReasonInput}
                      onChange={(e) => setDelayReasonInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Verspätungsgrund..."
                    />
                    <button
                      onClick={handleDelayReasonChange}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded flex items-center gap-1 transition-colors text-sm"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Geschwindigkeit */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Geschwindigkeit</div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={speedInput}
                      onChange={(e) => setSpeedInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="km/h"
                      min="0"
                    />
                    <button
                      onClick={handleSpeedChange}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Setzen</span>
                    </button>
                  </div>
                </div>

                {/* Exit-Direction */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Ausstiegsrichtung</div>
                  <div className="flex gap-2">
                    <select
                      value={exitDirectionInput}
                      onChange={(e) => setExitDirectionInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="Rechts">Rechts</option>
                      <option value="Links">Links</option>
                    </select>
                    <button
                      onClick={handleExitDirectionChange}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-sm"
                    >
                      Setzen
                    </button>
                  </div>
                </div>

                {/* Footer-Message */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Footer-Meldung</div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={footerMessageInput}
                      onChange={(e) => setFooterMessageInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Meldung..."
                    />
                    <button
                      onClick={handleFooterMessageChange}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Setzen</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <button onClick={() => handleFooterTemplate("++ Bitte beachten Sie die geltenden Beförderungsbedingungen ++")} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs text-left">Vorlage 1</button>
                    <button onClick={() => handleFooterTemplate("++ Bitte halten Sie Ihre Fahrkarte bereit ++")} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs text-left">Vorlage 2</button>
                    <button onClick={() => handleFooterTemplate("++ Vielen Dank für Ihre Reise mit uns ++")} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs text-left">Vorlage 3</button>
                  </div>
                </div>

                {/* Verbleibende Fahrtzeit */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Verbleibende Fahrtzeit</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={remainingTimeInput}
                      onChange={(e) => setRemainingTimeInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="z.B. 6 Std. 45 Min."
                    />
                    <button
                      onClick={handleRemainingTimeChange}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-sm"
                    >
                      Setzen
                    </button>
                  </div>
                </div>

                {/* Zugnummer */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Zugnummer</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trainNumberInput}
                      onChange={(e) => setTrainNumberInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="z.B. ICE 621"
                    />
                    <button
                      onClick={handleTrainNumberChange}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <Train className="w-4 h-4" />
                      <span>Setzen</span>
                    </button>
                  </div>
                </div>

                {/* Gleis nächste Station */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Gleis (Nächste Station)</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={platformInput}
                      onChange={(e) => setPlatformInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="z.B. GI 3"
                    />
                    <button
                      onClick={handlePlatformChange}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <Hash className="w-4 h-4" />
                      <span>Setzen</span>
                    </button>
                  </div>
                </div>

                {/* Willkommensnachricht Text */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Willkommensnachricht Text</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={welcomeMessageInput}
                      onChange={(e) => setWelcomeMessageInput(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Nachricht..."
                    />
                    <button
                      onClick={handleWelcomeMessageTextChange}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Setzen</span>
                    </button>
                  </div>
                </div>

                {/* Control Panel - Icon-Buttons */}
                <div className="border-t pt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Control Panel</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={handleToggleWifi}
                      className={`p-3 rounded flex flex-col items-center justify-center gap-1 transition-colors ${
                        trainData.wifiAvailable 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                      title={`WLAN: ${trainData.wifiAvailable ? "An" : "Aus"}`}
                    >
                      <Wifi className="w-5 h-5" />
                      <span className="text-xs">WLAN</span>
                    </button>
                    <button
                      onClick={handleToggleWelcomeMessage}
                      className={`p-3 rounded flex flex-col items-center justify-center gap-1 transition-colors ${
                        trainData.welcomeMessage 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                      title={`Willkommensnachricht: ${trainData.welcomeMessage ? "An" : "Aus"}`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-xs">Willkommen</span>
                    </button>
                    <button
                      onClick={handleToggleConnections}
                      className={`p-3 rounded flex flex-col items-center justify-center gap-1 transition-colors ${
                        trainData.connections && trainData.connections.length > 0
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                      title={`Anschlüsse: ${trainData.connections && trainData.connections.length > 0 ? "An" : "Aus"}`}
                    >
                      <Navigation className="w-5 h-5" />
                      <span className="text-xs">Anschlüsse</span>
                    </button>
                  </div>
                </div>

                {/* Reset */}
                <div className="border-t pt-4">
                  <button
                    onClick={handleReset}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Zurücksetzen</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
