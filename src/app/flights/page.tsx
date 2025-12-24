import { getSupabaseServerClient } from "@/lib/supabase";

export const revalidate = 300;

type Flight = {
  icao24: string;
  callsign: string | null;
  origin: string | null;
  distance_over_area: number | null;
  first_seen: string;
};

export default async function FlightsPage() {
const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("flights")
    .select(
      "icao24, callsign, origin, distance_over_area, first_seen"
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
        <p className="text-sky-800">
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
              <th className="p-3 text-left">Callsign</th>
              <th className="p-3 text-left">Origin</th>
              <th className="p-3 text-right">Distance</th>
              <th className="p-3 text-right">Seen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((f) => (
              <tr
                key={f.icao24 + f.first_seen}
                className="border-t border-white/10"
              >
                <td className="p-3 font-mono">
                  {f.callsign ?? "—"}
                </td>
                <td className="p-3">
                  {f.origin ?? "Unknown"}
                </td>
                <td className="p-3 text-right">
                  {f.distance_over_area
                    ? `${f.distance_over_area} km`
                    : "—"}
                </td>
                <td className="p-3 text-right text-neutral-400">
                  {new Date(f.first_seen).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
