import { createClient } from "@supabase/supabase-js";

export default async function FlightActivity() {
    const supabase = createClient();

    const { data } = await supabase
    .from("flight_activity")
    .select("*")
    .single();

    if (!data?.seconds_since_last_flight) {
        return null;
    }
    
}