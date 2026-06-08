"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { addFlightShadow, addFlightSymbols } from "./layers/flight";
import { addRouteLayer } from "./layers/flightroute";
import type { FlightPosition } from "@/types/flightposition";
import { AIRPORTS } from "@/lib/airports/airportcoords";
import { flightsToGeoJSON } from "@/lib/map/flightsToGeoJSON";
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

    (map as any).on("load", async () => {
      console.log("Maplibre loaded");
      setMapLoaded(true);

      map.addSource("flights", {
        type: "geojson",
        data: flightsToGeoJSON(flights),
      });

      addFlightShadow(map);
      await addFlightSymbols(map, flights, onSelectFlight);
      addRouteLayer(map, emptyLine);

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
