import { getSupabaseServerClient } from "@/lib/supabase";
import { sup } from "framer-motion/client";


type PageProps = {
    params: {
        icao24: string;
    };
};



export default async function FlightDetailPage({params }: PageProps ) {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("icao24", params.icao24)
      .order("firste_seen", { ascending: false })
      .limit(1)
      .single();
    
}
