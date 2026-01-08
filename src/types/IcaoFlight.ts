export type IcaoFlight = {
  id?: number;
  icao24: string;
  callsign: string | null;
  origin: string | null;
  route: string | null;
  distance_over_area: number | null;
  first_seen: string;
  last_seen: string;
};
