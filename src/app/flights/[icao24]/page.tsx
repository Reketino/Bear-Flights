import { getSupabaseServerClient } from "@/lib/supabase";

type PageProps = {
  params: {
    icao24: string;
  };
};

export default async function FlightDetailPage({ params }: PageProps) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("icao24", params.icao24)
    .order("first_seen", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Flight not found</h1>
        <p className="text-neutral-400">ICAO24: {params.icao24}</p>
      </main>
    );
  }

  return (
    <main
      className="
        p-6 max-w-3xl mx-auto
        "
    >
      <h1 className="text-3xl font-bold mb-6">
        ✈️ Flight {data.callsign ?? data.icao24}
      </h1>

      <section
        className="
            grid grid-cols-1 
            sm:grid-cols-2 gap-6
            text-blue-400
            "
      >
        <Info label="ICAO24" value={data.icao24} />
        <Info label="Origin" value={data.origin ?? "Unknown"} />
        <Info
          label="Route"
          value={data.route ? `✈️${data.route}` : "In flight"}
        />
        <Info
          label="Distance over area"
          value={
            data.distance_over_area ? `${data.distance_over_area} km` : "—"
          }
        />
        <Info
          label="First seen"
          value={new Date(data.first_seen).toLocaleString("en-GB")}
        />
        <Info
          label="Last seen"
          value={new Date(data.last_seen).toLocaleString("en-GB")}
        />
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-xl bg-black/20
        hover:scale-105 
        border border-white/10 p-4
        "
    >
      <p
        className="
            text-xs text-blue-950
            uppercase tracking-wide
            "
      >
        {label}
      </p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
}
