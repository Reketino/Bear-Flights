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
  return <FlightMapLeaflet flights={flights} singleFlight={singleFlight} />;
}
