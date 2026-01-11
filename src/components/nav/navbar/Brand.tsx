import Link from "next/link";
import { Radar } from "lucide-react";
import Image from "next/image";

export default function Brand() {
  return (
    <Link
    href="/"
    className="
    flex items-center group
    gap-3 px-2 py-1
    rounded-2xl
    hover:bg-sky-400/20
    transition
    ">
      <section className="
      grid h-10 w-10 place-items-center
      rounded-2xl
      border border-neutral-200/5
      bg-black/15 shadow-sm
      ">
        <Image
        src="/icons/brand.png"
        alt="Bearflights logo"
        width={64}
        height={64}
        className="w-8 h-8 object-contain"
        priority
        />
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
