import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { icao: string } },
) {
  const res = await fetch(`http://127.0.0.1:8000/aircraft/${params.icao}/ai`);

  const data = await res.json();
  return NextResponse.json(data);
}
