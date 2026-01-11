import type { LucideIcon } from "lucide-react";
import { Radar, PlaneTakeoff, Clock, Globe2 } from "lucide-react";


export type NavItem = {
    href: string;
    label: string;
    icon: LucideIcon;
};

// Icons in Navbar
export const NavItems: NavItem[] = [
    { href: "map", label: "Flight Map", icon: Radar},
    { href: "daily-flights", label: "Flight's Today", icon: PlaneTakeoff },
    { href: "flight-history", label: "History", icon: Clock},
]
