"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import StatusChip from "./StatusChip";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function NavbarActions({ open, setOpen}: Props) {
  return (
   <aside className="
   flex items-center gap-2
   ">
      <StatusChip />

      <Link
      href="https://www.reketino.no/"
      target="_blank"
      rel="noopener noreferrer"
      className="
      hidden items-center
      gap-2 px-3 py-2
      md:flex rounded-2xl

      bg-neutral-900
      hover:bg-neutral-800
      text-sm text-white
      font-medium
      shadow-sm
      transition
      ">
       Portfolio <ArrowUpRight className="h-4 w-4" />
      </Link>

      <button 
      onClick={() => setOpen((v) => !v)}
      className="
      grid place-items-center
      rounded-2xl h-10 w-10

      border border-neutral-200
      bg-white hover:bg-neutral-50
      shadow-sm text-neutral-900
      transition md:hidden
      "
      aria-label={open ? "Close menu" : "Open menu"}
      >
       {open ? <X className="w-5 h-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </aside>
  )
}
