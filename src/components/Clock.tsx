"use client";

import { useEffect, useState } from "react";

/**
 * Clock-Komponente im DB-Stil
 * Kompakte Uhrzeit-Anzeige
 */
export default function Clock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return (
    <div className="text-white">
      <div className="text-5xl font-bold tabular-nums tracking-wider">
        {formattedTime}
      </div>
    </div>
  );
}
