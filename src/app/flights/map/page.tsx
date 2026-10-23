export const dynamic = "force-dynamic";

import type { FlightPosition } from "@/types/flightposition";
import { getSupabaseServerClient } from "@/lib/supabase";
import FlightMapClient from "@/components/Map/client/FlightMapClient";

type pageProps = {
  searchParams?: Promise<{
    icao24?: string;
  }>;
};

export default async function FlightsMapPage({ searchParams }: pageProps) {
  const supabase = getSupabaseServerClient();
  const params = await searchParams;
  const icao24 = params?.icao24?.trim().toLowerCase();

  let query = supabase
    .from("flight_positions")
    .select("icao24, callsign, latitude, longitude, altitude, velocity, heading, departure_airport, arrival_airport");

  if (icao24) {
    query = query.eq("icao24", icao24);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <main className="mx-auto max-w-7xl p-6">
        <h1 className="text-2xl font-bold">Map error</h1>
        <p className="mt-2 text-red-400">{error.message}</p>
      </main>
    );
  }

  const positions = data ?? [];
  const icao24s = [...new Set(positions.map((flight) => flight.icao24))];

  const [aircraftResult, flightsResult] = await Promise.all([
    icao24s.length > 0
      ? supabase
        .from("aircraft_registry")
        .select("icao24, registration, typecode, manufacturer, model, owner")
        .in("icao24", icao24s)
      : Promise.resolve({ data: [], error: null }),

    icao24s.length > 0
      ? supabase
        .from("flights")
        .select("icao24, airline, airline_icao, first_seen")
        .in("icao24", icao24s)
        .order("first_seen", { ascending: false })
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (aircraftResult.error) {
    console.error("Aircraft registry error:", aircraftResult.error.message);
  }

  if (flightsResult.error) {
    console.error("Airline lookup error:", flightsResult.error.message);
  }

  const aircraftByIcao24 = new Map(
    (aircraftResult.data ?? []).map((aircraft) => [
      aircraft.icao24,
      aircraft,
    ]),
  );

  const airlineByIcao24 = new Map<
    string,
    { airline: string | null; airline_icao: string | null }
  >();

  for (const record of flightsResult.data ?? []) {
    if (airlineByIcao24.has(record.icao24)) continue;

    if (record.airline || record.airline_icao) {
      airlineByIcao24.set(record.icao24, {
        airline: record.airline,
        airline_icao: record.airline_icao,
      });
    }
  }

  const safeFlights: FlightPosition[] = (data ?? [])
    .filter(
      (flight) =>
        Number.isFinite(flight.latitude) &&
        Number.isFinite(flight.longitude),
    )
    .map((flight) => {
      const aircraft = aircraftByIcao24.get(flight.icao24);

      return {
        ...flight,
        aircraft: aircraft
          ? {
            registration: aircraft.registration,
            typecode: aircraft.typecode,
            manufacturer: aircraft.manufacturer,
            model: aircraft.model,
            owner: aircraft.owner
          }
          : null
      };
    });

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <header className="mb-4">
        <h1 className="text-3xl font-bold"> Flight Map of Sykkylven</h1>
        <p className="text-neutral-300 font-medium mt-2">
          Detected within a 50 km radius🔍
        </p>
      </header>

      <FlightMapClient
        flights={safeFlights}
        singleFlight={Boolean(icao24)}
      />
    </main>
  );
}
