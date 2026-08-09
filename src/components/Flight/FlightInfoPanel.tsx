"use client";

import type { FlightPosition } from "@/types/flightposition";
import { AIRPORTS } from "@/lib/airports/airportcoords";

type Props = {
  flight: FlightPosition | null;
};

export default function FlightInfoPanel({ flight }: Props) {
  if (!flight) return null;

  const departureICAO = flight.departure_airport?.trim().toUpperCase();
  const arrivalICAO = flight.arrival_airport?.trim().toUpperCase();

  const departureAirport = departureICAO
    ? AIRPORTS[departureICAO]
    : undefined;

  const arrivalAirport = arrivalICAO
    ? AIRPORTS[arrivalICAO]
    : undefined;


  return (
    <aside className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md">

      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-sky-400">
          ✈ {flight.callsign || "Unknown"}
        </h2>

        <p className="mt-1 text-sm text-neutral-400">
          Aircraft information
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-neutral-400">ICAO24</p>
          <p className="font-medium">{flight.icao24 || "Unknown"}</p>
        </div>

        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-neutral-400">Altitude</p>
          <p className="font-medium">{flight.altitude ?? "Unknown"} ft</p>
        </div>

        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-neutral-400">Speed</p>
          <p className="font-medium">{flight.velocity ?? "Unknown"} km/h</p>
        </div>

        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-neutral-400">Heading</p>
          <p className="font-medium">{flight.heading ?? "Unknown"}°</p>
        </div>
      </div>

      <hr className="my-6 border-white/10" />

      <h3 className="mb-4 text-lg font-semibold text-white">
        Route
      </h3>

      <div className="space-y-5">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-neutral-400">
            🛫 Departure
          </p>

          <p className="font-medium">
            {departureICAO ?? "Unknown"}
          </p>

          <p className="text-sm text-neutral-400">
            {departureAirport?.name ?? "Unknown Airport"}
          </p>

          <p className="text-xs text-neutral-500">
            {departureAirport?.country ?? ""}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="h-8 border border-dashed border-sky-400/50" />
          
        </div>

        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-neutral-400">
            🛬 Arrival
          </p>

          <p className="font-medium">
            {arrivalICAO ?? "Unknown"}
          </p>

          <p className="text-sm text-neutral-400">
            {arrivalAirport?.name ?? "Unknown Airport"}
          </p>

          <p className="text-xs text-neutral-500">
            {arrivalAirport?.country ?? ""}
          </p>
        </div>
      </div>
    </aside>
  );
}
