import maplibregl from "maplibre-gl";
import type { FlightPosition } from "@/types/flightposition";

export function updateCamera(
    map: maplibregl.Map,
    flight: FlightPosition | null,
) {
    if (!flight) return;

    map.flyTo({
        center: [flight.longitude, flight.latitude],
        zoom: 10,
        speed: 0.8,
    });
}