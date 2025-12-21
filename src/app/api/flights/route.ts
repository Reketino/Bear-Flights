import { fetchFlights } from "@/lib/flights/fetchFlights";

export async function GET() {
  try {
    const flights = await fetchFlights();

    return Response.json({
      count: flights.length,
      flights,
    });
  } catch (error) {
    console.error("API /flights error:", error);

    return Response.json(
      { error: "Mission to fetch flights failed!" },
      { status: 500 }
    );
  }
}
