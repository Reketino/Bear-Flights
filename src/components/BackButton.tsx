"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BackButton() {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);


  return (
    <>
    <button
    onClick={() => router.back()}
    aria-label="Go back"
    className="
    -ml-10
    inline-flex items-center gap-2
    px-3 py-1 rounded-lg
    text-sm font-bold text-sky-400
    bg-black/70 hover:bg-blue-950
    hover:scale-105
    border border-white/10
    mb-4
    ">
      <Image
      src="/icons/backicon.png"
      alt="plane back"
      width={20}
      height={20}
      className="
      transition-transform duration-200
      group-hover:-translate-x-1
      "
      />
      Back
    </button>

    <AnimatePresence>
      {leaving && (
        <motion.div
        className="
        fixed inset-0 z-9999 
        bg black/10 backdrop-blur-[2px]
        "
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: "100%", opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        onAnimationComplete={() => router.back}
        >
          

        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
