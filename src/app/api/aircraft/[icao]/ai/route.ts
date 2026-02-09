import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { aiAircraftDescription } from "@/lib/gemini";
import { sup } from "framer-motion/client";


export async function GET(
  _req: Request,
  { params }: { params: { icao: string } },
) {

  const supabase = getSupabaseServerClient();
  const icao = params.icao.toUpperCase();

  const { data } = await supabase
  .from("aircraft_ai_descriptions")
  .select("description")
  .eq("icao", icao)
  .maybeSingle();

  if (data?.description) {
  return NextResponse.json({
    icao,
    description: data.description,
    chached: true,
  });
  }

  const description = await aiAircraftDescription(icao);

  await supabase
  .from("aircraft_ai_descriptions")
  .insert({ icao, description });

  return NextResponse.json({
    icao,
    description,
    cached: false,
  });
}
