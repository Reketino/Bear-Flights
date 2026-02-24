"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!entityKey) return;

    setStatus("loading");
    setDescription("");

    const controller = new AbortController();

    async function fetchAI() {
      try {
        const res = await fetch(`/api/${endpoint}/${entityKey}/ai`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("API error:", res.status, text);
          setDescription("No information avaliable");
          return;
        }

        const json = await res.json();

        await new Promise((r) => setTimeout(r, 1500));

        setDescription(json.description ?? "No information avliable.");
        setStatus("success");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setStatus("error");
          setDescription("Failed to load information.");
        }
      }
    }

    fetchAI();

    return () => controller.abort();
  }, [endpoint, entityKey]);

  if (status === "loading") {
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
      </motion.div>
    );
  }

  if (status === "error") {
    return <p className="text-red-400">{description}</p>;
  }

  if (status === "success") {
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

  return null;
}
