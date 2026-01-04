"use client";

import { useEffect, useRef, useState } from "react";

interface FooterTickerProps {
  message?: string;
}

/**
 * FooterTicker-Komponente
 * 
 * DESIGN-PHILOSOPHIE: Technischer Lauftext
 * - Große, klare Schrift
 * - Kontinuierliches Scrolling
 * - Professionelle Darstellung
 */
export default function FooterTicker({ 
  message = "++ Bitte beachten Sie die geltenden Beförderungsbedingungen und halten Sie Ihre Fahrkarte bereit ++" 
}: FooterTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    const container = containerRef.current;
    if (!ticker || !container) return;

    const tickerWidth = ticker.scrollWidth;
    const containerWidth = container.offsetWidth;
    
    // Starte in der Mitte
    const startOffset = (containerWidth - tickerWidth) / 2;
    let currentOffset = startOffset;
    
    // Scroll-Geschwindigkeit (Pixel pro Frame)
    const scrollSpeed = 1.5;

    const animate = () => {
      // Scroll nach rechts
      currentOffset -= scrollSpeed;
      
      // Wenn komplett nach rechts raus, starte von links wieder
      if (currentOffset <= -tickerWidth) {
        currentOffset = containerWidth;
      }
      
      setOffset(currentOffset);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initiale Position setzen
    setOffset(startOffset);
    
    // Starte Animation nach kurzer Verzögerung
    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [message]);

  return (
    <div 
      ref={containerRef}
      className="bg-black text-white h-20 flex items-center overflow-hidden relative"
    >
      <div
        ref={tickerRef}
        className="text-3xl font-semibold whitespace-nowrap absolute"
        style={{
          transform: `translateX(${offset}px)`,
          left: 0
        }}
      >
        {message}
      </div>
    </div>
  );
}
