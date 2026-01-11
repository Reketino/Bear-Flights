"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import Brand from "./Brand"
import DesktopNav from "../desk&mobile/DesktopNav";
import MobileNav from "../desk&mobile/MobileNav";
import NavbarActions from "./NavbarActions"

export default function FlightsNavbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);


  return (
    <header className="
    sticky top-0 z-50
    border-b border-neutral-200/70
    bg-white/85
    backdrop-blur-xl
    ">
        <section className="
        flex items-center mx-auto
        justify-between
        max-w-7xl gap-3 px-4 py-3
        sm:px-6
        ">
        <Brand />
        <DesktopNav pathname={pathname} />
        <NavbarActions open={open} setOpen={setOpen} />
        </section>

        {open && <MobileNav pathname={pathname} onNavigate={() => setOpen(false)} />}     
    </header>
  );
}
