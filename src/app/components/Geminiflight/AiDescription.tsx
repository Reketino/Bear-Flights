"use client";

import { useEffect, useState } from "react";

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
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!entityKey) return;

    const controller = new AbortController();

    async function fetchAI() {
      try {
        const res = await fetch(
          `
          /api/${endpoint}/${entityKey}/ai`,
          { signal: controller.signal },
        );
        
        if (!res.ok) {
          const text = await res.text();
          console.error("API error:", res.status, text);
          setDescription("No information avaliable");
          return;
        }

        const json = await res.json();
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

  if (loading) return <p>{loadingText}</p>;

  return (
    <p className="font-serif text-white/80 leading-relaxed">{description}</p>
  );
}
