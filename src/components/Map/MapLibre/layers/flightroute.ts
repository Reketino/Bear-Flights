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
