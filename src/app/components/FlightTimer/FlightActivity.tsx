import { getSupabaseServerClient } from "@/lib/supabase";
import FlightActivityLive from "./FlightActivityLive";

export default async function FlightActivity() {
  const supabase = getSupabaseServerClient();

  const { data } = 
  await supabase
  .from("flight_activity")
  .select("last_observed")
  .single();

  if (!data?.last_observed) {
    return null;
  }

  return (
    <FlightActivityLive
      initialSeconds={secondsSince(data.last_observed)}
    />
  );
}
