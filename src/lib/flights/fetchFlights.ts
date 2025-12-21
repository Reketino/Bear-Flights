import { BYGDA } from "../config/bygda"

// Collection of raw flight data
export type RawFlight = {
    icao24: string;
    callsign: string | null;
    origin_country: string;
    time_position: number | null;
    last_contact: number;
    longitude: number | null;
    latitude: number | null;
    baro_altitude: number | null;
    on_ground: boolean;
    velocity: number | null;
    true_track: number | null;
    vertical_rate: number | null;
    sensors: number[] | null;
    geo_altitude: number | null;
    squawk: string | null;
    spi: boolean;
    position_source: number;
};

type OpenSkyResponse = {
    time: number;
    states: any[] | null;
}


export async function fetchFlights(): Promise<RawFlight[]> {
    try {
  
//   Collect data only from set longtitude/Latitude
  const { minLat, maxLat, minLon, maxLon } = BYGDA.bounds;


  const url =
  `https://opensky-network.org/api/states/all` +
  `?lamin=${minLat}` +
  `&lamax=${maxLat}` +
  `&lomin=${minLon}` +
  `&lomax=${maxLon}`;


  const res = await fetch(url, {
    headers: {
        "User-Agent": "BearFlightTracking/1.0",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`OpenSky API error: ${res.status}`);
  }

  const data: OpenSkyResponse = await res.json();

  
  if (!data.states) return [];


  return data.states.map((s) => ({
    icao24: s[0],
    callsign: s[1]?.trim() || null,
    origin_country: s[2],
    time_position: s[3],
    last_contact: s[4],
    longitude: s[5],
    latitude: s[6],
    baro_altitude: s[7],
    on_ground: s[8],
    velocity: s[9],
    true_track: s[10],
    vertical_rate: s[11],
    sensors: s[12],
    geo_altitude: s[13],
    squawk: s[14],
    spi: s[15],
    position_source: s [16],
  }));
 } catch (error) {
    console.error("fetchFlights failed:", error);
    return [];
 }
}
