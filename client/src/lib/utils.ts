import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";

const localUrl = "http://localhost:3000/api/v1";
// const localUrl =
//  import.meta.env.VITE_ENV === "development"
//    ? "http://localhost:3000/api/v1"
//    : "/api/v1";
//const prodUrl = process.env.REACT_APP_API_URL;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetch = axios.create({
  baseURL: localUrl,

  // Only if there is a cookie
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const areObjectsEqual = (
  obj1: TDataFields,
  obj2: TDataFields
): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const getMiddleInitial = (value?: string): string => {
  return value?.charAt(0) + ".";
};
