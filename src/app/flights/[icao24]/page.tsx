import { getSupabaseServerClient } from "@/lib/supabase";
import IacoDetails from "@/components/flights/IacoDetails";

type PageProps = {
  params: {
    icao24: string;
  };
};

export default async function FlightDetailPage(props: PageProps) {
  const params = await props.params;
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

  return <IacoDetails flight={data} />;
}
