import { Marker, Popup } from "react-leaflet";
import { useMemo } from "react";
import type { LatLngExpression } from "leaflet";
import { AIRPORTS } from "@/lib/airportcoords";
import { planeIcon } from "./mapUtils";

export function FlightMarker({
  flight,
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
          {flight.departure_airport && AIRPORTS[flight.departure_airport] && (
            <div>
              From {AIRPORTS[flight.departure_airport].name},{" "}
              {AIRPORTS[flight.departure_airport].country}
            </div>
          )}
        </section>
      </Popup>
    </Marker>
  );
}
