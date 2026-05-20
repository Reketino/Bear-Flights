import type { FlightPosition } from "../../../../types/flightposition";

export function flightsToGeoJSON(flights: FlightPosition[]) {
    return {
        type: "FeatureCollection" as const,
    }
}