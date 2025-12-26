"use client";

import dynamic from "next/dynamic";
import FlightMap from "./FlightMap";


const flightmap = dynamic(
    () => import("./FlightMap"),
    { ssr: false }
);


export default function FlightMapClient({
    flights,
}: {
    flights: any[];
}) {
    return <FlightMap flights={flights} />;
}