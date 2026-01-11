import type { ReactNode } from "react";
import FlightsNavbar from "@/components/nav/navbar/FlightsNavbar";

export default function FlightsLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <FlightsNavbar />
    <main
      className="
         relative p-6 
         max-w-7xl mx-auto
        "
    >
     
      {children}
    </main>
    </>
  );
}
