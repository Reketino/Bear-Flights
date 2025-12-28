export const dynamic = "force-dynamic";

import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase";

type DailyFlight = {
  id: string;
  date: string;
  total_flights: number;
  closest_callsign: string | null;
  closest_icao24: string | null;
  longest_callsign: string | null;
  longest_icao24: string | null;
  fun_fact: string | null;
};

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
        `
    )
    .order("date", { ascending: false })
    .limit(14);

  if (error) {
    return (
      <main
        className="p-6
            "
      >
        <h1
          className="
                text-2xl font-bold
                "
        >
          Flights Today
        </h1>
        <p
          className="text-red-400
                "
        >
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <main
      className="
        p-6 max-w-4xl mx-auto
        "
    >
      <header
        className="mb-6
            "
      >
        <h1
          className="
                text-3xl text-center font-bold
                "
        >
          📅 Flights Registered Today
        </h1>
        <p
          className="text-sky-900 text-center mt-2
                "
        >
          Flights Over Sykkylven Today.
        </p>
      </header>

      <section
        className="space-y-4
            "
      >
        {data?.map((day) => (
          <article
            key={day.id}
            className="
            relative
            rounded-xl p-5 border
          border-white/10 bg-black/20
                "
          >
            <header
              className="
                    flex items-center
                    justify-between mb-2
                    "
            >
              <h2
                className="
                        font-semibold
                        "
              >
                {new Date(day.date).toLocaleDateString("en-GB")}
              </h2>
              <span
                className="
                        text-sm text-shadow-blue-200
                        "
              >
                {day.total_flights} Flights Today
              </span>
            </header>

            {day.total_flights === 0 ? (
              <p
                className="
                        italic text-gray-500
                        "
              >
                Zero flights detected today!.
              </p>
            ) : (
              <ul
                className="
                relative text-sm 
                space-y-1 z-10
                        "
              >
                <li>
                  <strong>Closest:</strong>{" "}
                  {day.closest_icao24 ? (
                    <Link
                      href={`/flights/${day.closest_icao24}`}
                      className="
                    inline-flex items-center gap-1
                    text-sky-400 hover:text-sky-300
                    underline-offset-4 hover:underline
                    "
                    >
                      {day.closest_callsign ?? day.closest_icao24}
                    </Link>
                  ) : (
                    "—"
                  )}
                </li>

                <li>
                  <strong>Longest:</strong>{" "}
                  {day.longest_icao24 ? (
                    <Link
                      href={`/flights/${day.longest_icao24}`}
                      className="   
                  inline-flex items-center gap-1
                  text-sky-400 hover:text-sky-300
                  underline-offset-4 hover:underline"
                    >
                      {day.longest_callsign ?? day.longest_icao24}
                    </Link>
                  ) : (
                    "—"
                  )}
                </li>
              </ul>
            )}
            {day.fun_fact && (
              <p
                className="
                        mt-3 text-sm text-amber-400
                        "
              >
                {day.fun_fact}
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
