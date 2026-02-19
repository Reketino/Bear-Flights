"use client";

import {  useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AiDescription from "../Geminiflight/AiDescription";

type Props = {
  aircraftType: string | null;
  onClose: () => void;
};

export default function AircraftDescriptionModal({
  aircraftType,
  onClose,
}: Props) {
 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (aircraftType) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
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
            backgroundImage: "url('/modal/aircraftmodal.webp')",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className=" absolute inset-0 bg-black/80 backdrop-blur-xs" />

          <motion.section
            className="relative z-10  
            max-w-lg w-full p-6 rounded-xl 
            
            bg-white/5
            backdrop-blur-xl

            border border-white/20
            shadow-2xl
            shadow-black/40
            "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <label className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-sky-300">
                Aircraft: {aircraftType}
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </label>

            <AiDescription
            endpoint="aircraft"
            entityKey={aircraftType}
            loadingText="Loading aircraft info"
            />
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
