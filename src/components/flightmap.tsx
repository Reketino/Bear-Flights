"use client";


import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { color } from "framer-motion";


type FlightPosition = {
    icao24: string;
    callsign: string | null;
    latitude: number;
    longitude: number;
    altitude: number | null;
    velocity: number | null;
};


export default function FlightMap({
    flights,
}: {
    flights: FlightPosition[];
}) {
    return (
        <MapContainer
        center={[62.392497, 6.578392]} // Sykkylven Center
        zoom={8}
        className="h-150 w-full rounded-xl"
        >
            <TileLayer
            attribution="© OpenStreetMap contributor"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


        <Circle
        center={[62.392497, 6.578392]}
        radius={50_000}
        pathOptions={{ color: "#38bdf8", fillOppacity: 0.05 }}
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