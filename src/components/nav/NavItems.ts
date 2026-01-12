import type { LucideIcon } from "lucide-react";
import { Radar, PlaneTakeoff, Clock, } from "lucide-react";

// Defining Navitem function
export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

// Icons in Navbar
export const NavItems: NavItem[] = [
  { href: "map", label: "Flight Map", icon: Radar },
  { href: "daily-flights", label: "Flight's Today", icon: PlaneTakeoff },
  { href: "flight-history", label: "History", icon: Clock },
];
