import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
        return day + 'th';
    }
    switch (day % 10) {
        case 1: return day + 'st';
        case 2: return day + 'nd';
        case 3: return day + 'rd';
        default: return day + 'th';
    }
}

export function formatDateWithOrdinal(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${month} ${getOrdinalSuffix(day)}, ${year}`;
}