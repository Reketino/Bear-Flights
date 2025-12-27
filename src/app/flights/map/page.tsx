export const dynamic = "force-dynamic";

import { getSupabaseServerClient } from "@/lib/supabase";
import FlightMapClient from "@/components/Map/FlightMapClient";
import BackButton from "@/components/BackButton";




export default async function FlightsMapPage() {
    const supabase = getSupabaseServerClient();


    const { data, error } = await supabase
    .from("flight_positions")
    .select(
      "icao24, callsign, latitude, longitude, altitude, velocity"
    );


    if (error) {
        return (
            <main className="p-6">
                <h1 className="
                text-2xl font-bold"
                >
                    Map error
                </h1>
                <p className="text-red-400">
                    {error.message}
                </p>
            </main>
        );
    }


    return (
        <main className="
        p-6 max-w-7xl mx-auto
        ">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">
                    🗺️Live Flight Map of Sykkylven
                </h1>
                <p className="text-neutral-400">
                    Detected within a 50 km radius🔍
                </p>
            </header>

            <FlightMapClient flights={data ?? []} />
        </main>
    )
    }
