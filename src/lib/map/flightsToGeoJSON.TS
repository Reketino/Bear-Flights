import type {FeatureCollection, Point} from "geojson";

import type { FlightPosition } from "../../types/flightposition";

export function flightsToGeoJSON(
  flights: FlightPosition[]
): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",

    features: flights.map((f) => ({
      type: "Feature",

      properties: {
        altitude: f.altitude ?? 0,
        icao24: f.icao24,
        heading: f.heading ?? 0,
      },

      geometry: {
        type: "Point",
        coordinates: [f.longitude, f.latitude],
      },
    })),
  };
}
