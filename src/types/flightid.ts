export type Flight = {
  id: number;
  icao24: string;
  callsign: string | null;
  origin: string | null;
  origin_country: string | null;
  route: string | null;
  distance_over_area: number | null;
  first_seen: string;
  aircraft_type: string | null;
};
