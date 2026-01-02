export const dynamic = "force-dynamic";

import { getSupabaseServerClient } from "@/lib/supabase";
import Link from "next/link";

const PAGE_SIZE = 25;

type Flight = {
  id: number;
  icao24: string;
  callsign: string | null;
  origin: string | null;
  route: string | null;
  distance_over_area: number | null;
  first_seen: string;
  aircraft_type: string | null;
};


type PageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function FlightsPage({ searchParams}: PageProps) {
const supabase = getSupabaseServerClient();

const params = await searchParams;
const page = Math.max(1, Number(params?.page ?? 1));

const from = (page - 1) * PAGE_SIZE;
const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("flights")
    .select( 
      `
       id,
      icao24,
      callsign,
      origin,
      route,
      distance_over_area,
      first_seen,
      aircraft_type
      `,
      { count: "exact"}
      )
    .order("first_seen", { ascending: false })
    .range(from, to);

     const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

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
                key={f.id}
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

      <footer className="
      mt-6 flex items-center justify-between
      ">
        <section className="
        text-sm text-neutral-400
        ">
          Page {page} of {totalPages}
        </section>

        <section className="flex gap-2">
          <Link
          href={`/flights?page=${page - 1}`}
          aria-disabled={page <= 1}
          className={`
            px-3 py-1 rounded-lg border
            ${page <= 1
              ? "opacity-40 pointer-events-none"
              : "hover:bg-white/10"}  
            `}
            >
              ← Prev
            </Link>

            <Link
            href={`/flights?page=${page + 1}`}
            aria-disabled={page >= totalPages}
            className={`
              px-3 py-1 rounded-lg border
              ${page >= totalPages
              ? "opacity-40 pointer-events-none"
              : "hover:bg-white/10"}  
              `}
              >
                Next →
              </Link>
        </section>

      </footer>
    </main>
  );
}
