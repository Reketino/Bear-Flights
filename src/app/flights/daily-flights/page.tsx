export const dynamic = "force-dynamic";

import { getSupabaseServerClient } from "@/lib/supabase";
import DailyFlightsCard from "@/components/flights/DailyFlightsCard";

export default async function DailyFlightsPage() {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("daily_flights")
    .select(
      `
        id,
        date,
        total_flights,
        closest_callsign,
        closest_icao24,
        longest_callsign,
        longest_icao24,
        fun_fact
        `,
    )
    .order("date", { ascending: false })
    .limit(14);

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Flights Today</h1>
        <p className="text-red-400">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl text-center font-bold">
          📅 Flights Registered Today
        </h1>
        <p className="text-blue-950 text-center mt-2">
          Flights Over Sykkylven Today.
        </p>
      </header>

      <section className="space-y-4">
        {data?.map((day) => (
          <DailyFlightsCard key={day.id} day={day} />
        ))}
      </section>
    </main>
  );
}
