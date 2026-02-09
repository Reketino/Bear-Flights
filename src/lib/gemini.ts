import { GoogleGenAI } from "@google/genai";
import { aircraftPrompt } from "./aircraftPrompt";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function aiAircraftDescription(icao: string): Promise<string> {
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-09-2025",
    contents: aircraftPrompt(icao),
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini couldn't return a response");
  }

  return text.trim();
}
