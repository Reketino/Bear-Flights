import type { IcaoFlight } from "@/types/IcaoFlight";
import Link from "next/link";
import OriginFlag from "../flags/OriginFlag";
import { ReactNode } from "react";


const DATE_LOCALE = "en-GB";

type Props = {
    flight: IcaoFlight;
    };


export default function IacoDetails({ flight }: Props) {
  return (
      <main
      className="
        p-6 max-w-3xl mx-auto
        "
    >
      <h1 className="text-3xl font-bold mb-6">
        ✈️ Flight {flight.callsign ?? flight.icao24}
      </h1>
     
      <section
        className="
            grid grid-cols-1 
            sm:grid-cols-2 gap-6
            text-blue-400
            "
      >
        <Info label="ICAO24" value={flight.icao24} />

        <Info label="Origin"
              value={
                <OriginFlag country={flight.origin_country ?? flight.origin ?? "Unknown"} /> 
                 }
                 />
        <Info
          label="Route"
          value={flight.route ? `✈️${flight.route}` : "In flight"}
        />
        <Info
          label="Distance over area"
          value={
            flight.distance_over_area ? `${flight.distance_over_area} km` : "—"
          }
        />
        <Info
          label="First seen"
          value={new Date(flight.first_seen).toLocaleString(DATE_LOCALE)}
        />
        <Info
          label="Last seen"
          value={new Date(flight.last_seen).toLocaleString(DATE_LOCALE)}
        />
      </section>
       
       <section className="flex justify-center mt-6">
       <Link 
      href={`/flights/map?icao24=${flight.icao24}`}
      className="
      inline-block mt-6
      px-4 py-4 rounded-lg
     bg-blue-950/90 
     text-blue-400 font-semibold
     hover:bg-blue-800/50 hover:scale-105
      transition 
      "
      >
        🗺️ Check out this flight on the map!
      </Link>
      </section>

    </main>
  );
}

function Info({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div
      className="
        rounded-xl bg-black/30
        hover:scale-105 
        border border-white/10 p-4
        "
    >
      <p
        className="
            text-xs text-white
            uppercase tracking-wide
            "
      >
        {label}
      </p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  )
}
