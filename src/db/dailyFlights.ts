import { supabase } from "./supabase";
import type { DailyAggregatedFlight } from "@/lib/flights/aggregateFlights";

type FlightRow = {
    date: string;
    icao24: string;
    callsign: string | null;
    origin: string | null;

    first_seen: string;
    last_seen: string;

    max_altitude: number | null;
    max_speed: number | null;

    distance_over_area: number;
    observations: number;
};


function mapToFlightRow(
    f: DailyAggregatedFlight
): FlightRow {
    return {
        date: f.date,
        icao24: f.icao24,
        callsign: f.callsign,
        origin: f.originCountry,

        first_seen: new Date(f.firstSeen * 1000).toISOString(),
        last_seen: new Date(f.lastSeen * 1000).toISOString(),

        max_altitude: f.maxAltitudeMeters,
        max_speed: f.maxSpeedMps,

        distance_over_area: f.closestDistanceKm,
        observations: f.observations,
    };
}


export async function saveDailyFlightsToSupabase (
    flights: DailyAggregatedFlight[]
) {
    if (flights.length === 0) return;

    const rows = flights.map(mapToFlightRow);

    const { error } = await supabase
    .from("flights")
    .upsert(rows, {
        onConflict: "icao24,date",
    });

    if (error) {
        console.error("Failed totally on supabase upsert", error);
        throw error;
    }
}