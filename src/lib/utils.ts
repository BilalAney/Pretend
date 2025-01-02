import { clsx, type ClassValue } from "clsx";
import supabase from "../../supabase";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function pollTheUser(retries: number, delay: number) {
  for (let i = 0; i <= retries; i++) {
    const value = await supabase.auth.getSession();
    if (value.data.session) return value;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error("Could not get the user out of the session!");
}
