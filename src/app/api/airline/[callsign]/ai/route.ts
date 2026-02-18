import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { aiAirlineDescription } from "@/lib/gemini/models/geminiAirlineModel";

export async function GET(
  _req: Request,
  context: { params: Promise<{ callsign: string }> },
) {
  const { callsign } = await context.params;
  const cleanCallsign = callsign.trim().toUpperCase();

  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("airline_ai_descriptions")
    .select("description")
    .eq("callsign", cleanCallsign)
    .maybeSingle();

  if (error) {
    console.error("Supabase choose your error:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    )
  }

  if (data?.description) {
    return NextResponse.json({
      callsign: cleanCallsign,
      description: data.description,
      cached: true,
    });
  }

  const description = await aiAirlineDescription(cleanCallsign);

  await supabase
    .from("airline_ai_descriptions")
    .insert({ callsign: cleanCallsign, description });

  return NextResponse.json({
    callsign: cleanCallsign,
    description,
    cached: false,
  });
}
