import type { LucideIcon } from "lucide-react";
import { MapIcon, PlaneTakeoff, Clock, } from "lucide-react";

// Defining Navitem function
export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

// Icons in Navbar
export const NavItems: NavItem[] = [
  { href: "map", label: "Flight Map", icon: MapIcon },
  { href: "daily-flights", label: "Flight's Today", icon: PlaneTakeoff },
  { href: "flight-history", label: " Flight History", icon: Clock },
];
