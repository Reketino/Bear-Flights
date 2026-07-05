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
        },
      });
    
}