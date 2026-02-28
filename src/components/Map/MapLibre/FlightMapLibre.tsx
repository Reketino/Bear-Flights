"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { FlightPosition } from "@/types/flightposition";
import { AIRPORTS } from "@/lib/airports/airportcoords";

type Props = {
    flights: FlightPosition[];
    selectedFlight: FlightPosition | null;
};

export default function FlightMapLibre({
    flights,
    selectedFlight,
}: Props) { {
    const mapRef = useRef<maplibregl.Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: "https://demotiles.maplibre.org/style.json",
            center: [6.578392, 62.392497],
            zoom: 8,
            pitch: 60,
            bearing: -20,
        })
    })

}
    return (
        <main>
            MapLibre coming soon
        </main>
    )

}

