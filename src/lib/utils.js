import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getAvatarFallback = (name) => {
  const parts = name.split(" ");
  return `${parts[0].charAt(0)}${parts[1] ? parts[1].charAt(0) : ""}`;
};
