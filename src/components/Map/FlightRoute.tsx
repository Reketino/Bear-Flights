import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type FlightRouteLogic = {
  flight: {
    latitude: number;
    longitude: number;
    altitude?: number;
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

  const altitude = flight.altitude ?? 0;

  const weight = Math.min(6, 2 + altitude / 6000);
  const opacity = Math.min(1, 0.5 + altitude /2000);

  const flightPosition: LatLngExpression = [
    flight.latitude, 
    flight.longitude
  ];

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
            weight,
            opacity,
            dashArray: "6 6",
          }}
        />
      )}

      {arrivalAirport && (
        <Polyline
          positions={[[arrivalAirport.lat, arrivalAirport.lon], flightPosition]}
          pathOptions={{
            color: "#22c55e",
            weight,
            opacity,
            dashArray: "4 6",
          }}
        />
      )}
    </main>
  );
}
