"use client";
import { AIRPORTS } from "@/lib/airports/airportcoords";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { AutoPanFlight } from "./AutoPan";
import { FlightMarker } from "./FlightMarker";
import { FlightPosition } from "@/types/flightposition";
import { FlightRoute } from "./FlightRoute";
import { AirportMarker } from "./AirportMarker";

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
    selectedFlight || (flights.length === 1 ? flights[0] : null);

  const departureICAO = selectedFlight?.departure_airport?.trim().toUpperCase();

  const departureAirport = departureICAO ? AIRPORTS[departureICAO] : null;

  const arrivalICAO = selectedFlight?.arrival_airport?.trim().toUpperCase();

  const arrivalAirport = arrivalICAO ? AIRPORTS[arrivalICAO] : null;

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
          bg-transparent backdrop-blur-3xl 
          backdrop-brightness-95
          hover:scale-105
         text-sky-500 font-semibold
          transition
            "
          >
            ⬅️ Return to overview
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

        {/* PolyLine */}
        <FlightRoute
          flight={selectedFlight}
          departureAirport={departureAirport}
          arrivalAirport={arrivalAirport}
        />

        {departureAirport && (
          <AirportMarker
            position={[departureAirport.lat, departureAirport.lon]}
            type="departure"
            label="Departure Airport"
          />
        )}

        {arrivalAirport && (
          <AirportMarker
            position={[arrivalAirport.lat, arrivalAirport.lon]}
            type="arrival"
            label="Arrival Airport"
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
