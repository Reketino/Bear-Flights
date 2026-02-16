"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { secondsSince } from "@/lib/flighttimer/timer";
import { formatDuration } from "@/lib/flighttimer/format";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function FlightActivityLive({
  initialTimestamp,
}: {
  initialTimestamp: string;
}) {
  const [seconds, setSeconds] = useState(() =>
    secondsSince(initialTimestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTimestamp]);

  useEffect(() => {
    const channel = supabase
    .channel("flights-realtime")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "flights",
      },
      (payload) => {
        const observedAt = payload.new.last_seen;
        setSeconds(secondsSince(observedAt));
      },
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const { h, m, s } = formatDuration(seconds);

  return (
    <section
      className="flex items-center justify-center p-2 gap-2"
      aria-live="polite"
    >
      <p className="font-bold text-blue-950">✈️ Last Flight:</p>

      <p className=" font-serif text-sky-200">
        {h > 0 && `${h}h `}
        {m}m {s}s ago
      </p>
    </section>
  );
}
