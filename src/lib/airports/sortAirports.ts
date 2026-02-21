import fs from "fs"
import path from "path"
import { AIRPORTS, AirPortCoords } from "./airportcoords"

function compareAirports(a: AirPortCoords, b: AirPortCoords): number {
    const byCountry = a.country.localeCompare(b.country);
    if (byCountry !== 0) return byCountry;

    return (a.name ?? "").localeCompare(b.name ?? "");
}
