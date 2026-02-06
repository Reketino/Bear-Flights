import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";

type AirportMarkerLogic = {
    position: LatLngExpression;
    color: string;
    label?: string;
}

const airportIcon = (emoji: string) =>
    L.divIcon({
        className: "",
        html: `<div style="font-size:20px;">${emoji}</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    })

export function AirportMarker({
    position,
    color,
    label,
}: AirportMarkerLogic) {
    return (
        <Marker position={position} icon={airportIcon(color)}>
            {label && <Popup>{label}</Popup>}
        </Marker>
    );
}