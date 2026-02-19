"use client";

import dynamic from "next/dynamic";

const FlightActivity = dynamic(
  () => import("./FlightActivity"),
  { ssr: false }
);

export default function FlightActivityWrapper() {
    return <FlightActivity />
}
