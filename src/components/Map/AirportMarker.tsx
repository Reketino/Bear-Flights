import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";

type AirportMarkerLogic = {
    position: LatLngExpression;
    type: "departure" | "arrival";
    label?: string;
}

const airportIcon = (emoji: string) =>
    L.divIcon({
        className: "",
        html: `<div style="font-size:40px;">${emoji}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    })

export function AirportMarker({
    position,
    type,
    label,
}: AirportMarkerLogic) {
    const emoji = type === "departure" ? "🛫" : "🛬";
    return (
        <Marker position={position} icon={airportIcon(emoji)}>
            {label && <Popup>{label}</Popup>}
        </Marker>
    );
}