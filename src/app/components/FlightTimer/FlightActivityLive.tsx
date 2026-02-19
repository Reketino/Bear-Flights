"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { secondsSince } from "@/lib/flighttimer/timer";
import { formatDuration } from "@/lib/flighttimer/format";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function FlightActivityLive() {
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
   async function fetchLatest() {
    const { data, error } = await supabase
    .from("flights")
    .select("last_seen")
    .not("last_seen", "is", null)
    .order("last_seen", { ascending: false })
    .limit(1)
    .maybeSingle();

 
    console.log("Latest flight:", data, error);

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    if (!data?.last_seen) {
      console.warn("No flights found");
      setSeconds(0);
      return;
    }

    setSeconds(secondsSince(data.last_seen));
  }
   fetchLatest();
   }, []);

   useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev !== null ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("flights-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "flights",
        },
        (payload) => {
          const row = payload.new as { last_seen: string };
          setSeconds(secondsSince(row.last_seen));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

   if (seconds === null) {
    return (
      <section className="flex items-center justify-center p-2 gap-2">
        <p className="font-bold text-blue-950">✈️ Last Flight:</p>
        <p className="font-serif text-sky-200">Loading...</p>
      </section>
    );
  }
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
