import { getSupabaseServerClient } from "@/lib/supabase";

export default async function FlightActivity() {
  const supabase = getSupabaseServerClient();

  const { data } = await supabase.from("flight_activity").select("*").single();

  if (!data?.seconds_since_last_flight) {
    return null;
  }

  const seconds = Math.floor(data.seconds_since_last_flight);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return (
    <section className="mt-4 mb-4">

    <p className="text-center font-medium text-blue-950">
      ✈️ Last flight observed: 
      </p>

    <p className="text-center font-light text-green-600">
      {hours > 0 ? `${hours}h` : ""} {minutes % 60}m{" "}
      {seconds % 60}s ago
    </p>
    </section>
  );
}
