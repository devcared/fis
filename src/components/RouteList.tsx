"use client";

import { Station } from "@/types/train";
import { useEffect, useRef } from "react";

interface RouteListProps {
  stations: Station[];
  currentStationIndex: number;
  nextStationIndex: number;
}

/**
 * RouteList-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Professionelle Tabellenstruktur
 * - Volle Breite, klare Zeilen
 * - Sehr große, fette Schrift
 * - Alternierende Hintergründe für bessere Lesbarkeit
 * - Rote Markierung für nächsten Halt
 * - Automatisches Smooth-Scrolling
 */
export default function RouteList({
  stations,
  currentStationIndex,
  nextStationIndex
}: RouteListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const isScrollingRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Zeige nur kommende Stationen
  const upcomingStations = stations.slice(currentStationIndex + 1);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Easing-Funktion für smooth scrolling
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    // Scroll-Funktion: langsam runter, dann smooth hoch
    const performScroll = () => {
      if (!container || isScrollingRef.current) return;

      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll <= 0) return; // Kein Scroll nötig

      isScrollingRef.current = true;
      scrollPositionRef.current = 0;
      container.scrollTop = 0;

      const scrollSpeed = 0.3; // Pixel pro Frame (langsam nach unten)
      let isScrollingDown = true;
      let scrollStartTime = 0;
      let scrollDuration = 0;
      const scrollUpDuration = 800; // 800ms für smoothes Hochscrollen

      const scroll = (currentTime: number) => {
        if (!container) return;

        const maxScroll = container.scrollHeight - container.clientHeight;

        if (isScrollingDown) {
          // Langsam nach unten scrollen
          scrollPositionRef.current += scrollSpeed;
          
          if (scrollPositionRef.current >= maxScroll) {
            // Am Ende angekommen, smooth nach oben
            isScrollingDown = false;
            scrollStartTime = currentTime;
            scrollPositionRef.current = maxScroll;
          } else {
            container.scrollTop = scrollPositionRef.current;
            animationFrameIdRef.current = requestAnimationFrame(scroll);
            return;
          }
        }

        // Smooth nach oben scrollen mit easing
        if (scrollStartTime === 0) {
          scrollStartTime = currentTime;
        }
        
        scrollDuration = currentTime - scrollStartTime;
        const progress = Math.min(scrollDuration / scrollUpDuration, 1);
        const easedProgress = easeOutCubic(progress);
        
        scrollPositionRef.current = maxScroll * (1 - easedProgress);
        container.scrollTop = scrollPositionRef.current;
        
        if (progress >= 1) {
          // Oben angekommen, Scroll beenden
          scrollPositionRef.current = 0;
          container.scrollTop = 0;
          isScrollingRef.current = false;
          if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
          }
        } else {
          animationFrameIdRef.current = requestAnimationFrame(scroll);
        }
      };

      animationFrameIdRef.current = requestAnimationFrame(scroll);
    };

    // Starte Scroll-Intervall: alle 45 Sekunden scrollen
    const startScrollInterval = () => {
      // Erster Scroll nach 10 Sekunden
      const initialTimeout = setTimeout(() => {
        performScroll();
        
        // Dann alle 45 Sekunden wiederholen
        intervalIdRef.current = setInterval(() => {
          performScroll();
        }, 45000); // 45 Sekunden Pause zwischen Scrolls
      }, 10000); // 10 Sekunden initiale Wartezeit

      return () => {
        clearTimeout(initialTimeout);
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      };
    };

    const cleanup = startScrollInterval();

    return () => {
      cleanup();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [upcomingStations.length]);

  return (
    <div className="bg-white relative h-full w-full">
      {/* Stationsliste mit Auto-Scroll - volle Breite */}
      <div 
        ref={scrollContainerRef}
        className="h-full overflow-y-auto w-full"
        style={{ 
          scrollBehavior: 'auto'
        }}
      >
        {upcomingStations.map((station, index) => {
          const globalIndex = currentStationIndex + 1 + index;
          const isNext = globalIndex === nextStationIndex;
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={globalIndex}
              className={`flex items-center justify-between px-14 py-8 w-full ${
                isEven ? "bg-white" : "bg-[#f5f5f5]"
              } border-b border-[#e5e5e5] ${
                isNext ? "border-l-4 border-l-[#DC2626]" : ""
              }`}
            >
              {/* Station Name links */}
              <div className="flex items-center gap-12 flex-1 min-w-0 pr-8">
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="text-6xl font-black text-black leading-tight break-words tracking-tight">
                    {station.name}
                  </div>
                </div>
              </div>

              {/* Rechte Seite: Ankunftszeiten untereinander + Gleis-Badge */}
              <div className="flex items-center gap-8 flex-shrink-0">
                {/* Ankunftszeiten untereinander */}
                <div className="flex flex-col items-end gap-2">
                  <div className="text-4xl text-black font-black leading-tight tabular-nums whitespace-nowrap">
                    {station.arrivalTime}
                  </div>
                  <div className="text-4xl text-black font-black leading-tight tabular-nums whitespace-nowrap">
                    {station.departureTime}
                  </div>
                </div>

                {/* Gleis-Badge */}
                {station.platformDisplay && (
                  <div className="bg-black text-white px-7 py-5 border border-[#666666] flex-shrink-0">
                    <div className="text-3xl font-black leading-none whitespace-nowrap">{station.platformDisplay}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
