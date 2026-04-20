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
      maxPitch: 85,
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

      (async () => {
        try {
          const response = await map.loadImage("/icons/airplane1.png");
          const image = response.data;
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
          });

          (map as any).on("click", "flight-symbol", (e: any) => {
            const feature = e.features?.[0];
            if (!feature) return;

            const icao24 = feature.properties?.icao24;
            if (!icao24) return;

            const flight = flights.find((f) => f.icao24 === icao24);
            if (!flight) return;

            onSelectFlight(flight);
          });

          (map as any).on("mouseenter", "flight-symbol", () => {
            map.getCanvas().style.cursor = "pointer";
          });

          (map as any).on("mouseleave", "flight-symbol", () => {
            map.getCanvas().style.cursor = "";
          });
        } catch (err) {
          console.error("Image load error", err);
        }
      })();

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

      map.setPaintProperty("building-3d", "fill-extrusion-color", "#9ca3af");

      map.setPaintProperty("building-3d", "fill-extrusion-opacity", 0.8);
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
        heading: f.heading ?? 0,
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
