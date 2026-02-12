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
    <p className="mt-6 text-sm text-blue-950">
      ✈️ Last flight observed was {hours > 0 ? `${hours}h` : ""} {minutes % 60}m{" "}
      {seconds % 60}s ago
    </p>
  );
}
