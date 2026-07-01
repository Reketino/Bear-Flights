"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { addFlightShadow, addFlightSymbols } from "./layers/flight";
import { addRouteLayer } from "./layers/flightroute";
import type { FlightPosition } from "@/types/flightposition";
import { AIRPORTS } from "@/lib/airports/airportcoords";
import { flightsToGeoJSON } from "@/lib/map/flightGeoJson";
import { airportGeoJson } from "@/lib/map/airportGeoJson";
import { emptyLine } from "@/lib/map/emptyLine";

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
  console.log("FlightMapLibre rendered");
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: `https://api.maptiler.com/maps/hybrid/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
      center: [6.578392, 62.392497],
      zoom: 8,
      pitch: 60,
      bearing: -20,
      maxPitch: 85,
    });
    map.addControl(new maplibregl.NavigationControl());
    mapRef.current = map;

    (map as any).on("load", async () => {
      console.log("Maplibre loaded");
      setMapLoaded(true);

      map.addSource("flights", {
        type: "geojson",
        data: flightsToGeoJSON(flights),
      });

      map.addSource("airports", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      addFlightShadow(map);
      await addFlightSymbols(map, flights, onSelectFlight);
      addRouteLayer(map);

      map.addLayer({
        id: "airports-markers",
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
