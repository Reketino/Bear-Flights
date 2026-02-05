"use client";
import { AIRPORTS } from "@/lib/airportcoords";
import { MapContainer, TileLayer, Circle, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo, useState } from "react";
import { AutoPanFlight } from "./AutoPan";
import { FlightMarker } from "./FlightMarker";
import { FlightPosition } from "@/types/flightposition";

// Center position of Sykkylven
const CENTER: LatLngExpression = [62.392497, 6.578392];

export default function FlightMap({
  flights,
  singleFlight,
}: {
  flights: FlightPosition[];
  singleFlight?: boolean;
}) {

  const [selectedFlight, setSelectedFlight] = useState<FlightPosition | null>(
    null,
  );

  const AutoFlight =
    selectedFlight ?? (flights.length === 1 ? flights[0] : null);

  const departureICAO = useMemo(
    () => selectedFlight?.departure_airport?.trim().toUpperCase() ?? null,
    [selectedFlight],
  );

  const departureAirport = departureICAO ? AIRPORTS[departureICAO] : null;

  const arrivalICAO = useMemo(
    () => selectedFlight?.arrival_airport?.trim().toUpperCase() ?? null,
    [selectedFlight],
  );

  const arrivalAirport = arrivalICAO ? AIRPORTS[arrivalICAO]: null;

  const PolylinePositions = useMemo(() => {
    if (!selectedFlight || !departureAirport) return null;

    const points: LatLngExpression[] = [
      [departureAirport.lat, departureAirport.lon],
      [selectedFlight.latitude, selectedFlight.longitude]
    ];

    if (arrivalAirport) {
      points.push([arrivalAirport.lat, arrivalAirport.lon]);
    }

    return points
  }, [selectedFlight, departureAirport, arrivalAirport]);

  return (
    <section className=" relative">
      {singleFlight && (
        <div className="absolute top-4 right-4 z-1000">
          <a
            href="/flights/map"
            title="Overview"
            className="
            inline-flex items-center 
            px-4 py-2 gap-2 rounded-lg 
          bg-slate-800 hover:bg-slate-700
          text-slate-100 font-semibold
            transition
            "
          >
            ← Return to overview
          </a>
        </div>
      )}

      <MapContainer
        center={CENTER} // Sykkylven Center
        zoom={8}
        className="h-150 w-full rounded-xl"
      >
        <AutoPanFlight flight={AutoFlight} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {PolylinePositions &&  (
          <Polyline
            positions={PolylinePositions}
            pathOptions={{
              color: "#38bdf8",
              weight: 4,
              dashArray: "4 6",
            }}
          />
        )}

        {/* Radius ring on map */}
        {!singleFlight && !selectedFlight && (
          <Circle
            {...({
              center: CENTER,
              radius: 50_000,
              pathOptions: {
                color: "#38bdf8",
                fillOpacity: 0.05,
              },
            } as any)}
          />
        )}

        {/* Flight Marker */}
        {flights.map((f) => (
          <FlightMarker
            key={`${f.icao24}-${f.heading}`}
            flight={f}
            selected={selectedFlight?.icao24 === f.icao24}
            onSelect={() =>
              setSelectedFlight((prev) =>
                prev?.icao24 === f.icao24 ? null : f,
              )
            }
          />
        ))}
      </MapContainer>
    </section>
  );
}
