import fs from "fs"
import path from "path"
import { AIRPORTS, AirPortCoords } from "./airportcoords"
import { object } from "framer-motion/client";

function compareAirports(a: AirPortCoords, b: AirPortCoords): number {
    const byCountry = a.country.localeCompare(b.country);
    if (byCountry !== 0) return byCountry;

    return (a.name ?? "").localeCompare(b.name ?? "");
}

function sortAirports(
    airports: Record<string, AirPortCoords>
): Record<string, AirPortCoords> {
    return Object.fromEntries(
        Object.entries(airports).sort(([, a], [, b]) => 
        compareAirports(a,b)
        )
    );
}