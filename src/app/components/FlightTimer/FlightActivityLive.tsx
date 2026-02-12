"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

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

  useEffect(() => {
    const channel = supabase
      .channel("flight-activity")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "flights",
        },
        () => {
          setSeconds(0);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return (
    <section 
    className="flex items-center justify-center p-2 gap-2"
    aria-live="polite"
    >
      <p className="font-bold text-blue-950">✈️ Last Flight:</p>

      <p className=" font-serif text-sky-200">
        {hours > 0 ? `${hours}h` : ""} {minutes % 60}m {seconds % 60}s ago
      </p>
    </section>
  );
}
