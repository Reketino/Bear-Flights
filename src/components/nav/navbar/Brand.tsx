import Link from "next/link";
import { Radar } from "lucide-react";

export default function Brand() {
  return (
    <Link
    href="/
    "
    className="
    flex items-center group
    gap-3 px-2 py-1
    rounded-2xl
    hover:bg-white/10
    transition
    ">
      <section className="
      grid h-10 w-10 place-items-center
      rounded-2xl
      border border-neutral-200
      bg-white shadow-sm
      ">
        <Radar className="
        h-5 w-5 text-sky-700" />
      </section>

      <section className="leading-tight">
        <p className="
        text-sm font-semibold
        tracking-tight text-neutral-950
        ">
            BearFlights
        </p>
        <p className="text-xs text-white">
            Air traffic dashboard
        </p>
      </section>
    </Link>
  )
}
