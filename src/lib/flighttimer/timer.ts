

export function secondsSince(timestamp: string | Date): number {
    const time =
    typeof timestamp === "string"
    ? new Date(timestamp).getTime()
    : timestamp.getTime();
    
    return Math.floor((Date.now() - time) / 1000);
}