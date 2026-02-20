export function airlinePrompt(airlineIcao: string): string {
  return `
    You are a professional aviation industry expert.

    Identify the airline that uses the ICAO airline designator ${airlineIcao},

    Important:
    - Use the correct ICAO airline designator.
    - Do NOT confuse it with similar airline codes.
    - If you are unsure, say so instead of guessing
    
    Then provide a concise description inculding:
    - official airline name
    - founding year
    - main hub(s)
    - fleet focus
    - route network profile

    Rules:
    - Max 3-4 sentences
    - No markdown
    - No headings
    - Use a neutral informative tone
    - Optimized for UI display

    keep it concise
    `;
}
