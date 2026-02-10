"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    <AnimatePresence>
      {aircraftType && (
        <motion.div
          className="
          fixed inset-0 z-50  
          flex items-center justify-center
          bg-cover bg-center
          "
          style={{
            backgroundImage: "url('/modal/modal.png')",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className=" absolute inset-0 bg-black/80 backdrop-blur-xs" />

          <motion.section
            className="relative bg-zinc-900 max-w-lg w-full p-6 rounded-xl border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <label className="flex justify-between items-center mb-4">
              <h2 className="font-mono text-sky-400">
                Aircraft: {aircraftType}
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </label>

            {loading && (
              <p className="text-white/60">Loading aircraft info...</p>
            )}

            {!loading && description && (
              <p className="text-sm text-white/80 leading leading-relaxed">
                {description}
              </p>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
