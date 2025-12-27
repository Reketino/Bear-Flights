import type { ReactNode } from "react";
import BackButton from "@/components/BackButton";


export default function FlightsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className="
        p-6 max-w-7xl mx-auto
        ">
            <header className="
            mb-4 flex items-center justify-between
            ">
            <BackButton />
            </header>
            {children}
        </main>
    )
}