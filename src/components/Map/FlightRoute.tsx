import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type FlightRouteLogic = {
  flight: {
    latitude: number;
    longitude: number;
  } | null;

  departureAirport: {
    lat: number;
    lon: number;
  } | null;

  arrivalAirport?: {
    lat: number;
    lon: number;
  } | null;
};

export function FlightRoute({
  flight,
  departureAirport,
  arrivalAirport,
}: FlightRouteLogic) {
  if (!flight) return null;

  const flightPosition: LatLngExpression = [flight.latitude, flight?.longitude];

  return (
    <main>
      {departureAirport && (
        <Polyline
          positions={[
            [departureAirport.lat, departureAirport.lon],
            flightPosition,
          ]}
          pathOptions={{
            color: "#9ca3af",
            weight: 6,
            dashArray: "6 6",
            opacity: 0.8,
          }}
        />
      )}

      {arrivalAirport && (
        <Polyline
          positions={[[arrivalAirport.lat, arrivalAirport.lon], flightPosition]}
          pathOptions={{
            color: "#22c55e",
            weight: 6,
            dashArray: "4 6",
            opacity: 0.9,
          }}
        />
      )}
    </main>
  );
}
