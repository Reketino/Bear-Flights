import L from "leaflet";

 export const safeHeading = (heading: number | null) =>
  typeof heading === "number" && Number.isFinite(heading) ? heading : 0;

 export const altitudeColor = (altitude: number | null) => {
  if (altitude === null) return "#9ca3af";
  if (altitude < 3000) return "#22c55e";
  if (altitude < 9000) return "#eab308";
  return "#ef4444";
};

 export const planeIcon = (heading: number | null, altitude: number | null) => {
 const rotation = safeHeading(heading) - 90;

  return L.divIcon({
    className: "",
    html: `
      <div style="
      width:45px;
      height:45px;
      display:flex;
      align-items:center;
      justify-content:center;
      transform: rotate(${rotation}deg); 
      ">
      <img
      src="/icons/airplane.png"
      style="
      width:45px;
      height:45px;
      display: block;
      filter: drop-shadow(0 0 6px ${altitudeColor(altitude)});
      "
      />
      </div>
      `,
    iconSize: [40, 40],
    iconAnchor: [22, 22],
    popupAnchor: [0, -16],
  });
};