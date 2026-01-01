"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackButton() {
    const router = useRouter();
  


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
    bg-blue-950/30 hover:bg-blue-300/15
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
    </>
  )
}
