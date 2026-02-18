"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    callsign: string | null;
    onClose: () => void;
};

export default function AirlineDescriptionModal({
    callsign,
    onClose,
}: Props) {
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!callsign) return;

        const controller = new AbortController();
        const cleanCallsign = callsign.trim().toUpperCase();

        setLoading(true);

        fetch(`/api/airline/${cleanCallsign}/ai`, {
            signal: controller.signal
        })
        .then((res) => res.json())
        .then((data) => {
            setDescription(data.description)
            setLoading(false);
        });
        return () => controller.abort();
    }, [callsign]);

}