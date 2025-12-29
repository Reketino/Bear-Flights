"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";


type FlightPosition = {
  icao24: string;
  callsign: string | null;
  latitude: number;
  longitude: number;
  altitude: number | null;
  velocity: number | null;
  route: string | null;
};


const CENTER: LatLngExpression = [62.392497, 6.578392];



export default function FlightMap({ 
    flights, 
}: {
   flights: FlightPosition[]; 
}) {

    const planeIcon = useMemo(
  () =>
    L.icon({
      iconUrl: "/icons/airplane.png",
      iconSize: [45, 45],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    }),
  []
);


  return (
    <MapContainer
      center={CENTER} // Sykkylven Center
      zoom={8}
      className="h-150 w-full rounded-xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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

      {flights.map((f) => (
        <Marker
          key={f.icao24}
          position={[f.latitude, f.longitude] as LatLngExpression}
          icon={planeIcon}
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

              {f.route && <div>Route: {f.route}</div>}
              {f.altitude && <div>Altitude: {Math.round(f.altitude)} m</div>}
              {f.velocity && <div>Speed: {Math.round(f.velocity)} m/s</div>}
            </section>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
