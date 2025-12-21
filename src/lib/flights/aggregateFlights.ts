import type { NormalizedFlight } from "./normalizeFlights";

export type DailyAggregatedFlight = {
    icao24: string;
    callsign: string | null;
    originCountry: string;

    firstSeen: number;
    lastSeen: number;

    maxAltitudeMeters: number | null;
    maxSpeedMps: number | null;
    closestDistanceKm: number;

    observations: number;
    date: string; // Year-Month-Day
};

export function aggregateFlightsForDay(
    flights: NormalizedFlight[],
    date: Date = new Date()
): DailyAggregatedFlight[] {
    const dayKey = date.toISOString().slice(0, 10);

    const map = new Map<string, DailyAggregatedFlight>();

    for (const flight of flights) {
        const key = `${flight.icao24}:${dayKey}`;

        const existing = map.get(key);

        if (!existing) {
            map.set(key, {
                icao24: flight.icao24,
                callsign: flight.callsign,
                originCountry: flight.originCountry,

                firstSeen: flight.seenAt,
                lastSeen: flight.seenAt,

                maxAltitudeMeters: flight.altitudeMeters,
                maxSpeedMps: flight.speedMps,
                closestDistanceKm: flight.insideRadiusKm,

                observations: 1,
                date: dayKey,
            });
            
            continue;
        }

        existing.firstSeen = Math.min(existing.firstSeen, flight.seenAt);
        existing.lastSeen = Math.max(existing.lastSeen, flight.seenAt);

        if (
            flight.altitudeMeters !== null &&
            (existing.maxAltitudeMeters === null ||
              flight.altitudeMeters > existing.maxAltitudeMeters)
        ) {
            existing.maxAltitudeMeters = flight.altitudeMeters;
        }

        if (
            flight.speedMps !== null && 
            (existing.maxSpeedMps === null ||
              flight.speedMps > existing.maxSpeedMps) 
        ) {
            existing.maxSpeedMps = flight.speedMps;
        }

        existing.closestDistanceKm = Math.min(
            existing.closestDistanceKm,
            flight.insideRadiusKm
        );

        existing.observations += 1;
    }

    return Array.from(map.values());
}