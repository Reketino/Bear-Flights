import type { FeatureCollection, Point } from "geojson";
import { AIRPORTS } from "@/lib/airports/airportcoords";

export function airportGeoJson(
  departureIcao?: string,
  arrivalIcao?: string,
): FeatureCollection<Point> {
  const features = [];

  if (departureIcao) {
    const airport = AIRPORTS[departureIcao];

    if (airport) {
      features.push({
        type: "Feature" as const,
        properties: {
          type: "departure",
          name: airport.name,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [airport.lon, airport.lat],
        },
      });
    }
  }

    if (arrivalIcao) {
    const airport = AIRPORTS[arrivalIcao];

    if (airport) {
      features.push({
        type: "Feature" as const,
        properties: {
          type: "arrival",
          name: airport.name,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [airport.lon, airport.lat],
        },
      });
    }
  }

  return {
    type: "FeatureCollection",
    features,
  };
}