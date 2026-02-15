export const dynamic = "force-dynamic";

import { getSupabaseServerClient } from "@/lib/supabase";
import Link from "next/link";
import FlightsTable from "@/components/flights/FlightsTable";

// 25 rows in table
const PAGE_SIZE = 25;

// Defining PageProps
type PageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function FlightsPage({ searchParams }: PageProps) {
  const supabase = getSupabaseServerClient();

  // Table pages function
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? 1));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // Data collecting from supabase
  const { data, error, count } = await supabase
    .from("flights")
    .select(
      `
       id,
      icao24,
      callsign,
      airline,
      airline_icao,
      origin,
      origin_country,
      departure_airport,
      arrival_airport,
      departure_airport_name,
      arrival_airport_name,
      distance_over_area,
      first_seen,
      aircraft_type,
      aircraft_name
      `,
      { count: "exact" },
    )
    .order("first_seen", { ascending: false })
    .range(from, to);

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  // Error thrown if supabase fetch failed
  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Flights</h1>
        <p className="text-red-400">{error.message}</p>
      </main>
    );
  }

  // If zero flights recorded show
  if (!data || data.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Flights</h1>
        <p className="text-neutral-400">No flights found.</p>
      </main>
    );
  }

  return (
    // Main Section
    <main className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">✈️ Flights</h1>
        <p className="text-sky-200">Latest aircraft recorded by BearFlights</p>
      </header>

      {/* Table Import */}
      <FlightsTable flights={data} />

      {/* Footer w/ table pages */}
      <footer className="mt-6 flex items-center justify-between">
        <section className="flex gap-2">
          <Link
            href={`/flights/flight-history?page=${page - 1}`}
            aria-disabled={page <= 1}
            className={`
            px-3 py-1.5 rounded-lg
            border border-sky border-sky-400/60
            text-sky-200
            bg-sky-500/10
            backdrop-blur-sm
            transition-all
            duration-200
            ${
              page <= 1
                ? "opacity-40 pointer-events-none"
                : "hover:bg-sky-400/20 hover:shadow-lg hover:shadow-sky-500/20"
            }  
            `}
          >
            ← Prev
          </Link>

          <Link
            href={`/flights/flight-history?page=${page + 1}`}
            aria-disabled={page >= totalPages}
            className={`
               px-3 py-1.5 rounded-lg 
            border border-sky border-sky-400/60
            text-sky-200
            bg-sky-500/10
            backdrop-blur-sm
            transition-all
            duration-200
              ${
                page >= totalPages
                  ? "opacity-40 pointer-events-none"
                  : "hover:bg-sky-400/20 hover:shadow-lg hover:shadow-sky-500/20"
              }  
              `}
          >
            Next →
          </Link>
        </section>

        <section className="text-sm text-sky-200">
          Page {page} of {totalPages}
        </section>
      </footer>
    </main>
  );
}
