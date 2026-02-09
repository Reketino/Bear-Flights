"use client";

import { useEffect, useState } from "react";

type AircraftAI = {
    icao: string;
    description: string;
};

export default function AiDescription({ icao }: {icao: string}) {
    const [data, setData] = useState<AircraftAI | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function fetchAI() {
            const res = await fetch(
                `/api/aircraft/${icao}/ai`
            )
            const json = await res.json();
            setData(json);
            setLoading(false);
        }

        fetchAI();
    }, [icao]);

    if (loading) return <p>Loading Aircraft Info...</p>
    return <p>{data?.description}</p>
} 
