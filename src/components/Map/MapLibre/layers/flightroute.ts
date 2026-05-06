import maplibregl from "maplibre-gl";
import type { Feature, LineString } from "geojson";

export function addRouteLayer(
  map: maplibregl.Map,
  emptyLine: () => Feature<LineString>,
) {
  map.addSource("route", {
    type: "geojson",
    data: emptyLine(),
  })
}
