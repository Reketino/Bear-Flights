"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeButton() {
    const router = useRouter();

    return (
        <button
        onClick={() => router.push("/")}
        title="Home"
        className="
        absolute top-15 -right-6 z-50
        inline-flex items-center
        gap-2 px-3 py-1 rounded-lg
        text-sm font-bold text-sky-200/60
        bg-blue-950/30 hover:bg-blue-300/15
        hover:scale-105
        border border-white/10
        transition
        "
        >
            <Image
            src="/icons/homeicon.png"
            alt="home"
            width={20}
            height={20}
            />
            Home
        </button>
    )
}