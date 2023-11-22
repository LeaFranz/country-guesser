export function getTimeString(time: number): string {
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor((time % 600) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }