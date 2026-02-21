import fs from "fs"
import path from "path"
import { AIRPORTS, AirPortCoords } from "./airportcoords"


function sortAirports(
    airports: Record<string, AirPortCoords>
) {
    return Object.entries(airports).sort(([, a], [, b]) => {
        const byCountry = a.country.localeCompare(b.country);
        if (byCountry !== 0) return byCountry;

        return (a.name ?? "").localeCompare(b.name ?? "");
    })
    }

function generateGroupedObject(
    entries: [string, AirPortCoords][]
): string {
    let currentCountry = "";
    let output = "{\n";

    for (const [icao, airport] of entries) {
        if (airport.country !== currentCountry) {
            currentCountry = airport.country;
            output += `\n  // ${currentCountry.toUpperCase()}\n`;
        }

        output += `  ${icao}: ${JSON.stringify(airport, null, 2)
            .replace(/^/gm, "  ")
            .trimStart()}, \n\n`;
    }
    output += "}";
    return output;
}

const sortedEntries = sortAirports(AIRPORTS)
const groupedObjectString = generateGroupedObject(sortedEntries);

const fileContent=`
export type AirPortCoords = {
    lat: number;
    lon: number;
    country: string;
    name?: string;
    }
    
    export const AIRPORTS: Record<string, AirPortCoords> = ${groupedObjectString};
    `;


const filePath = path.resolve(
    process.cwd(),
    "src/lib/airports/airportcoords.ts"
);

fs.writeFileSync(filePath, fileContent);

// Run script in console w: npm run sort:airports

console.log("Airports sorted and file are up to d8🫡")