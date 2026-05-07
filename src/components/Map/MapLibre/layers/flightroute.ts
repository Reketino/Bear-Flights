import maplibregl from "maplibre-gl";
import type { Feature, LineString } from "geojson";

export function addRouteLayer(
  map: maplibregl.Map,
  emptyLine: () => Feature<LineString>,
) {
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
