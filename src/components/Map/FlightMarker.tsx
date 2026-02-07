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
    ? AIRPORTS[flight.departure_airport.trim().toUpperCase()]
    : null;

  const arrivalAirport = flight.arrival_airport
    ? AIRPORTS[flight.arrival_airport.trim().toUpperCase()]
    : null;

  return (
    <Marker
      position={[flight.latitude, flight.longitude] as LatLngExpression}
      icon={plane}
      eventHandlers={{ click: onSelect }}
    >
      <Popup className="bearflights-popup">
        <section
          className="
              bg-white/10 text-neutral-900
              rounded-3xl
              p-3 min-w-55 
              shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              hover:scale-x-105
              animate-in fade-in zoom-in-95 duration-150
              "
        >
          <header className="flex items-center gap-1.5 leading-none">
            <span className="text-base leading-none">✈️</span>
            <span className="font-semibold text-sm tracking-tight leading-none">
              {flight.callsign ?? flight.icao24}
            </span>
          </header>

          {/* Heading in pop up */}
          <dl className="grid grid-cols-3 text-xs text-neutral-600">
            {flight.heading !== null && (
              <>
                <dt>Heading:</dt>
                <dd>{Math.round(flight.heading)}°</dd>
              </>
            )}

            {/* Altitude in popup */}
            {flight.altitude !== null && (
              <>
                <dt>Altitude:</dt>
                <dd> {Math.round(flight.altitude)} </dd>
              </>
            )}

            {/* Velocity in popup */}
            {flight.velocity && (
              <>
                <dt>Speed:</dt>
                <dd>{Math.round(flight.velocity)} m/s</dd>
              </>
            )}
          </dl>

          {/* Departure Airport in popup */}

          <ul className="mt-3 pt-3 border-t border-neutral-300">
            <li className="truncate text-gray-700 font-bold">
              From{" "}
              {departureAirport?.name
                ? `${departureAirport.name}${
                    departureAirport.country
                      ? `, ${departureAirport.country}`
                      : ""
                  }`
                : (flight.departure_airport ?? "Departure Unknown")}
            </li>

            <li className="truncate text-gray-700 font-bold">
              To{" "}
              {arrivalAirport?.name
                ? `${arrivalAirport.name}${
                    arrivalAirport.country ? `, ${arrivalAirport.country}` : ""
                  }`
                : (flight.arrival_airport ?? "Arrival Unknown")}
            </li>
          </ul>
        </section>
        <footer className="flex items-center mt-1">
          <span className="text-[10px] font- tracking-widest text-neutral-600 opacity-70">
            BearFlights
          </span>
        </footer>
      </Popup>
    </Marker>
  );
}
