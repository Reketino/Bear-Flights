import type { Feature, LineString } from "geojson";

export function emptyLine(): Feature<LineString> {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: [],
        }
    }
}