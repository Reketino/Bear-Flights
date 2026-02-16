import { getSupabaseServerClient } from "@/lib/supabase";
import FlightActivityLive from "./FlightActivityLive";

export default async function FlightActivity() {
  const supabase = getSupabaseServerClient();

  const { data } = await supabase
    .from("flights")
    .select("last_seen")
    .order("last_seen", { ascending: false })
    .limit(1)
    .single();

  if (!data?.last_seen) return null;

  return <FlightActivityLive initialTimestamp={data.last_seen} />;
}
