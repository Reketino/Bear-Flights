import type { ReactNode } from "react";
import NavigationButtons from "@/components/Buttons/NavigationButtons";


export default function FlightsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className="
         relative p-6 
         max-w-7xl mx-auto
        ">
            <NavigationButtons />
            {children}
        </main>
    )
}