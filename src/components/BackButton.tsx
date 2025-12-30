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
    onClick={() => setLeaving(true)}
    disabled={leaving}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >

          <motion.div
          className="
          absolute left-6
          top-1/2 -translate-y-1/2
          "
          initial={{ 
            x: 0,
            scale: 0.9, 
            rotate: -10,
            opacity: 1, 
          }}
          animate={{ 
            x: "120vw",
            scale: 1.25, 
            rotate: 6,
            opacity: 0,
          }}
          transition={{ 
            delay: 0.05,
            duration: 0.45, 
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => router.back()}
          >
            <Image
            src="/icons/backicon.png"
            alt="Airplane transition icon"
            width={400}
            height={400}
            className="drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
