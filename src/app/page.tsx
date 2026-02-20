import FlightActivityLive from "./components/FlightTimer/FlightActivityLive";
import Link from "next/link";
import AnimatedLogo from "@/components/Logo/animatedlogo";

export default function HomePage() {
  return (
    <main
      className="
    min-h-[calc(100vh-3.5rem)]
    flex items-center
    justify-center px-6
    "
    >
      <section
        className="
      max-w-3xl text-center
      "
      >
        <AnimatedLogo />

        <p className="text-blue-950 text-lg mb-4">
          Overview of flights crossing the airspace in Sykkylven, Norway -
          updates every 5 minutes.
        </p>

        <nav
          className=" 
      flex flex-col
      justify-center gap-4
      "
        >
          {/* Daily Flights Page */}
          <Link
            href="/flights/daily-flights"
            className="
        px-6 py-3 rounded-xl
        text-black font-semibold
        bg-emerald-500 hover:bg-emerald-400
        transition
        "
          >
            Flights Today📅
          </Link>

          {/* All Registered Flights */}
          <Link
            href="/flights/flight-history"
            className="
      px-6 py-3 rounded-xl
      text-black font-semibold
      bg-amber-500 hover:bg-amber-400
      transition
      "
          >
            Flight History✈️
          </Link>

          {/* Map Showing flights */}
          <Link
            href="/flights/map"
            className=" px-6 py-3 rounded-xl
      text-black font-semibold
      bg-blue-500 hover:bg-blue-400
      transition
      "
          >
            Flight Map🗺️
          </Link>

          <a
            href="https://opensky-network.org"
            target="_blank"
            rel="noopener noreferrer"
            className="
      px-3 py-3 rounded-xl
      text-neutral-200 font-semibold
      border border-amber-500/50
      hover:bg-white/10 transition
      "
          >
            Datasource: Opensky
          </a>
        </nav>

        {/* Flight Timer */}
        <FlightActivityLive />

        <p className="text-xs text-blue-950 mt-5">
          Built using Next.js, Supabase & Opensky API
        </p>
      </section>
    </main>
  );
}
