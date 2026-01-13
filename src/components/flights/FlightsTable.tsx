import type { Flight } from "@/types/flightid";
import Link from "next/link";

type FlightsTableProps = {
  flights: Flight[];
};

export default function FlightsTable({ flights }: FlightsTableProps) {
  return (
    <section className="overflow-x-auto">
      <table
        className=" 
        w-full text-sm border rounded-xl
        bg-black/20 border-black 
        "
      >
        <thead className="bg-black/20">
          <tr>
            <th className="p-3 text-left">Callsign</th>
            <th className="p-3 text-left">Airline</th>
            <th className="p-3 text-left">Origin</th>
            <th className="p-3 text-left">Aircraft Type</th>
            <th className="p-3 text-left">Route</th>
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

                <td className="p-3">{flight.origin_country ?? flight.origin ?? "Unknown"}</td>

                <td className="p-3 font-mono text-sky-600">
                  {flight.aircraft_type ?? "—"}
                </td>

                <td className="p-3 font-mono">
                  {flight.route ?? "Route unknown🫠"}
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
  );
}
