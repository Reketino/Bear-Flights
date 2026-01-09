"use client";
import { AirPort_COORDS } from "@/lib/airportcoords";


import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap, } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";


type FlightPosition = {
  icao24: string;
  callsign: string | null;
  latitude: number;
  longitude: number;
  altitude: number | null;
  velocity: number | null;
  heading: number | null;
  departure_airport: string | null;
};

// Center position of Sykkylven
const CENTER: LatLngExpression = [62.392497, 6.578392];

// Defining heading on the map
const safeHeading = (heading: number | null) =>
  typeof heading === "number" && Number.isFinite(heading)
    ? heading
    : 0;

// Altitude Color based on Altitude
const altitudeColor = (altitude: number | null) => {
  if (altitude === null) return "#9ca3af";
  if (altitude < 3000) return "#22c55e";
  if (altitude < 9000) return "#eab308"; 
  return "#ef4444";
};



// Autpan when entering flight from Icao24
function AutoPan({ flights }: { flights: FlightPosition[] }) {
  const map = useMap();

  useEffect(() => {
    if (flights.length === 1) {
      const f = flights[0];

      map.flyTo(
        [f.latitude, f.longitude],
        11,
        {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.25,
        }
      );
    }
  }, [flights, map]);

  return null;
}

export default function FlightMap({ 
  flights, 
  singleFlight,
}: { 
  flights: FlightPosition[];
  singleFlight?: boolean; 
}) {

  const planeIcon = (heading: number | null, altitude: number | null) => {
    const rotation = safeHeading(heading)- 90;

    return L.divIcon({
      className: "",
      html: `
      <div style="
      width:45px;
      height:45px;
      display:flex;
      align-items:center;
      justify-content:center;
      transform: rotate(${rotation}deg); 
      ">
      <img
      src="/icons/airplane.png"
      style="
      width:45px;
      height:45px;
      display: block;
      filter: drop-shadow(0 0 6px ${altitudeColor(altitude)});
      "
      />
      </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [22, 22],
      popupAnchor: [0, -16],
    });
  };


  

  return (
    <section className=" relative">
    
    {singleFlight && (
    <div className="absolute top-4 right-4 z-1000">
      <a
      href="/flights/map"
      title="Overview"
      className="
      inline-flex items-center gap-2
      px-4 py-2 rounded-lg 
      bg-slate-800 hover:bg-slate-700
      text-slate-100 font-semibold
      transition
      "
      >
       ← Return to overview 
      </a>
    </div>
  )}

    <MapContainer
      center={CENTER} // Sykkylven Center
      zoom={8}
      className="h-150 w-full rounded-xl"
    >

      <AutoPan flights={flights} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


      {!singleFlight && (
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
      )}


      {/* Departure Airport */}
      {singleFlight &&
      flights.map((f) => {
        if (!f.departure_airport) return null;

      const origin = AirPort_COORDS[f.departure_airport];
        if (!origin) return null;

        return (
          <Polyline
          key={`${f.icao24}-line`}
          positions={[
            [origin.lat, origin.lon],
            [f.latitude, f.longitude],
          ]}
          pathOptions={{
            color: "#38bdf8",
            weight: 2,
            dashArray: "4 6"
          }}
          />
        );
      })}


      {flights.map((f) => (
        <Marker
          key={`${f.icao24}-${f.heading}`}
          position={[f.latitude, f.longitude] as LatLngExpression}
          icon={planeIcon(f.heading, f.altitude)}
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

              {f.heading !== null && (
                <div>Heading: {Math.round(f.heading)}°</div>
              )}
              {f.altitude !== null && (
               <div>Altitude: {Math.round(f.altitude)} m</div>
              )}
              {f.velocity && <div>Speed: {Math.round(f.velocity)} m/s</div>}
            </section>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </section>
  );
}
