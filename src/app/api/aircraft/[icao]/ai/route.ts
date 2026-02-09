import { supabase } from "@/db/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { icao: string } },
) {

 const icao = params.icao.toUpperCase();

  const data = await supabase
  return NextResponse.json(data);
}
