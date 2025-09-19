/**
 * Formats a number into a currency string.
 * @param price - The price as a number.
 * @returns The formatted price string (e.g., "¥35.00").
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
