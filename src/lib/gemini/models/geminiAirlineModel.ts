import { GoogleGenAI } from "@google/genai";
import { airlinePrompt } from "../prompts/airlinePrompt";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function aiAirlineDescription(callsign: string): Promise<string> {
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-09-2025",
    contents: airlinePrompt(callsign),
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini can't return a response");
  }

  return text.trim();
}
