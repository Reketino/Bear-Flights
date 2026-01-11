import type { LucideIcon } from "lucide-react";
import { Radar, PlaneTakeoff, Clock, Globe2 } from "lucide-react";


export type NavItem = {
    href: string;
    label: string;
    icon: LucideIcon;
};

// Icons in Navbar
export const NavItems: NavItem[] = [
    { href: "/bearsflight", label: "Radar", icon: Radar},
    { href: "bearsflight/live", label: "Live", icon: PlaneTakeoff },
    { href: "/bearsflight/history", label: "History", icon: Clock},
    { href: "bearsflight/about", label: "About", icon: Globe2 },
]
