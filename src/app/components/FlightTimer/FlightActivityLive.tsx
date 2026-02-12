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
}
