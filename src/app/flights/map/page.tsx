export const dynamic = "force-dynamic";

import { getSupabaseServerClient } from "@/lib/supabase";
import FlightMapClient from "@/components/Map/FlightMapClient";

type FlightPosition = {
  icao24: string;
  callsign: string | null;
  latitude: number;
  longitude: number;
  altitude: number | null;
  velocity: number | null;
  heading: number | null;
  departure_airport: string | null;
  arrival_airport: string | null;
};

type pageProps = {
  searchParams?: Promise<{
    icao24?: string;
  }>;
};

export default async function FlightsMapPage({ searchParams }: pageProps) {
  const supabase = getSupabaseServerClient();

  const params = await searchParams;
  const icao24 = params?.icao24;

  let query = supabase
    .from("flight_positions")
    .select(
      "icao24, callsign, latitude, longitude, altitude, velocity, heading, departure_airport, arrival_airport",
    );

  if (icao24) {
    query = query.eq("icao24", icao24);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <main className="p-6">
        <h1
          className="
                text-2xl font-bold"
        >
          Map error
        </h1>
        <p className="text-red-400">{error.message}</p>
      </main>
    );
  }

  const safeFlights = (data ?? []).filter(
    (f): f is FlightPosition =>
      Number.isFinite(f.latitude) && Number.isFinite(f.longitude),
  );

  return (
    <main
      className="
        p-6 max-w-7xl mx-auto
        "
    >
      <header className="mb-4">
        <h1 className="text-3xl font-bold"> Flight Map of Sykkylven</h1>
        <p className="text-neutral-300 font-medium mt-2">
          Detected within a 50 km radius🔍
        </p>
      </header>

      <FlightMapClient flights={safeFlights} singleFlight={Boolean(icao24)} />
    </main>
  );
}
