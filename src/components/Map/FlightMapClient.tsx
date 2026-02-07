"use client";
import dynamic from "next/dynamic";
import { FlightPosition } from "@/types/flightposition";

const FlightMap = dynamic(() => import("./FlightMap"), { ssr: false });

export default function FlightMapClient({
  flights,
  singleFlight,
}: {
  flights: FlightPosition[];
  singleFlight?: boolean;
}) {
  return <FlightMap flights={flights} singleFlight={singleFlight} />;
}
