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
  onSelectFlight: (f: FlightPosition | null) => void
) {
  const res = await map.loadImage("/icons/airplane1.png");
}
