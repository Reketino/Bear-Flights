export type FlightPosition = {
  icao24: string;
  callsign: string | null;

  latitude: number;
  longitude: number;

  altitude: number | null;
  velocity: number | null;
  heading: number | null;

  departure_airport: string | null;
  arrival_airport: string | null;

  aircraft: {
    registration: string | null;
    typecode: string | null;
    manufacturer: string | null;
    model: string | null;
    owner: string | null;
  } | null;
};
