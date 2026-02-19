export function airlinePrompt(airlineIcao: string): string {
  return `
    You are an aviaton industry expert.

    Explain the airline associated with the ICAO airline designator ${airlineIcao},
    in a friendly aviation-expert tone.

    Include:
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
