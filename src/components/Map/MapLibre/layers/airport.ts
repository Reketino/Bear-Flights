import maplibregl from "maplibre-gl";

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
