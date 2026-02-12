import { getSupabaseServerClient } from "@/lib/supabase";
import FlightActivityLive from "./FlightActivityLive";

export default async function FlightActivity() {
  const supabase = getSupabaseServerClient();

  const { data } = await supabase.from("flight_activity").select("*").single();

  if (!data?.seconds_since_last_flight) {
    return null;
  }

  return (
    <FlightActivityLive 
    initialSeconds={Math.floor(data.seconds_since_last_flight)} />

  );
}
