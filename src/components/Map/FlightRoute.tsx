import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useMemo } from "react";

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
  const position = useMemo<LatLngExpression[] | null>(() => {
    if (!flight) return null;

    const pts: LatLngExpression[] = [];

    if (departureAirport) {
      pts.push([departureAirport.lat, departureAirport.lon]);
    }

    pts.push([flight.latitude, flight.longitude]);

    if (arrivalAirport) {
      pts.push([arrivalAirport.lat, arrivalAirport.lon]);
    }

    return pts.length >= 2 ? pts : null;
  }, [flight, departureAirport, arrivalAirport]);

  if (!position) return null;

  return (
    <Polyline
      positions={position}
      pathOptions={{
        color: "#38bdf8",
        weight: 4,
        dashArray: "4 6",
      }}
    />
  );
}
