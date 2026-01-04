"use client";

import { useEffect, useState } from "react";

interface StatusBarProps {
  delay: number;
  specialMessages: string[];
}

/**
 * StatusBar-Komponente im DB-Stil
 * Kompakte Anzeige von Verspätung und Sondermeldungen
 */
export default function StatusBar({ delay, specialMessages }: StatusBarProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (delay > 5) {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setIsBlinking(false);
    }
  }, [delay]);

  return (
    <div className="flex flex-col gap-3">
      {/* Verspätungsanzeige */}
      {delay > 0 && (
        <div
          className={`px-4 py-3 ${
            delay > 5
              ? isBlinking
                ? "bg-red-700 text-white"
                : "bg-red-600 text-white"
              : "bg-red-500 text-white"
          } transition-colors duration-500`}
        >
          <div className="text-2xl font-bold">
            Verspätung: +{delay} min
          </div>
        </div>
      )}

      {/* Sondermeldungen - kompakt */}
      {specialMessages.length > 0 && (
        <div className="bg-white text-red-900 px-4 py-3 border-2 border-red-300">
          <div className="text-xl font-bold mb-2 text-red-800">Hinweise</div>
          <div className="flex flex-col gap-1">
            {specialMessages.map((message, index) => (
              <div
                key={index}
                className="text-lg flex items-start gap-2 text-red-900"
              >
                <span className="text-red-600 font-bold">•</span>
                <span>{message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
