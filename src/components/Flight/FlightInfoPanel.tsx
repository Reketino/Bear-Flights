
"use client";

import {
  Badge,
  Building2,
  Hash,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  UserRound,
  Gauge,
  Compass,
  Ruler,
} from "lucide-react";

import type { FlightPosition } from "@/types/flightposition";
import { AIRPORTS } from "@/lib/airports/airportcoords";

type Props = {
  flight: FlightPosition | null;
};

function Detail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof Hash;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </p>
      <p className="wrap-break-word font-semibold text-slate-100">{value}</p>
    </div>
  );
}

export default function FlightInfoPanel({ flight }: Props) {
  if (!flight) return null;

  const departureICAO = flight.departure_airport?.trim().toUpperCase();
  const arrivalICAO = flight.arrival_airport?.trim().toUpperCase();

  const departureAirport = departureICAO
    ? AIRPORTS[departureICAO]
    : undefined;

  const arrivalAirport = arrivalICAO
    ? AIRPORTS[arrivalICAO]
    : undefined;

  const altitudeFeet =
    flight.altitude !== null
      ? Math.round(flight.altitude * 3.28084)
      : null;

  const speedKmh =
    flight.velocity !== null
      ? Math.round(flight.velocity * 3.6)
      : null;

  const heading =
    flight.heading !== null ? Math.round(flight.heading) : null;

  const aircraft = flight.aircraft;
  const aircraftName = aircraft?.model ?? aircraft?.typecode ?? null;

  return (
    <aside className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 text-white shadow-2xl shadow-black/20">
      <header className="border-b border-white/10 bg-linear-to-r from-sky-500/10 via-slate-900/40 to-transparent p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-400">
              <Plane className="size-7" />
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Flight information
              </p>

              <h2 className="truncate text-2xl font-bold tracking-tight text-sky-400">
                {flight.callsign?.trim() || flight.icao24.toUpperCase()}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {aircraftName ?? "Aircraft details unavailable"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {flight.airline && (
              <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-300">
                {flight.airline}
              </span>
            )}

            {flight.airline_icao && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300">
                {flight.airline_icao}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
          <span className="inline-flex items-center gap-2">
            <Hash className="size-4" />
            ICAO24:{" "}
            <span className="font-mono text-slate-200">
              {flight.icao24.toUpperCase()}
            </span>
          </span>

          {aircraft?.registration && (
            <span className="inline-flex items-center gap-2">
              <Badge className="size-4" />
              <span className="font-mono text-slate-200">
                {aircraft.registration}
              </span>
            </span>
          )}
        </div>
      </header>

      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
        <Detail
          label="Altitude"
          value={
            altitudeFeet !== null
              ? `${altitudeFeet.toLocaleString("en-US")} ft`
              : "Unavailable"
          }
          icon={Ruler}
        />

        <Detail
          label="Ground speed"
          value={speedKmh !== null ? `${speedKmh} km/h` : "Unavailable"}
          icon={Gauge}
        />

        <Detail
          label="Heading"
          value={heading !== null ? `${heading}°` : "Unavailable"}
          icon={Compass}
        />

        <Detail
          label="Aircraft type"
          value={aircraft?.typecode ?? "Unavailable"}
          icon={Plane}
        />
      </div>

      <section aria-labelledby="route-heading" className="px-5 pb-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 id="route-heading" className="text-lg font-semibold">
            Route
          </h3>
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Recorded airports
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <PlaneTakeoff className="size-4" />
              Departure
            </p>

            <p className="text-xl font-bold">
              {departureICAO ?? "Unknown"}
            </p>

            <p className="mt-1 text-sm text-slate-300">
              {departureAirport?.name ?? "Airport unavailable"}
            </p>

            {departureAirport?.country && (
              <p className="mt-1 text-xs text-slate-500">
                {departureAirport.country}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center py-1 text-sky-400">
            <div className="hidden w-8 border-t border-dashed border-sky-400/50 md:block" />
            <Plane className="size-5 rotate-90 md:rotate-0" />
            <div className="hidden w-8 border-t border-dashed border-sky-400/50 md:block" />
          </div>

          <div className="rounded-xl border border-rose-400/15 bg-rose-400/5 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <PlaneLanding className="size-4" />
              Arrival
            </p>

            <p className="text-xl font-bold">
              {arrivalICAO ?? "Unknown"}
            </p>

            <p className="mt-1 text-sm text-slate-300">
              {arrivalAirport?.name ?? "Airport unavailable"}
            </p>

            {arrivalAirport?.country && (
              <p className="mt-1 text-xs text-slate-500">
                {arrivalAirport.country}
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="aircraft-heading"
        className="border-t border-white/10 p-5 sm:p-6"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-sky-400/10 p-2 text-sky-400">
            <Plane className="size-5" />
          </div>

          <div>
            <h3 id="aircraft-heading" className="font-semibold">
              Aircraft details
            </h3>
            <p className="text-sm text-slate-400">
              Registry and manufacturer information
            </p>
          </div>
        </div>

        {aircraft ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Detail
              label="Manufacturer"
              value={aircraft.manufacturer ?? "Unavailable"}
              icon={Building2}
            />

            <Detail
              label="Model"
              value={aircraft.model ?? "Unavailable"}
              icon={Plane}
            />

            <Detail
              label="Typecode"
              value={aircraft.typecode ?? "Unavailable"}
              icon={Badge}
            />

            <Detail
              label="Registration"
              value={aircraft.registration ?? "Unavailable"}
              icon={Hash}
            />

            <Detail
              label="Owner"
              value={aircraft.owner ?? "Unavailable"}
              icon={UserRound}
            />
          </div>
        ) : (
          <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
            Aircraft registry information is not available for this aircraft.
          </p>
        )}
      </section>
    </aside>
  );
}
