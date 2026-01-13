export type Flight = {
  id: number;
  icao24: string;
  callsign: string | null;
  aircraft_type: string | null;

  airline: string | null;
  airline_icao: string | null;

  origin: string | null;
  origin_country: string | null;

  route: string | null;
  distance_over_area: number | null;
  first_seen: string;
};
