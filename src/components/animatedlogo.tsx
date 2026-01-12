"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AnimatedLogo() {
  return (
    <motion.div
      initial={{
        x: -300,
        y: -80,
        rotate: -20,
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      className="mx-auto w-fit"
    >
      <Image
        src="/bearflights.webp"
        alt="Bearflights logo- a wild bear in the sky"
        width={1200}
        height={800}
        priority
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 750px"
        className="drop-shadow-[0_0_25px_rgba(255,255,0.15)]"
      />
    </motion.div>
  );
}
