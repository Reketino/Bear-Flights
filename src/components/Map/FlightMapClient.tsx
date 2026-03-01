"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FlightPosition } from "@/types/flightposition";

const FlightMapLeaflet = dynamic(
  () => import("./Leaflet/FlightMapLeaflet"), 
  { ssr: false }
);

const FlightMapLibre = dynamic(
  () => import("./MapLibre/FlightMapLibre"), 
  { ssr: false }
);

export default function FlightMapClient({
  flights,
  singleFlight,
}: {
  flights: FlightPosition[];
  singleFlight?: boolean;
}) {
  const [engine, setEngine] = useState<"leaflet" | "maplibre">("maplibre");
  const [selectedFlight, setSelectedFlight] = useState<FlightPosition | null>(null);
  
  return (
    <>
    <section className="flex gap-2 mb-4">
      <button
      onClick={() => setEngine("leaflet")}
      className="px-3 py-1 bg-neutral-800 text-white rounded"
      >
        Leaflet
      </button>
      <button
      onClick={() => setEngine("maplibre")}
      className="px-3 py-1 bg-neutral-800 text-white rounded"
      >
        MapLibre
      </button>
    </section>

    {engine === "leaflet" && (
      <FlightMapLeaflet
      flights={flights}
      singleFlight={singleFlight}
      />
    )}

    {engine === "maplibre" && (
      <FlightMapLibre
      flights={flights}
      selectedFlight={selectedFlight}
      />
    )}
    </>
  )
}
