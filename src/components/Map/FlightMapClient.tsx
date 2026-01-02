"use client";

import dynamic from "next/dynamic";


const FlightMap = dynamic(
    () => import("./FlightMap"),
    { ssr: false }
);


export default function FlightMapClient({
    flights,
    singleFlight,
}: {
    flights: any[];
    singleFlight?: boolean;
}) {
    return <FlightMap flights={flights} singleFlight={singleFlight} />;
}