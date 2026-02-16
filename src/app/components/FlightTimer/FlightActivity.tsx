import { getSupabaseServerClient } from "@/lib/supabase";
import FlightActivityLive from "./FlightActivityLive";
import { secondsSince } from "@/lib/flighttimer/timer";

export default async function FlightActivity() {
  const supabase = getSupabaseServerClient();

  const { data } = await supabase
    .from("flights")
    .select("last_seen")
    .order("last_seen", { ascending: false })
    .limit(1)
    .single();

  if (!data?.last_seen) return null;
  

  return (
    <FlightActivityLive initialSeconds={secondsSince(data.last_seen)} />
  );
}
