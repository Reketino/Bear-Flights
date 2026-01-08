export type DailyFlight = {
  id: string;
  date: string;
  total_flights: number;
  closest_callsign: string | null;
  closest_icao24: string | null;
  longest_callsign: string | null;
  longest_icao24: string | null;
  fun_fact: string | null;
};
