export const dynamic = "force-dynamic";

import { getSupabaseServerClient } from "@/lib/supabase";
import Link from "next/link";


type Flight = {
  icao24: string;
  callsign: string | null;
  origin: string | null;
  route: string | null;
  distance_over_area: number | null;
  first_seen: string;
  aircraft_type: string | null;
};

export default async function FlightsPage() {
const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("flights")
    .select(
      `
      icao24, 
      callsign, 
      origin, 
      route,
      distance_over_area,
      first_seen,
      aircraft_type
        `
    )
    .order("first_seen", { ascending: false })
    .limit(100);

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Flights</h1>
        <p className="text-red-400">{error.message}</p>
      </main>
    );
  }

  if (!data || data.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Flights</h1>
        <p className="text-neutral-400">No flights found.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">✈️ Flights</h1>
        <p className="text-sky-200">
          Latest aircraft recorded by BearFlights
        </p>
      </header>

      <section className="overflow-x-auto">
        <table className=" 
        w-full text-sm border rounded-xl
        bg-black/20 border-black 
        ">

          <thead className="bg-black/20">
            <tr>
              <th className="p-3 text-left">
                Callsign
                </th>
                <th className="p-3 text-left">
                  Aircraft Type
                </th>
              <th className="p-3 text-left">
                Origin
                </th>
              <th className="p-3 text-left">
                  Route
                </th>
              <th className="p-3 text-right">
                Distance
                </th>
              <th className="p-3 text-right">
                Date
                </th>
              <th className="p-3 text-right">
                Time
                </th>
            </tr>
          </thead>
          <tbody>
            {data.map((f) => (
              <tr
                key={`$f.icao24-${f.first_seen}`}
                className="border-t border-white/10"
              >

                <td className="p-3 font-mono">
                  <Link
                  href={`/flights/${f.icao24}`}
                  className="text-sky-400 hover:underline"
                  >
                  {f.callsign ?? f.icao24}
                  </Link>
                </td>

                <td className="p-3 text-left font-mono text-sky-600">
                  {f.aircraft_type ?? "—"}
                </td>

                <td className="p-3">
                  {f.origin ?? "Unknown"}
                </td>

                <td className="p-3 font-mono">
                   {f.route ?? "Route unknown🫠"}
                </td>

                <td className="p-3 text-right">
                  {f.distance_over_area
                    ? `${f.distance_over_area.toFixed(1)} km`
                    : "—"}
                </td>

                <td className="p-3 text-right text-emerald-400">
                  {new Date(f.first_seen).toLocaleDateString("en-GB")}
                </td>

                <td className="p-3 text-right text-white">
                  {new Date(f.first_seen).toLocaleTimeString("en-GB")}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
