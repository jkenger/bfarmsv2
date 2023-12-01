import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";

const localUrl =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1"
    : "/api/v1";
// const prodUrl = process.env.REACT_APP_API_URL;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetch = axios.create({
  baseURL: localUrl,

  // Only if there is a cookie
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default fetch;
