import maplibregl from "maplibre-gl";
import type { FlightPosition } from "@/types/flightposition";

export function addFlightShadow(map: maplibregl.Map) {
  map.addLayer({
    id: "flight-shadow",
    type: "circle",
    source: "flights",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "altitude"],
        0,
        2,
        10000,
        14,
      ],
      "circle-color": "#000",
      "circle-opacity": 0.25,
      "circle-blur": 1.5,
    },
  });
}

export async function addFlightSymbols(
  map: maplibregl.Map,
  flights: FlightPosition[],
  onSelectFlight: (f: FlightPosition | null) => void,
) {
  const res = await map.loadImage("/icons/airplane1.png");
  const image = res.data;

  if (!map.hasImage("airplane-icon")) {
    map.addImage("airplane-icon", image);
  }

  map.addLayer({
    id: "flight-symbol",
            type: "symbol",
            source: "flights",
            layout: {
              "icon-image": "airplane-icon",
              "icon-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                0.2,
                8,
                0.6,
                12,
                1.2,
              ],
              "icon-rotate": ["get", "heading"],
              "icon-rotation-alignment": "map",
              "icon-pitch-alignment": "map",
              "icon-allow-overlap": true,
            },
            paint: {
              "icon-halo-color": "#0ea5e9",
              "icon-halo-width": 2,
              "icon-halo-blur": 1,
            },
  })
}
