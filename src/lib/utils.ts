import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine multiple class-name inputs into a single class string and resolve conflicting Tailwind utility classes.
 *
 * Accepts typical class-value shapes (strings, arrays, objects, and falsy values) and produces a final merged class string where Tailwind utilities that conflict are resolved.
 *
 * @param inputs - Class name values to combine (strings, arrays, objects, or falsy entries)
 * @returns The resulting class string with Tailwind utility conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
