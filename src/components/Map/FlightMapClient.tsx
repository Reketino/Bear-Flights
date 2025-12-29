"use client";

import dynamic from "next/dynamic";


const FlightMap = dynamic(
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