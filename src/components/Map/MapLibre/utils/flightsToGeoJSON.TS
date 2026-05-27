import type { FlightPosition } from "../../../../types/flightposition";

export function flightsToGeoJSON(flights: FlightPosition[]) {
    return {
        type: "FeatureCollection" as const,

        features: flights.map((f) => ({
            type: "Feature" as const, 

            properties: {
                altitude: f.altitude ?? 0,
                icao24: f.icao24,
                heading: f.heading ?? 0,
            },

            geometry: {
                
            }
        }))
    }
}