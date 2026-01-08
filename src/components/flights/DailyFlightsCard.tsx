import Link from "next/link";
import type { DailyFlight } from "@/types/DailyFlightCard";

const DATE_LOCALE = "en-GB"

type Props = {
    day: DailyFlight;
};;


export default function DailyFlightsCard({ day }: Props) {
    const date = new Date(day.date)


  return (

     <article className="
     relative rounded-xl p-5 border
    border-gray-600
    bg-gray-800/20
           ">
            <header className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">
                {date.toLocaleDateString(DATE_LOCALE)}
              </h2>

              <span className="text-sm text-shadow-blue-200">
                {day.total_flights} Flights Today
              </span>
            </header>

            {day.total_flights === 0 ? (
              <p className="italic text-gray-500">
                Zero flights detected today!.
              </p>

            ) : (

              <ul className="relative text-sm space-y-1 z-10">
                <li>
                  <strong>Closest:</strong>{" "}
                  {day.closest_icao24 ? (

                    <Link
                      href={`/flights/${day.closest_icao24}`}
                      className="closest-flight">
                      {day.closest_callsign ?? day.closest_icao24}
                    </Link>
                  ) : (
                    "—"
                  )}
                </li>

                <li>
                  <strong>Longest:</strong>{" "}
                  {day.longest_icao24 ? (

                    <Link href={`/flights/${day.longest_icao24}`}
                     className="longest-flight">
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
                className="mt-3 hover:scale-105 text-sm text-amber-400">
                {day.fun_fact}
              </p>
            )}
          </article>
  )
}
