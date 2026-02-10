"use client";
import type { Flight } from "@/types/flightid";
import Link from "next/link";
import OriginFlag from "../flags/OriginFlag";
import {useState} from "react";
import AircraftDescriptionModal from "@/app/components/AiDescModal/AircraftDescriptionModal";


type FlightsTableProps = {
  flights: Flight[];
};



export default function FlightsTable({ flights }: FlightsTableProps) {
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null); 
  
  return (
    <>
    <section className="overflow-x-auto">
      <table
        className=" 
        w-full text-sm border rounded-xl
        bg-black/50 border-black 
        "
      >
        <thead className="bg-black/20">
          <tr>
            <th className="p-3 text-left">Callsign</th>
            <th className="p-3 text-left">Airline</th>
            <th className="p-3 text-left">Origin</th>
            <th className="p-3 text-left">Aircraft Model</th>
            <th className="p-3 text-left">Departure & Arrival Airport</th>
            <th className="p-3 text-right">Distance</th>
            <th className="p-3 text-right">Date</th>
            <th className="p-3 text-right">Time</th>
          </tr>
        </thead>

        <tbody>
          {flights.map((flight) => {
            const date = new Date(flight.first_seen);

            return (
              <tr key={flight.id} className="border-t border-white/10">
                <td className="p-3 font-mono">
                  <Link
                    href={`/flights/${flight.icao24}`}
                    className="text-sky-400 hover:underline"
                  >
                    {flight.callsign ?? flight.icao24}
                  </Link>
                </td>

                <td className="p-3">
                  {flight.airline ?? "Airline Unavaliable"}
                </td>

                <td className="p-3">
                  <OriginFlag
                    country={flight.origin_country ?? flight.origin}
                  />
                </td>

                <td className="p-3 font-mono text-sky-600">
                  <button
                  onClick={() => setSelectedAircraft(flight.aircraft_type ?? null )}
                  className="text-sky-600 hover:underline text-left"
                  disabled={!flight.aircraft_type}
                  >
                  {flight.aircraft_name
                    ? `${flight.aircraft_name} (${flight.aircraft_type})`
                    : (flight.aircraft_type ?? "Unknown aircraft")}
                    </button>
                </td>

                <td className="font-mono">
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      {flight.departure_airport_name ??
                        flight.departure_airport ??
                        "Departure Unkown"}
                    </span>

                    <p>-</p>

                    <span className="flex items-center gap-1 text-sm">
                      {flight.arrival_airport_name ??
                        flight.arrival_airport ??
                        "Arrival Unknown"}
                    </span>
                  </div>
                </td>

                <td className="p-3 text-right">
                  {flight.distance_over_area
                    ? `${flight.distance_over_area.toFixed(1)} km`
                    : "—"}
                </td>

                <td className="p-3 text-right text-emerald-400">
                  {date.toLocaleDateString("en-GB")}
                </td>

                <td className="p-3 text-right text-white">
                  {date.toLocaleTimeString("en-GB")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>

    <AircraftDescriptionModal
    aircraftType={selectedAircraft}
    onClose={() => setSelectedAircraft(null)}
    />
    </>
  );
}
