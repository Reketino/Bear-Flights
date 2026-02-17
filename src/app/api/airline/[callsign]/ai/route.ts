import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { aiAirlineDescription } from "@/lib/gemini/models/geminiAirlineModel";


export async function GET(
    _req: Request,
    context: { params: Promise<{ callsign: string}> }
) {
    const { callsign } = await context.params;


    const supabase = getSupabaseServerClient();

    const { data } = await supabase
    .from("airline_ai_descriptions")
    .select("description")
    .eq("callsign", callsign)
    .maybeSingle();

    if (data?.description) {
        return NextResponse.json({
            callsign,
            description: data.description,
            cached: true,
        });
    }

    const description = await aiAirlineDescription(callsign);

    await supabase
    .from("airline_ai_descriptions")
    .insert({ callsign, description })

    return NextResponse.json({
        callsign,
        description,
        cached: false
    })
}