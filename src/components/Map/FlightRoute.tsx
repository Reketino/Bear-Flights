import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useMemo } from "react";

type FlightRoute = {
    flight: {
        latitude: number;
        longitude: number;
    } | null;

    departureAirport: {
        lat: number;
        lon: number;
    } | null;

    arrivalAirport?: {
        lat: number;
        lon: number;
    } | null
};

export function FlightRoute({
    flight, 
    departureAirport,
    arrivalAirport
}: FlightRoute) {
    const position = useMemo<LatLngExpression[] | null>(() => {
        if(!flight || !departureAirport) return null;

        const pts: LatLngExpression[] = [
            [departureAirport.lat, departureAirport.lon],
            [flight.latitude, flight.longitude],
        ];

        if (arrivalAirport) {
            pts.push([arrivalAirport.lat, arrivalAirport.lon]);
        }

        return pts;
    },[flight, departureAirport, arrivalAirport]);

    if (!position) return null;


}
