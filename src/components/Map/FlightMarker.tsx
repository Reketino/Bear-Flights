import { Marker, Popup } from "react-leaflet";
import { useMemo } from "react";
import type { LatLngExpression } from "leaflet";
import { AIRPORTS } from "@/lib/airportcoords";
import { planeIcon } from "./mapUtils";

export function FlightMarker({
  flight,
  selected,
  onSelect,
}: {
  flight: any;
  selected: boolean;
  onSelect: () => void;
}) {
  const plane = useMemo(
    () => planeIcon(flight.heading, flight.altitude),
    [flight.heading, flight.altitude],
  );

  const departureAirport = flight.departure_airport
    ? AIRPORTS[flight.departure_airport]
    : null;

  const arrivalAirport = flight.arrival_airport
    ? AIRPORTS[flight.arrival_airport]
    : null;

  return (
    <Marker
      position={[flight.latitude, flight.longitude] as LatLngExpression}
      icon={plane}
      eventHandlers={{ click: onSelect }}
    >
      <Popup>
        <section
          className="
                text-sm"
        >
          <header
            className="
                    font-semibold"
          >
            ✈️{flight.callsign ?? flight.icao24}
          </header>

          {/* Heading in pop up */}
          {flight.heading !== null && (
            <div>Heading: {Math.round(flight.heading)}°</div>
          )}

          {/* Altitude in popup */}
          {flight.altitude !== null && (
            <div>Altitude: {Math.round(flight.altitude)} m</div>
          )}

          {/* Velocity in popup */}
          {flight.velocity && (
            <div>Speed: {Math.round(flight.velocity)} m/s</div>
          )}

          {/* Departure Airport in popup */}
          <div className="mt-1">
            From{" "}
            {departureAirport?.name
              ? `${departureAirport.name}${
                  departureAirport.country
                    ? `, ${departureAirport.country}`
                    : ""
                }`
              : (flight.departure_airport ?? "Departure Unknown")}
          </div>

          <div>
            To{" "}
            {arrivalAirport?.name
              ? `${arrivalAirport.name}${
                  arrivalAirport.country ? `, ${arrivalAirport.country}` : ""
                }`
              : (flight.arrival_airport ?? "Arrival Unknown")}
          </div>
        </section>
      </Popup>
    </Marker>
  );
}
