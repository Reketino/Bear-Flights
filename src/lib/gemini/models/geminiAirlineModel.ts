import { GoogleGenAI } from "@google/genai";
import { airlinePrompt } from "../prompts/airlinePrompt";

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
})