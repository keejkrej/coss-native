import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const DISABLED_OPACITY = 'opacity-64';
export const SURFACE_SHADOW = 'shadow-sm shadow-black/5';
export const ELEVATED_SHADOW = 'shadow-lg shadow-black/5';
export const DARK_INPUT_BG = 'dark:bg-input/32';
export const BACKDROP_OVERLAY = 'bg-black/32';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
