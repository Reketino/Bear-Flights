"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { FlightPosition } from "@/types/flightposition";
import type { Feature, LineString } from "geojson";
import { AIRPORTS } from "@/lib/airports/airportcoords";

type Props = {
  flights: FlightPosition[];
  selectedFlight: FlightPosition | null;
  onSelectFlight: (flight: FlightPosition | null) => void;
};

export default function FlightMapLibre({ 
  flights, 
  selectedFlight,
  onSelectFlight,
}: Props) {
  console.log("FlightMapLibre rendred");
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [6.578392, 62.392497],
      zoom: 8,
      pitch: 60,
      bearing: -20,
    });
    map.addControl(new maplibregl.NavigationControl());
    mapRef.current = map;

    map.on("load", () => {
      console.log("Maplibre loaded");
      setMapLoaded(true);

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
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource("flights") as
      | maplibregl.GeoJSONSource
      | undefined;

    if (!source) return;

    source.setData(flightsToGeoJSON(flights));
  }, [flights, mapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const routeSource = map.getSource("route") as
      | maplibregl.GeoJSONSource
      | undefined;

    if (!routeSource) return;

    if (!selectedFlight) {
      routeSource.setData(emptyLine());
      return;
    }

    map.flyTo({
      center: [selectedFlight.longitude, selectedFlight.latitude],
      zoom: 10,
      speed: 0.8,
    });

    if (selectedFlight.departure_airport) {
      const dep =
        AIRPORTS[selectedFlight.departure_airport.trim().toUpperCase()];
      if (dep) {
        const routeData = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [dep.lon, dep.lat],
              [selectedFlight.longitude, selectedFlight.latitude],
            ],
          },
        };

        routeSource.setData(routeData as any);
      }
    }
  }, [selectedFlight, mapLoaded]);

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

function emptyLine(): Feature<LineString> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };
}
