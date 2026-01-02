import type { ReactNode } from "react";
import BackButton from "@/components/Buttons/BackButton";


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
            <BackButton />
            {children}
        </main>
    )
}