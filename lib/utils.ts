// lib/utils.ts

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind CSS classes, allowing conditional classes and deduplication
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// Utility to delay execution (useful in async operations)
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Capitalize the first letter of a string
export function capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Generate a random ID (useful for unique keys or temporary IDs)
export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

// Format a date into a readable format (e.g., "January 1, 2023")
export function formatDate(date: Date, locale: string = "en-US"): string {
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

// Constants
export const CONSTANTS = {
    DEFAULT_LANGUAGE: "en",
    ITEMS_PER_PAGE: 10,
    SUPPORT_EMAIL: "support@example.com",
};

