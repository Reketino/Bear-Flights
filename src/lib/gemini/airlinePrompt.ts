export function airlinePrompt(callsign: string): string {
    return `
    You are an aviaton industry expert.

    Explain the airline that uses ${callsign}
    in a friendly aviation-expert tone.
    
    `
}