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
    absolute top-15 -left-20 z-50
    inline-flex items-center gap-2
    px-3 py-1 rounded-lg
    text-sm font-bold text-sky-200/50
    bg-black/70 hover:bg-blue-950
    hover:scale-105
    border border-white/10
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
        animate={{ x: "110%", opacity: 1, skewX: -2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.50, ease: "easeInOut" }}
        onAnimationComplete={() => router.back}
        >

          <motion.div
          className="
          absolute left-6
          top-1/2 -translate-y-1/2
          "
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.18, ease: "backOut"}}
          >
            <Image
            src="/icons/plane.png"
            alt="Airplane transition icon"
            width={40}
            height={40}
            className="drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
