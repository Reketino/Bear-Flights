"use client";

import { useEffect, useState } from "react";

type Props = {
    aircraftType: string | null;
    onClose: () => void;
};

export default function AircraftDescriptionModal({
    aircraftType,
    onClose,
}: Props) {
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!aircraftType) return;
    })

    setLoading(true);
    fetch(`/api/aircraft/${aircraftType}/ai`)
    .then((res) => res.json())
    .then((data) => {
        setDescription(data.description);
        setLoading(false);
        });
    }, [aircraftType]);

      if (!aircraftType) return null;

      return (
        <main className=""
      )