import maplibregl from "maplibre-gl";
import { airportGeoJson } from "@/lib/map/airportGeoJson";
import type { FlightPosition } from "@/types/flightposition";

export function addAirportLayers(map: maplibregl.Map) {
  map.addLayer({
    id: "airport-markers",
    type: "circle",
    source: "airports",
    paint: {
      "circle-radius": 8,

      "circle-color": [
        "match",
        ["get", "type"],
        "departure",
        "#22c55e",
        "#ef4444",
      ],
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 2,
    },
  });
  map.addLayer({
    id: "airport-labels",
    type: "symbol",
    source: "airports",
    layout: {
      "text-field": ["get", "name"],
      "text-offset": [0, 1.5],
      "text-size": 12,
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#000000",
      "text-halo-width": 1,
    },
  });
}

export function updateAirportLayer(
  map: maplibregl.Map,
  flight: FlightPosition | null,
) {
  const source = map.getSource("airports") as
  | maplibregl.GeoJSONSource
  | undefined;

  if (!source) return;

  if (!flight) {
    source.setData({
      type: "FeatureCollection",
      features: [],
    });

    return;
  }
  source.setData(
    airportGeoJson(
      flight.departure_airport?.trim().toUpperCase(),
      flight.arrival_airport?.trim().toUpperCase(),
    ),
  );
}
