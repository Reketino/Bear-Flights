import type { RawFlight } from "./fetchFlights";
import { BYGDA } from "../config/bygda";

export type NormalizedFlight = {
    icao24: string;
    callsign: string | null;
    originCountry: string;

    latitude: number;
    longitude: number;

    altitudeMeters: number | null;
    speedMps: number | null;
    heading: number | null;

    seenAt: number; //timestamp unix
    insideRadiusKm: number; //approx distance from center of Sykkylven
    };


    export function normalizeFlight(
        raw:RawFlight
    ): NormalizedFlight | null {
        if (
            !raw.icao24 ||
            raw.latitude == null ||
            raw.longitude == null
        ) {
            return null;
        }
        
        // Planes on ground is ignored
        if (raw.on_ground) return null;


        const distanceKm = approximateDistanceKm(
            BYGDA.center.lat,
            BYGDA.center.lon,
            raw.latitude,
            raw.longitude
        );

        // Extra fallback safety if outside radius
        if (distanceKm > BYGDA.radiusKm) return null;

        return {
            icao24: raw.icao24,
            callsign: raw.callsign,
            originCountry: raw.origin_country,

            latitude: raw.latitude,
            longitude: raw.longitude,

            altitudeMeters: raw.geo_altitude ?? raw.baro_altitude,
            speedMps: raw.velocity,
            heading: raw.true_track,

            seenAt: raw.last_contact,
            insideRadiusKm: Math.round(distanceKm * 10) / 10,
        };
    }


    function approximateDistanceKm(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        const kmPerDegLat = 111;
        const kmPerDegLon = 111 * Math.cos((lat1 * Math.PI) / 180);

        const dLat = (lat2 - lat1) * kmPerDegLat;
        const dLon = (lon2 - lon1) * kmPerDegLon;

        return Math.sqrt(dLat * dLat + dLon * dLon);
    }
