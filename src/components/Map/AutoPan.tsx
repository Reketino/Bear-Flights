import { useEffect } from "react";
import { useMap } from "react-leaflet";

 export function AutoPanFlight({
  flight,
  zoom = 11,
}: {
  flight: { latitude: number; longitude: number; } | null;
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!flight) return;

    map.flyTo([flight.latitude, flight.longitude], zoom, {
      animate: true,
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [flight, zoom, map]);

  return null;
}