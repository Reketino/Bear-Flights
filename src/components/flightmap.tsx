"use client";


import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";



type FlightPosition = {
    icao24: string;
    callsign: string | null;
    latitude: number;
    longitude: number;
    altitude: number | null;
    velocity: number | null;
};


const CENTER: LatLngExpression = [62.392497, 6.578392];

export default function FlightMap({
    flights,
}: {
    flights: FlightPosition[];
}) {
    return (
        <MapContainer
        center={CENTER} // Sykkylven Center
        zoom={8}
        className="h-150 w-full rounded-xl"
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


        <Circle
        {...({
        center: CENTER,
        radius: 50_000,
        pathOptions: { 
            color: "#38bdf8", 
            fillOpacity: 0.05,
          }
        } as any)} 
        />


        {flights.map((f) => (
            <Marker
            key={f.icao24}
            position={[f.latitude, f.longitude]}
            >

            </Marker>
        ))}
        </MapContainer>
    )
}