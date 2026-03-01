"use client";
import dynamic from "next/dynamic";
import { FlightPosition } from "@/types/flightposition";

const FlightMapLeaflet = dynamic(
  () => import("./Leaflet/FlightMapLeaflet"), 
  { ssr: false }
);

export default function FlightMapClient({
  flights,
  singleFlight,
}: {
  flights: FlightPosition[];
  singleFlight?: boolean;
}) {
  return <FlightMapLeaflet flights={flights} singleFlight={singleFlight} />;
}
