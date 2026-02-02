import { Marker, Popup } from "react-leaflet";
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
  const f = flight;

  return (
    <Marker
      position={[f.latitude, f.longitude] as LatLngExpression}
      icon={planeIcon(f.heading, f.altitude)}
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
            ✈️{f.callsign ?? f.icao24}
          </header>

          {/* Heading in pop up */}
          {f.heading !== null && <div>Heading: {Math.round(f.heading)}°</div>}

          {/* Altitude in popup */}
          {f.altitude !== null && (
            <div>Altitude: {Math.round(f.altitude)} m</div>
          )}

          {/* Velocity in popup */}
          {f.velocity && <div>Speed: {Math.round(f.velocity)} m/s</div>}

          {/* Departure Airport in popup */}
          {f.departure_airport && AIRPORTS[f.departure_airport] && (
            <div>
              From {AIRPORTS[f.departure_airport].name},{" "}
              {AIRPORTS[f.departure_airport].country}
            </div>
          )}
        </section>
      </Popup>
    </Marker>
  );
}
