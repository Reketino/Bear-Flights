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
}: Props)

