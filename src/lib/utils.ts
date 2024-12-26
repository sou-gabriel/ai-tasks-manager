import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function logError(message: string) {
  const logMessage = `[atm::error] ${message}`;
  console.error(logMessage);
}
