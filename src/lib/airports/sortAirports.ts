import fs from "fs"
import path from "path"
import { AIRPORTS, AirPortCoords } from "./airportcoords"
import { object } from "framer-motion/client";
import { json } from "stream/consumers";

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

function generateFileContent(
    airports: Record<string, AirPortCoords>
): string {
    return `export type AirPortCoords = {
    lat: number;
    lon: number;
    country: string;
    name?: string;
    }
    
    export const AIRPORTS: Record<string, AirPortCoords> = ${JSON.stringify(
        airports,
        null,
        2
    )};
    `;
}

const sorted = sortAirports(AIRPORTS);

const filePath = path.resolve(
    __dirname,
    "./airportcoords.ts"
);

fs.writeFileSync(filePath, generateFileContent(sorted));

console.log("Airports sorted and file are up to d8🫡")