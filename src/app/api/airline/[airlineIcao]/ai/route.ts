import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { aiAirlineDescription } from "@/lib/gemini/models/geminiAirlineModel";

export async function GET(
  _req: Request,
  context: { params: { airlineIcao: string } },
) {
  const { airlineIcao } = await context.params;

  const cleanIcao = airlineIcao.trim().toUpperCase();

  if (!/^[A-Z]{2,3}$/.test(cleanIcao)) {
    return NextResponse.json(
      { error: "Invalid airline ICAO code." },
      { status: 400 }
    );
  }


  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("airline_ai_descriptions")
    .select("description")
    .eq("airline_icao", cleanIcao)
    .maybeSingle();

  if (error) {
    console.error("Supabase choose your error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (data?.description) {
    return NextResponse.json({
      callsign: cleanIcao,
      description: data.description,
      cached: true,
    });
  }

  let description: string;

  try {
    description = await aiAirlineDescription(cleanIcao);
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json(
      {
        error:
          "AI failed on text generating, will evalute his future in the comapny",
      },
      { status: 500 },
    );
  }

  const { error: insertError } = await supabase
    .from("airline_ai_descriptions")
    .upsert(
      { airline_icao: cleanIcao, description },
      { onConflict: "airline_icao" },
    );

  if (insertError) {
    console.error("Supabase UPSERT error:", insertError);
  }

  return NextResponse.json({
    callsign: cleanIcao,
    description,
    cached: false,
  });
}
