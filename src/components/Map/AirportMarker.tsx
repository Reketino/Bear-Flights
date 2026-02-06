import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";

type AirportMarkerLogic = {
    position: LatLngExpression;
    color: string;
    label?: string;
}