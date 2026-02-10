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
    if (!aircraftType) return;

    const controller = new AbortController();
    setLoading(true);

    setLoading(true);
    fetch(`/api/aircraft/${aircraftType}/ai`, {
        signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setDescription(data.description);
        setLoading(false);
      });

      return () => controller.abort();
  }, [aircraftType]);

  if (!aircraftType) return null;

  return (
    <main className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <section className="bg-zinc-900 max-w-lg w-full p-6 rounded-xl border border-white/10">
        <label className="flex justify-between items-center mb-4">
          <h2 className="font-mono text-sky-400">Aircraft: {aircraftType}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            X
          </button>
        </label>

        {loading && <p className="text-white/60">Loading aircraft info...</p>}

        {!loading && description && (
          <p className="text-sm text-white/80 leading leading-relaxed">
            {description}
          </p>
        )}
      </section>
    </main>
  );
}
