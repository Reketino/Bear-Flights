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
      <Popup>
        <section
          className="
              bg-white/5 text-neutral-900
              rounded-3xl
              p-5 min-w-55
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              backdrop-blur 
              animate-in fade-in zoom-in-95 duration-150
              "
        >
          <header
            className="
                  flex items-center"
          >
            <p className="text-lg">✈️</p>
            <p className="font-semibold text-sm tracking-tight">{flight.callsign ?? flight.icao24}</p>
          </header>

          {/* Heading in pop up */}
          <label className="grid grid-cols-3 text-xs text-neutral-600">
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
         </label>

          {/* Departure Airport in popup */}

          <div className="mt-3 pt-3 border-t border-neutral-200">
            <div className="truncate">
            From{" "}
            {departureAirport?.name
              ? `${departureAirport.name}${
                  departureAirport.country
                    ? `, ${departureAirport.country}`
                    : ""
                }`
              : (flight.departure_airport ?? "Departure Unknown")}
            </div>
          

          <div className="truncate">
            To{" "}
            {arrivalAirport?.name
              ? `${arrivalAirport.name}${
                  arrivalAirport.country ? `, ${arrivalAirport.country}` : ""
                }`
              : (flight.arrival_airport ?? "Arrival Unknown")}
          </div>
          </div>
        </section>
      </Popup>
    </Marker>
  );
}
