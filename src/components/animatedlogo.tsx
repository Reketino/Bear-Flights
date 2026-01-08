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
        src="/bearflights.png"
        alt="Bearflights logo- a wild bear in the sky"
        width={600}
        height={600}
        priority
        className="drop-shadow-[0_0_25px_rgba(255,255,0.15)]"
      />
    </motion.div>
  );
}
