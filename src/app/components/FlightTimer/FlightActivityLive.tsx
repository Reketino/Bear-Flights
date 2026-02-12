"use client";
import { useEffect, useState } from "react";

export default function FlightActivityLive({
  initialSeconds,
}: {
  initialSeconds: number;
}) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return (
      <section className="mt-4 mb-4">
      <p className="text-center font-medium text-blue-950">
        ✈️ Last flight observed:
      </p>

      <p className="text-center font-light text-green-600">
        {hours > 0 ? `${hours}h` : ""} {minutes % 60}m {seconds % 60}s ago
      </p>
    </section>
  )
}
