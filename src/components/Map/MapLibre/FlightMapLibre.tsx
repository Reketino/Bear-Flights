"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { FlightPosition } from "@/types/flightposition";

type Props = {
  flights: FlightPosition[];
  selectedFlight: FlightPosition | null;
};

export default function FlightMapLibre({ flights, selectedFlight }: Props) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [6.578392, 62.392497],
      zoom: 8,
      pitch: 60,
      bearing: -20,
    });
    map.addControl(new maplibregl.NavigationControl());
    mapRef.current = map;

    map.on("load", () => {
      map.addSource("flights", {
        type: "geojson",
        data: flightsToGeoJSON(flights),
      });

      map.addLayer({
        id: "flight-circles",
        type: "circle",
        source: "flights",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "altitude"],
            0,
            4,
            4000,
            12,
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "altitude"],
            0,
            "#22c55e",
            1000,
            "#eab308",
            3000,
            "#ef4444",
          ],
        },
      });

      map.addSource("route", {
        type: "geojson",
        data: emptyLine();
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
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource("flights")) return;

    const source = map.getSource("flights") as maplibregl.GeoJSONSource;
    source.setData(flightsToGeoJSON(flights));
  }, [flights]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedFlight) return;

    map.flyTo({
      center: [selectedFlight.longitude, selectedFlight.latitude],
      zoom: 10,
      speed: 0.8,
    });
  }, [selectedFlight]);

  return <div ref={containerRef} className="h-150 w-full rounded-xl" />;
}

function flightsToGeoJSON(flights: FlightPosition[]) {
  return {
    type: "FeatureCollection" as const,
    features: flights.map((f) => ({
      type: "Feature" as const,
      properties: {
        altitude: f.altitude ?? 0,
        icao24: f.icao24,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [f.longitude, f.latitude],
      },
    })),
  };
}


