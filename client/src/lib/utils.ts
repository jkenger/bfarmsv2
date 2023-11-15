import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetch = axios.create({
  baseURL: "http://localhost:3000/api/v1",

  // Only if there is a cookie
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default fetch;
