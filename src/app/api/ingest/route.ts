import { fetchFlights } from "@/lib/flights/fetchFlights";
import { normalizeFlight } from "@/lib/flights/normalizeFlights";
import { aggregateFlightsForDay } from "@/lib/flights/aggregateFlights";
import { saveDailyFlightsToSupabase } from "@/db/dailyFlights";

export async function POST() {
  try {
    // Raw flight data
    const rawFlights = await fetchFlights();

    // Normalizing flight data
    const normalizedFlights = rawFlights
      .map(normalizeFlight)
      .filter((f): f is NonNullable<typeof f> => f !== null);

    //  Aggregate flights daily
    const dailyFlights = aggregateFlightsForDay(normalizedFlights);

    // Saving data to Supabase
    await saveDailyFlightsToSupabase(dailyFlights);

    // Feedback Throwing if not working
    return Response.json({
      ok: true,
      raw: rawFlights.length,
      normalized: normalizedFlights.length,
      saved: dailyFlights.length,
    });
  } catch (error) {
    console.error("SRY Ingest Failed", error);

    return Response.json(
      { ok: false, error: "YES Ingest still fails" },
      { status: 500 }
    );
  }
}
