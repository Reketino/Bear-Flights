"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"

type Props = {
  endpoint: "aircraft" | "airline";
  entityKey: string;
  loadingText?: string;
};

export default function AiDescription({
  endpoint,
  entityKey,
  loadingText = "Loading info...",
}: Props) {

type Status = "idle" | "loading" | "success" | "error";

  const [description, setDescription] = useState<string | null>(null);
  const [status, setStaus] = useState(false);

  useEffect(() => {
    if (!entityKey) return;

    setLoading(true);
    setDescription(null);

    const controller = new AbortController();

    async function fetchAI() {
      try {
        const res = await fetch(
          `/api/${endpoint}/${entityKey}/ai`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("API error:", res.status, text);
          setDescription("No information avaliable");
          return;
        }

        const json = await res.json();

        await new Promise((r) => setTimeout(r, 1500));
        
        setDescription(json.description ?? "No information avliable.");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("AI fetch error:", err);
          setDescription("Failed to load information.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAI();

    return () => controller.abort();
  }, [endpoint, entityKey]);

  if (loading) 
    return ( 
    <motion.div
    initial={{ opacity: 0.4 }}
    animate={{ opacity: 1 }}
    transition={{ 
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.8,
    }}
    className=" relative z-20 text-white/70"
    >
      {loadingText}
      </motion.div> );

  return (
    <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="font-serif text-white/80 leading-relaxed"
    >
      {description}
    </motion.p>
  );
}
