"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AiDescription from "../Geminiflight/AiDescription";

type Props = {
  callsign: string | null;
  onClose: () => void;
};

export default function AirlineDescriptionModal({ 
  callsign, onClose 
}: Props) {
 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (callsign) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [callsign]);

  if (!callsign) return null;

  const cleanCallsign = callsign.trim().toUpperCase();

  return (
    <AnimatePresence>
      <motion.main
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          backgroundImage: "url('/modal/airlinemodal.webp')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        <motion.section
          className="
        relative z-10  
            max-w-lg w-full p-6 rounded-xl 
            
            bg-white/5
            backdrop-blur-xl

            border border-white/20
            shadow-2xl shadow-black/40
            overflow-hidden
            "
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="
          absolute inset-0
          flex items-center justify-center
          opacity-10
          pointer-events-none
          "
          ></div>

          <div className="relative z-10">
            <header className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-sky-300">
                Airline: {cleanCallsign}
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </header>
            <AiDescription
            endpoint="airline"
            entityKey={cleanCallsign}
            loadingText="Loading airline info..."
            />
          </div>
        </motion.section>
      </motion.main>
    </AnimatePresence>
  );
}
