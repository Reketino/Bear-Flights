import maplibregl from "maplibre-gl";

import { AIRPORTS } from "@/lib/airports/airportcoords";
import { emptyLine } from "@/lib/map/emptyLine";
import type { FlightPosition } from "@/types/flightposition";

export function addRouteLayer(map: maplibregl.Map) {
  map.addSource("route", {
    type: "geojson",
    data: emptyLine(),
  });

  map.addLayer({
    id: "route-line",
    type: "line",
    source: "route",
    paint: {
      "line-width": 4,
      "line-color": "#38bdf8",
    },
  });
}

export function updateRouteLayer(
  map: maplibregl.Map,
  flight: FlightPosition | null,
) {
  const source = map.getSource("route") as 
    | maplibregl.GeoJSONSource
    | undefined;

  if (!source) return;

  if (!flight?.departure_airport) {
    source.setData(emptyLine());
    return;
  }

  const departureIcao = flight.departure_airport.trim().toUpperCase();
  const departureAirport = AIRPORTS[departureIcao]

  if (!departureAirport) {
    source.setData(emptyLine());
    return;
  }

  source.setData({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [departureAirport.lon, departureAirport.lat],
        [flight.longitude, flight.latitude],
      ],
    },
  });
}
